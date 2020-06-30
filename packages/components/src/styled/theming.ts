export interface BreakPoints<T extends {} = {}> {
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
  light2?: string;
  contrastText?: string;
}
export interface Palette {
  primary: Color;
  secondary: Color;
  error: Color;
  warn: Color;
  success: Color;
  info: Color;
  question: Color;
  text: {
    primary: string;
    secondary: string;
    hint: string;
    disabled: string;
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
