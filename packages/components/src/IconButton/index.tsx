import React from 'react';
import styled, { useWowTheme, Colors } from '@wowjoy/styled';
import ButtonBase, { Props as ButtonBaseProps } from '../ButtonBase';
import clsx from 'clsx';

const StyleIconButton = styled(ButtonBase).attrs((p: Props) => ({
  ...p,
  notContained: p.variant !== 'contained',
}))`
  border-radius: 50%;
  opacity: ${p => (p.disabled ? 0.4 : 1)};
  cursor: ${p => (p.disabled ? 'not-allowed' : 'pointer')};
  padding: 12px;
  font-size: ${p => p.sizeOpt[p.size].fontSize}px;
  background-color: ${p =>
    p.notContained
      ? 'transparent'
      : p.color === 'inherit'
      ? '#F5F5F5'
      : p.theme.palette[p.color].main};
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
          background: ${
            p.notContained ? p.theme.palette[p.color].dark1 : p.theme.palette[p.color].dark
          };
          border-color: unset;
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
  color?: Colors;
}
const IconButton = React.forwardRef<any, Props>(
  (
    {
      variant = 'contained',
      size = 'medium',
      color = 'inherit',
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
    const theme = useWowTheme();
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
        theme={theme}
        className={clsx('WowIconButton-root', props.className)}
      >
        <IconLabel className="WowIconButton-label">{children}</IconLabel>
      </StyleIconButton>
    );
  },
);

export default IconButton;
