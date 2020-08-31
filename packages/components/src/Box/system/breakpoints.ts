import merge from './merge';
import { StyleFunction } from './types';

export type DefaultBreakPoints = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

// The breakpoint **start** at this value.
// For instance with the first breakpoint xs: [xs, sm[.
const values = {
  xs: 0,
  sm: 600,
  md: 960,
  lg: 1280,
  xl: 1920,
};

const defaultBreakpoints = {
  // Sorted ASC by size. That's important.
  // It can't be configured as it's used statically for propTypes.
  keys: ['xs', 'sm', 'md', 'lg', 'xl'],
  up: key => `@media (min-width:${values[key]}px)`,
};

export function handleBreakpoints(props, propValue, styleFromPropValue) {
  if (process.env.NODE_ENV !== 'production') {
    if (!props.theme) {
      console.error('Wowjoy-UI: You are calling a style function without a theme value.');
    }
  }

  if (Array.isArray(propValue)) {
    const themeBreakpoints = props.theme.breakpoints || defaultBreakpoints;
    return propValue.reduce((acc, item, index) => {
      acc[themeBreakpoints.up(themeBreakpoints.keys[index])] = styleFromPropValue(propValue[index]);
      return acc;
    }, {});
  }

  if (typeof propValue === 'object') {
    const themeBreakpoints = props.theme.breakpoints || defaultBreakpoints;
    return Object.keys(propValue).reduce((acc, breakpoint) => {
      acc[themeBreakpoints.up(breakpoint)] = styleFromPropValue(propValue[breakpoint]);
      return acc;
    }, {});
  }

  const output = styleFromPropValue(propValue);

  return output;
}

function breakpoints<Props, Breakpoints extends string = DefaultBreakPoints>(
  styleFunction: StyleFunction<Props>,
): StyleFunction<Partial<Record<Breakpoints, Props>> & Props> {
  const newStyleFunction = props => {
    const base = styleFunction(props);
    const themeBreakpoints = props.theme.breakpoints || defaultBreakpoints;

    const extended = themeBreakpoints.keys.reduce((acc, key) => {
      if (props[key]) {
        acc = acc || {};
        acc[themeBreakpoints.up(key)] = styleFunction({ theme: props.theme, ...props[key] });
      }
      return acc;
    }, null);

    return merge(base, extended);
  };

  // @ts-ignore
  newStyleFunction.filterProps = ['xs', 'sm', 'md', 'lg', 'xl', ...styleFunction.filterProps];

  return newStyleFunction;
}

export default breakpoints;
