import React from 'react';
import ButtonBase, { Props as ButtonBaseProps } from '../ButtonBase';
import styled from 'styled-components';
import { withWowTheme, Palette } from '../styled';

const StyleButton = styled(ButtonBase).attrs((p: Props) => ({
  ...p,
  notContained: p.variant !== 'contained',
  padding: [
    p.sizeOpt[p.size].padding[0] - Number(p.variant === 'outlined'),
    p.sizeOpt[p.size].padding[1] - Number(p.variant === 'outlined'),
  ],
}))`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  opacity: ${p => (p.disabled ? 0.4 : 1)};
  cursor: ${p => (p.disabled ? 'not-allowed' : 'pointer')};
  padding: ${p => `${p.padding[0]}px ${p.padding[1]}px`};
  border-radius: ${p => p.theme.shape.borderRadius}px;
  font-size: ${p => p.sizeOpt[p.size].fontSize}px;
  border: ${p =>
    p.variant === 'outlined' ? `1px solid ${p.theme.palette[p.color].main} ` : 'none'};
  background-color: ${p => (p.notContained ? '#fff' : p.theme.palette[p.color].main)};
  color: ${p =>
    p.notContained ? p.theme.palette[p.color].main : p.theme.palette[p.color].contrastText};
  transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  box-shadow: ${p => p.theme.shadows[p.disableElevation || p.disabled ? 0 : 2]};
  ${p =>
    !p.disabled &&
    `
    &:hover {
      background: ${
        p.notContained ? p.theme.palette[p.color].light1 : p.theme.palette[p.color].light
      };
      border-color: ${p.variant === 'outlined' ? p.theme.palette[p.color].light : 'unset'};
      box-shadow: ${p.theme.shadows[p.disableElevation ? 0 : 4]};
    }
    &:active {
      background: ${p =>
        p.notContained ? p.theme.palette[p.color].light2 : p.theme.palette[p.color].dark};
      border-color: ${p => (p.variant === 'outlined' ? p.theme.palette[p.color].dark : 'none')};
      box-shadow: ${p.theme.shadows[p.disableElevation ? 0 : 8]};
    }
  `}
`;

const ButtonLabel = styled.span.attrs({ className: 'WowButton-label' })`
  width: 100%;
  display: inherit;
  align-items: inherit;
  justify-content: inherit;
`;
const StartIcon = styled.span.attrs({ className: 'WowButton-startIcon' })`
  margin-right: 4px;
`;
const EndIcon = styled.span.attrs({ className: 'WowButton-endIcon' })`
  margin-left: 4px;
`;
interface SizeOpt {
  small: {
    padding: [number, number];
    fontSize: number;
  };
  medium: {
    padding: [number, number];
    fontSize: number;
  };
  large: {
    padding: [number, number];
    fontSize: number;
  };
}
export interface Props extends ButtonBaseProps {
  variant?: 'contained' | 'outlined' | 'text';
  size?: 'small' | 'medium' | 'large';
  sizeOpt?: SizeOpt;
  disabled?: boolean;
  disableElevation?: boolean;
  href?: string;
  color?: Exclude<keyof Palette, 'text'>;
  startIcon?: React.ReactNode;
  endIcon: React.ReactNode;
}
const Button: React.ForwardRefRenderFunction<HTMLElement, Props> = (
  {
    variant = 'contained',
    size = 'medium',
    color = 'primary',
    disabled = false,
    disableElevation = false,
    sizeOpt = {
      small: {
        padding: [7, 12],
        fontSize: 12,
      },
      medium: {
        padding: [9, 14],
        fontSize: 14,
      },
      large: {
        padding: [11, 20],
        fontSize: 14,
      },
    },
    children,
    startIcon,
    endIcon,
    ...props
  },
  ref,
) => {
  return (
    <StyleButton
      ref={ref}
      variant={variant}
      size={size}
      sizeOpt={sizeOpt}
      color={color}
      disabled={disabled}
      disableElevation={variant === 'contained' ? disableElevation : true}
      {...props}
    >
      <ButtonLabel>
        {startIcon && <StartIcon>{startIcon}</StartIcon>}
        {children}
        {endIcon && <EndIcon>{endIcon}</EndIcon>}
      </ButtonLabel>
    </StyleButton>
  );
};

export default withWowTheme(Button, 'WowButton-root');
