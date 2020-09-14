import style from './style';
import { Theme } from '@wowjoy/styled';

export interface VariantProps {
  variant: keyof Theme['typography'];
}

export const variant = style({
  prop: 'variant',
  cssProperty: false,
  transform: (variant: string, theme) => {
    return theme.typography[variant] || {};
  },
});
