import styled, { useWowTheme } from '@wowjoy/styled';
import React, { useCallback } from 'react';
import Button, { Props as ButtonProps } from '../Button';
import useRadio, { EventTarget } from './useRadio';

const ButtonSty = styled(Button)`
  box-sizing: border-box;
  &[class*='primary'] {
    z-index: 1;
    border: 1px solid ${p => p.theme.palette.primary.main};
    &:hover,
    &:active {
      border: 1px solid ${p => p.theme.palette.primary.light};
    }
  }
  &.WowButton-outlined:not(.WowButton-disabled):not([class*='primary']) {
    border-color: #dbdbdb;
    &:hover {
      border-color: #dbdbdb;
      color: ${p => p.theme.palette.primary.main};
    }
  }
  .WowRadio-input {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1;
    cursor: pointer;
    margin: 0;
    opacity: 0;
  }
`;

export interface Props extends Omit<ButtonProps, 'onChange'> {
  autoFocus?: boolean;
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  value?: any;
  onChange?: (e: React.MouseEvent & { target: EventTarget }) => void;
  inputRef?: React.MutableRefObject<HTMLInputElement> | ((instance: HTMLInputElement) => void);
}

const RadioButton = React.forwardRef<any, Props>(
  (
    {
      variant,
      defaultChecked,
      autoFocus,
      inputRef,
      disabled,
      value,
      size,
      children,
      onChange,
      ...props
    },
    ref,
  ) => {
    const { handleChange, handleInputRef, context, checked } = useRadio({
      isControlled: 'checked' in props,
      inputRef,
      value,
      defaultChecked,
      checked: props.checked,
      disabled,
      onChange,
      autoFocus,
    });
    const theme = useWowTheme();
    const handleClick = useCallback(
      e => {
        props.onClick?.(e);
        handleChange(e);
      },
      [handleChange, props.onClick],
    );

    return (
      <ButtonSty
        {...props}
        ref={ref}
        size={context?.size || size}
        theme={theme}
        component="label"
        color={checked ? 'primary' : 'inherit'}
        disabled={context?.disabled || disabled}
        variant={checked ? context?.buttonVariant || variant : 'outlined'}
        disableElevation
        onClick={handleClick}
      >
        <input
          className="WowRadio-input"
          ref={handleInputRef}
          type="radio"
          value={value || children}
          checked
          name={context?.name || name}
          readOnly
        />
        {children}
      </ButtonSty>
    );
  },
);

RadioButton.displayName = 'RadioButton';

export default RadioButton;
