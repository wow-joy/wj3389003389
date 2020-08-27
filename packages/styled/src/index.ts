import { Theme } from './theming';
import createTheme from './createTheme';

import { useTheme, DefaultTheme } from 'styled-components';

export * from 'styled-components';
export * from './theming';
export * from './commonCss';
export { default as createTheme } from './createTheme';
export { default as withWowTheme } from './withWowTheme';
export { default } from 'styled-components';
export const useWowTheme = (): DefaultTheme => {
  const theme = useTheme();
  return theme || createTheme();
};

declare module 'styled-components' {
  export interface DefaultTheme extends Partial<Theme> {}
}
