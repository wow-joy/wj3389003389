import React, { useContext, useCallback } from 'react';
import { useControlState } from '@wowjoy/hooks';
import styled, { useWowTheme } from '@wowjoy/styled';
import clsx from 'clsx';
import CheckboxGroupContext from './CheckboxGroupContext';
import IconButton, { Props as IconButtonProps } from '../IconButton';

const Wrap = styled.label`
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  &.WowCheckbox-checked {
    .WowCheckbox-icon {
      background-color: ${p => p.theme.palette.primary.main};
      border-color: ${p => p.theme.palette.primary.main};
    }
  }
  &.WowCheckbox-disabled {
    cursor: not-allowed;
    .WowCheckbox-label {
      cursor: not-allowed;
      &:hover {
        background: none;
      }
    }
    .WowCheckbox-icon {
      border-color: #b3b3b3;
      background-color: #e8e8e8;
      &::after {
        border-color: transparent;
      }
    }
    &.WowCheckbox-checked .WowCheckbox-icon::after {
      border-color: #b3b3b3;
    }
    .WowCheckbox-text {
      color: ${p => p.theme.palette.text.hint};
    }
  }
  .WowCheckbox-label {
    position: relative;
    padding: 10px;
  }
  .WowCheckbox-input {
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
  .WowCheckbox-icon {
    transition: all ${p => p.theme.transitions.duration.short}ms
      ${p => p.theme.transitions.easing.easeInOut};
    display: block;
    position: relative;
    width: 16px;
    height: 16px;
    box-sizing: border-box;
    border-width: 2px;
    border-color: #b3b3b3;
    border-style: solid;
    background-color: #fff;
    border-radius: ${p => p.theme.shape.borderRadius}px;
    &::after {
      content: '';
      width: 4px;
      height: 7px;
      position: absolute;
      top: 40%;
      left: 50%;
      transform: translate(-50%, -50%) rotate(45deg);
      border: 2px solid #fff;
      border-top: 0;
      border-left: 0;
      background-color: transparent;
    }
  }
  .WowCheckbox-text {
    color: ${p => p.theme.palette.text.primary};
    font-size: 14px;
    line-height: 1;
  }
`;

interface EventTarget {
  value: any;
  checked: boolean;
  name: string;
  disabled: boolean;
}
export interface Props extends Omit<React.HTMLAttributes<HTMLLabelElement>, 'onChange'> {
  autoFocus?: boolean;
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  value?: string;
  name?: string;
  inputRef?: React.MutableRefObject<HTMLInputElement> | ((instance: HTMLInputElement) => void);
  IconButtonProps?: IconButtonProps;
  onChange?: (e: React.MouseEvent & { target: EventTarget }) => void;
}

const Checkbox = React.forwardRef<any, Props>(
  (
    {
      value,
      defaultChecked = false,
      inputRef,
      disabled = false,
      className,
      children,
      name,
      IconButtonProps = {},
      onChange,
      ...props
    },
    ref,
  ) => {
    const theme = useWowTheme();
    const context = useContext(CheckboxGroupContext);
    const contextValue = context?.value || context?.defaultValue;

    const [checked, setChecked] = useControlState(
      'checked' in props || !!context,
      !!context ? contextValue.includes?.(value) : props.checked,
      defaultChecked,
    );
    const handleChange = useCallback(
      e => {
        e.preventDefault();
        if (disabled) return;

        if (!('checked' in props)) {
          setChecked(!checked);
        }

        context?.onChange(
          !checked ? [...contextValue, value] : contextValue.filter(v => v !== value),
        );
        e.target = {
          value,
          checked: !checked,
          name: context?.name || name,
          disabled: context?.disabled,
        };
        onChange?.(e);
        props.onClick?.(e);
      },
      [context, checked, onChange, props.onClick, disabled],
    );
    return (
      <Wrap
        theme={theme}
        className={clsx(className, 'WowCheckbox-root', {
          'WowCheckbox-checked': checked,
          'WowCheckbox-disabled': context?.disabled || disabled,
        })}
        onClick={handleChange}
        ref={ref}
        {...props}
      >
        <IconButton
          component="span"
          variant="text"
          color="primary"
          className="WowCheckbox-label"
          {...IconButtonProps}
        >
          <input
            className="WowCheckbox-input"
            ref={inputRef}
            type="checkbox"
            value={value}
            checked
            name={context?.name || name}
            readOnly
          />
          <span className="WowCheckbox-icon"></span>
        </IconButton>
        {children && <span className="WowCheckbox-text">{children}</span>}
      </Wrap>
    );
  },
);

export default Checkbox;
