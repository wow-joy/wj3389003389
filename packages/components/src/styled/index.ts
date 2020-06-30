import { Theme } from './theming';

export * from 'styled-components';
export * from './theming';
export { default as createTheme } from './createTheme';
export { default as withWowTheme } from './withWowTheme';
export { default } from 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme extends Partial<Theme> {}
}
