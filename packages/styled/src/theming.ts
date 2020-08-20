import { ExtractByType } from './utils/type';
export interface BreakPoints<T extends {} = {}> {
  keys: string[];
  values: T;
  up: (key: keyof T) => string;
  down: (key: keyof T) => string;
  between: (start: keyof T, end: keyof T) => string;
  width: (key: keyof T) => string;
}

interface Color {
  main: string;
  light?: string;
  dark?: string;
  light1?: string;
  dark1?: string;
  contrastText?: string;
}

export type Colors = ExtractByType<Palette, Color>;

export interface Palette {
  type: string;
  primary: Color;
  secondary: Color;
  error: Color;
  warning: Color;
  success: Color;
  info: Color;
  question: Color;
  inherit: Color;
  background: {
    default: string;
    level1: string;
    level2: string;
    level3: string;
  };
  divider: string;
  disabled: string;
  grey: {
    borderColor: string;
    1: string;
    2: string;
    3: string;
    4: string;
    5: string;
    6: string;
    7: string;
    8: string;
    9: string;
    10: string;
    11: string;
    12: string;
    13: string;
    14: string;
    15: string;
    16: string;
  };
  text: {
    primary: string;
    secondary: string;
    hint: string;
    buttonHint?: string;
  };
  link: {
    normal: string;
    hover: string;
    active: string;
    visited: string;
  };
}
export interface TextColor {
  primary: string;
  secondary: string;
  hint: string;
  disabled: string;
}
export interface LinkColor {
  primary: string;
  hover: string;
  active: string;
  disabled: string;
}
export interface Transitions {
  easing: {
    easeIn: string;
    easeInOut: string;
    easeOut: string;
    sharp: string;
  };
  duration: {
    complex: number;
    enteringScreen: number;
    leavingScreen: number;
    short: number;
    shorter: number;
    shortest: number;
    standard: number;
  };
}
export interface ZIndex {
  mobileStepper: number;
  speedDial: number;
  appBar: number;
  drawer: number;
  modal: number;
  snackbar: number;
  tooltip: number;
}
export interface Shape {
  borderRadius: number;
}
export interface Typography {
  title: number;
  subtitle: number;
  body1: number;
  body2: number;
}
export interface Theme<T extends {} = {}> {
  palette: Partial<Palette>;
  transitions: Partial<Transitions>;
  breakpoints: Partial<BreakPoints<T>>;
  typography: Partial<Typography>;
  shape: Partial<Shape>;
  zIndex: Partial<ZIndex>;
  shadows?: string[];
  spacing: (ratio: number) => number;
}
