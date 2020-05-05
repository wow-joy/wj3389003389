import {} from 'styled-components'

interface Palette {
  primary: string;
  error: string;
  warn: string;
  success: string;
}
interface TextColor {
  primary: string;
  secondary: string;
  hint: string;
  disabled: string;
}
interface LinkColor {
  primary: string;
  hover: string;
  active: string;
  disabled: string;
}
interface Theme {
  primary: string;
  palette?:Palette
}

const defaultTheme = {
  primary: '#198EEB'
}
const createTheme = (theme:Theme) => {
  return {
    ...defaultTheme,
    ...theme
  }
}

export default createTheme