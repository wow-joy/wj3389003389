import React from 'react';
import ButtonBase, { Props as ButtonBaseProps } from '../ButtonBase';
import { Zoom } from '../transitions/Zoom';
import Loading from '../Loading';
import styled, { useWowTheme, Colors } from '@wowjoy/styled';
import clsx from 'clsx';

const StyleButton = styled(ButtonBase).attrs(({ className, ...p }: Props) => ({
  ...p,
  notContained: p.variant !== 'contained',
  padding: [
    p.sizeOpt[p.size].padding[0] - Number(p.variant === 'outlined'),
    p.sizeOpt[p.size].padding[1] - Number(p.variant === 'outlined'),
  ],
}))`
  height: ${p => p.sizeOpt[p.size].height}px;
  opacity: ${p => (p.disabled ? 0.4 : 1)};
  cursor: ${p => (p.disabled ? 'not-allowed' : 'pointer')};
  padding: ${p => `${p.padding[0]}px ${p.padding[1]}px`};
  border-radius: ${p => p.theme.shape.borderRadius}px;
  font-size: ${p => p.sizeOpt[p.size].fontSize}px;
  border: ${p =>
    p.variant === 'outlined' ? `1px solid ${p.theme.palette[p.color].main} ` : 'none'};
  background-color: ${p =>
    p.notContained
      ? 'transparent'
      : p.color === 'inherit'
      ? '#f5f5f5'
      : p.theme.palette[p.color].main};
  color: ${p =>
    p.notContained ? p.theme.palette[p.color].main : p.theme.palette[p.color].contrastText};
  transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  box-shadow: ${p => p.theme.shadows[p.disableElevation || p.disabled ? 0 : 2]};
  ${p =>
    !p.disabled &&
    `
    &:hover {
      background-color: ${
        p.notContained ? p.theme.palette[p.color].light1 : p.theme.palette[p.color].light
      };
      border-color: ${p.variant === 'outlined' ? p.theme.palette[p.color].light : 'unset'};
      box-shadow: ${p.theme.shadows[p.disableElevation ? 0 : 4]};
    }
    &:active {
      background-color: ${
        p.notContained ? p.theme.palette[p.color].dark1 : p.theme.palette[p.color].dark
      };
      border-color: ${p.variant === 'outlined' ? p.theme.palette[p.color].dark : 'unset'};
      box-shadow: ${p.theme.shadows[p.disableElevation ? 0 : 8]};
    }
  `}
  svg {
    vertical-align: -0.15em;
  }
`;

const ButtonLabel = styled.span`
  width: 100%;
  .WowButton-label-loading {
    margin-right: 5px;
  }
`;
const StartIcon = styled.span`
  margin-right: 4px;
`;
const EndIcon = styled.span`
  margin-left: 4px;
`;
interface SizeOpt {
  small: {
    padding: [number, number];
    fontSize: number;
    height: number;
  };
  medium: {
    padding: [number, number];
    fontSize: number;
    height: number;
  };
  large: {
    padding: [number, number];
    fontSize: number;
    height: number;
  };
}
export interface Props extends ButtonBaseProps {
  variant?: 'contained' | 'outlined' | 'text';
  size?: 'small' | 'medium' | 'large';
  sizeOpt?: SizeOpt;
  disabled?: boolean;
  disableElevation?: boolean;
  href?: string;
  color?: Colors | 'inherit';
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  loading?: boolean;
}
const Button = React.forwardRef<any, Props>(
  (
    {
      variant = 'contained',
      size = 'medium',
      color = 'inherit',
      disabled = false,
      disableElevation = false,
      sizeOpt = {
        small: {
          padding: [7, 12],
          fontSize: 12,
          height: 26,
        },
        medium: {
          padding: [9, 14],
          fontSize: 14,
          height: 32,
        },
        large: {
          padding: [11, 20],
          fontSize: 14,
          height: 36,
        },
      },
      children,
      startIcon,
      endIcon,
      loading,
      ...props
    },
    ref,
  ) => {
    const theme = useWowTheme();
    return (
      <StyleButton
        ref={ref}
        theme={theme}
        variant={variant}
        size={size}
        sizeOpt={sizeOpt}
        color={color}
        disabled={disabled || loading}
        disableElevation={variant === 'contained' ? disableElevation : true}
        {...props}
        className={clsx('WowButton-root', props.className)}
      >
        <ButtonLabel className="WowButton-label">
          <Zoom attr="width" direction="left" in={loading} unmountOnExit mountOnEnter>
            <span>
              <Loading className="WowButton-label-loading" />
            </span>
          </Zoom>
          {startIcon && <StartIcon className="WowButton-startIcon">{startIcon}</StartIcon>}
          {children}
          {endIcon && <EndIcon className="WowButton-endIcon">{endIcon}</EndIcon>}
        </ButtonLabel>
      </StyleButton>
    );
  },
);

export default Button;
