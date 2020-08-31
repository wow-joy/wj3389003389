import merge from './merge';
import { StyleFunction } from './types';

type ComposedArg<T> = T extends Array<(arg: infer P) => any> ? P : never;
type ComposedStyleProps<T> = ComposedArg<T>;

export type ComposedStyleFunction<T extends Array<StyleFunction<any>>> = StyleFunction<
  ComposedStyleProps<T>
>;

function compose<T extends Array<StyleFunction<any>>>(...styles: T): ComposedStyleFunction<T> {
  const fn = props =>
    styles.reduce((acc, style) => {
      const output = style(props);

      if (output) {
        return merge(acc, output);
      }

      return acc;
    }, {});

  // @ts-ignore
  fn.filterProps = styles.reduce((acc, style) => acc.concat(style.filterProps), []);

  return fn;
}

export default compose;
