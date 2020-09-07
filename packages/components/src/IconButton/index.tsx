import React from 'react';
import styled, { useWowTheme, Colors } from '@wowjoy/styled';
import ButtonBase, { Props as ButtonBaseProps } from '../ButtonBase';
import clsx from 'clsx';

const StyleIconButton = styled(ButtonBase)<
  Props & {
    $color: Props['color'];
  }
>`
  &.WowIconButton-text {
    background-color: transparent;
    color: ${p => p.theme.palette[p.$color].main};
    &:not(.WowIconButton-disabled):hover {
      background: ${p => p.theme.palette[p.$color].light1};
    }
    &:active {
      background: ${p => p.theme.palette[p.$color].dark1};
    }
  }
  &.WowIconButton-sm {
    font-size: 12px;
  }
  &.WowIconButton-lg {
    font-size: 35px;
  }
  border-radius: 50%;
  opacity: ${p => (p.disabled ? 0.4 : 1)};
  cursor: ${p => (p.disabled ? 'not-allowed' : 'pointer')};
  padding: 12px;
  font-size: 24px;
  background-color: ${p => (p.$color === 'inherit' ? '#F5F5F5' : p.theme.palette[p.$color].main)};
  color: ${p => p.theme.palette[p.$color].contrastText};
  transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  &:not(.WowIconButton-disabled):hover {
    background: ${p => p.theme.palette[p.$color].light};
  }
  &:active {
    background: ${p => p.theme.palette[p.$color].dark};
  }
`;
const IconLabel = styled.span`
  width: 100%;
  display: flex;
  align-items: inherit;
  justify-content: inherit;
`;

export interface Props extends ButtonBaseProps {
  variant?: 'contained' | 'text';
  size?: 'small' | 'medium' | 'large';
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
        $color={color}
        disabled={disabled}
        {...props}
        theme={theme}
        className={clsx('WowIconButton-root', props.className, {
          'WowIconButton-text': variant === 'text',
          'WowIconButton-disabled': disabled,
          'WowIconButton-sm': size === 'small',
          'WowIconButton-lg': size === 'large',
        })}
      >
        <IconLabel className="WowIconButton-label">{children}</IconLabel>
      </StyleIconButton>
    );
  },
);

export default IconButton;
