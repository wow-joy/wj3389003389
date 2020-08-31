import { handleBreakpoints } from './breakpoints';
import { StyleFunction } from './types';
import getPath from '../../utils/getPath';

export interface StyleOptions<PropKey, Theme extends object> {
  cssProperty?: PropKey | keyof React.CSSProperties | false;
  prop: PropKey;
  themeKey?: string;
  transform?: (cssValue: unknown, theme: Theme) => number | string | React.CSSProperties;
}

function style<PropValue = unknown, PropKey extends string = string, Theme extends object = object>(
  options: StyleOptions<PropKey, Theme>,
): StyleFunction<{ [K in PropKey]?: PropValue } & { theme: Theme }> {
  const { prop, cssProperty = options.prop, themeKey, transform } = options;

  const fn = props => {
    // console.log(props);
    if (props[prop] == null) {
      return null;
    }

    const propValue = props[prop];
    const theme = props.theme;
    // console.log({ propValue, theme, themeKey });
    const themeMapping = getPath(theme, themeKey) || {};
    const styleFromPropValue = propValueFinal => {
      let value;

      if (typeof themeMapping === 'function') {
        value = themeMapping(propValueFinal);
      } else if (Array.isArray(themeMapping)) {
        value = themeMapping[propValueFinal] || propValueFinal;
      } else {
        value = getPath(themeMapping, propValueFinal) || propValueFinal;

        if (transform) {
          value = transform(value, theme);
        }
      }

      if (cssProperty === false) {
        return value;
      }

      return {
        [cssProperty]: value,
      };
    };

    return handleBreakpoints(props, propValue, styleFromPropValue);
  };

  fn.filterProps = [prop];

  return fn;
}

export default style;
