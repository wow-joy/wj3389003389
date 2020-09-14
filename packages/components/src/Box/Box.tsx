import React from 'react';
import styled from '@wowjoy/styled';
import {
  borders,
  breakpoints,
  compose,
  DefaultBreakPoints,
  display,
  flexbox,
  grid,
  palette,
  positions,
  sizing,
  spacing,
  typography,
  variant,
  VariantProps,
} from './system';
import { PropsFor } from './system/types';

export type BordersProps = PropsFor<typeof borders>;
export type DisplayProps = PropsFor<typeof display>;
export type FlexboxProps = PropsFor<typeof flexbox>;
export type GridProps = PropsFor<typeof grid>;
export type PaletteProps = PropsFor<typeof palette>;
export type PositionsProps = PropsFor<typeof positions>;
export type SizingProps = PropsFor<typeof sizing>;
export type SpacingProps = PropsFor<typeof spacing>;
export type TypographyProps = PropsFor<typeof typography>;

export const composeStyleFunction = breakpoints(
  compose(
    borders,
    display,
    flexbox,
    grid,
    palette,
    positions,
    sizing,
    spacing,
    typography,
    variant,
  ),
);

export type MergeProps = Omit<
  BordersProps &
    DisplayProps &
    FlexboxProps &
    GridProps &
    PaletteProps &
    PositionsProps &
    SizingProps &
    SpacingProps &
    TypographyProps &
    VariantProps,
  'theme'
>;

type MapToCss<T, O = React.CSSProperties> = {
  [K in keyof T]: K extends keyof O ? O[K] : T[K];
};
type SupportBreakpoints<T, B extends string = DefaultBreakPoints> =
  | {
      [K in keyof T]?: T[K] | Partial<Record<B, T[K]>>;
    }
  | {
      [K in B]?: T;
    };
export type BaseBoxProps = SupportBreakpoints<MapToCss<MergeProps>>;

export type BoxProps = BaseBoxProps & {
  themes?: Partial<Record<'light' | 'dark', BaseBoxProps>>;
  css?: string | Function;
};

export const Box = styled.div.attrs({ className: 'WowjoyBox-root' as string }).withConfig({
  shouldForwardProp: prop =>
    // @ts-ignore
    !['css', ...composeStyleFunction.filterProps].includes(prop),
})<BoxProps>`
  && {
    ${composeStyleFunction as any}
    ${p => (typeof p.css === 'string' ? p.css : typeof p.css === 'function' ? p.css(p) : '')}
  }
`;
