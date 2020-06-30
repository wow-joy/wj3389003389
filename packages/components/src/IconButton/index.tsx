import React from 'react';
import ButtonBase, { Props as ButtonBaseProps } from '../ButtonBase';
import styled, { withWowTheme, Palette } from '../styled';

const StyleIconButton = styled(ButtonBase).attrs((p: Props) => ({
  ...p,
  notContained: p.variant !== 'contained',
}))`
  border-radius: 50%;
  opacity: ${p => (p.disabled ? 0.4 : 1)};
  cursor: ${p => (p.disabled ? 'not-allowed' : 'pointer')};
  padding: 12px;
  font-size: ${p => p.sizeOpt[p.size].fontSize}px;
  background-color: ${p => (p.notContained ? '#fff' : p.theme.palette[p.color].main)};
  color: ${p =>
    p.notContained ? p.theme.palette[p.color].main : p.theme.palette[p.color].contrastText};
  transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  ${p =>
    !p.disabled &&
    `&:hover {
          background: ${
            p.notContained ? p.theme.palette[p.color].light1 : p.theme.palette[p.color].light
          };
        }
        &:active {
          background: ${p =>
            p.notContained ? p.theme.palette[p.color].light2 : p.theme.palette[p.color].dark};
          border-color: ${p => (p.variant === 'outlined' ? p.theme.palette[p.color].dark : 'none')};
        }
      `}
`;
const IconLabel = styled.span`
  width: 100%;
  display: flex;
  align-items: inherit;
  justify-content: inherit;
`;
interface SizeOpt {
  small: {
    fontSize: number;
  };
  medium: {
    fontSize: number;
  };
  large: {
    fontSize: number;
  };
}
export interface Props extends ButtonBaseProps {
  variant?: 'contained' | 'text';
  size?: 'small' | 'medium' | 'large';
  sizeOpt?: SizeOpt;
  disabled?: boolean;
  href?: string;
  color?: Exclude<keyof Palette, 'text'>;
}
const IconButton: React.ForwardRefRenderFunction<HTMLElement, Props> = (
  {
    variant = 'contained',
    size = 'medium',
    color = 'primary',
    disabled = false,
    sizeOpt = {
      small: {
        fontSize: 12,
      },
      medium: {
        fontSize: 24,
      },
      large: {
        fontSize: 35,
      },
    },
    children,
    ...props
  },
  ref,
) => {
  return (
    <StyleIconButton
      ref={ref}
      center
      variant={variant}
      size={size}
      sizeOpt={sizeOpt}
      color={color}
      disabled={disabled}
      {...props}
    >
      <IconLabel className="WowIconButton-label">{children}</IconLabel>
    </StyleIconButton>
  );
};

export default withWowTheme(IconButton, 'WowIconButton-root');
