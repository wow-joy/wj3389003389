import React, { useState } from 'react';
import styled, { withWowTheme } from '@wowjoy/styled';
import { useControlState } from '@wowjoy/hooks';
import clsx from 'clsx';
import InputBase from '../InputBase';
import { Clear } from '../icons';

const Wrap = styled.div<PropsWithoutSize>`
  position: relative;
  display: flex;
  align-items: center;
  font-size: ${p => p.sizeOpt[p.size].fontSize}px;
  cursor: ${p => (p.disabled ? 'not-allowed' : 'inherit')};
  &::before {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    transition: border-bottom-color ${p => p.theme.transitions.duration.shorter}ms
      ${p => p.theme.transitions.easing.easeInOut};
    pointer-events: none;
    border-bottom: 1px solid rgba(0, 0, 0, 0.42);
  }
  &::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    transition: transform ${p => p.theme.transitions.duration.shorter}ms
      ${p => p.theme.transitions.easing.easeInOut};
    pointer-events: none;
    border-bottom: 2px solid ${p => p.theme.palette.primary.main};
    transform: scaleX(0);
  }
  &:hover {
    .WowInput-clear-visible {
      opacity: 1;
      cursor: pointer;
    }
    &:not(.Wow-disabled) {
      &:before {
        border-bottom: 2px solid rgba(0, 0, 0, 0.87);
      }
    }
  }

  &:focus-within:not(.Wow-disabled) {
    &:after {
      transform: scaleX(1);
    }
    .WowTextField-input-placeholder {
      transform: translate(0, 1.5px) scale(0.75);
      color: ${p => p.theme.palette.primary.main};
    }
  }
  .WowTextField-input {
    ${p => !p.nativePlaceholder && `margin-top: 16px;`}
    padding: 6px 0 7px;
    width: 100%;
    box-sizing: content-box;
    font-size: inherit;
  }
  .WowTextField-input-placeholder {
    transition: color ${p => p.theme.transitions.duration.shorter}ms
        ${p => p.theme.transitions.easing.easeOut},
      transform ${p => p.theme.transitions.duration.shorter}ms
        ${p => p.theme.transitions.easing.easeOut};
    color: ${p => p.theme.palette.disabled};
    transform-origin: top left;
    position: absolute;
    top: 0;
    left: 0;
    transform: translate(0, 20px) scale(1);
    pointer-events: none;
  }
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
export interface Props
  extends Omit<React.HTMLAttributes<HTMLElement>, 'size' | 'prefix' | 'ref' | 'onChange'> {
  size?: 'small' | 'medium' | 'large';
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  ref?: React.MutableRefObject<HTMLElement> | ((instance: HTMLInputElement) => void);
  inputRef?: React.MutableRefObject<HTMLInputElement>;
  inputProps?: React.HTMLAttributes<HTMLInputElement>;
  value?: string | number | string[];
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  sizeOpt?: SizeOpt;
  nativePlaceholder?: boolean;
  allowClear?: boolean;
  showSearch?: boolean;
}

type PropsWithoutSize = Omit<Props, 'size'> & { size: 'small' | 'medium' | 'large' };

const TextField: React.FC<Props> = (
  {
    placeholder = '请输入',
    size = 'medium',
    sizeOpt = { small: { fontSize: 12 }, medium: { fontSize: 14 }, large: { fontSize: 16 } },
    inputRef,
    inputProps = {},
    defaultValue = '',
    onChange,
    disabled = false,
    nativePlaceholder = false,
    allowClear = true,
    showSearch = false,
    prefix,
    suffix,
    ...props
  },
  ref,
) => {
  const isControlled = 'value' in props;
  const [value, setValue] = useControlState(isControlled, props.value, defaultValue);
  const handleChange = e => {
    onChange?.(e);
    if (!isControlled) {
      setValue(e.target.value);
    }
  };
  const handleClear = e => {
    onChange?.({ target: { value: '' } } as React.ChangeEvent<HTMLInputElement>);
    if (!isControlled) {
      setValue('');
    }
  };
  return (
    <Wrap
      {...props}
      className={clsx(props.className, { 'Wow-disabled': disabled })}
      size={size}
      sizeOpt={sizeOpt}
      disabled={disabled}
      nativePlaceholder={nativePlaceholder}
      ref={ref}
    >
      {prefix}
      {!nativePlaceholder && <span className="WowTextField-input-placeholder">{placeholder}</span>}
      <InputBase
        {...inputProps}
        className={clsx('WowTextField-input', inputProps.className)}
        placeholder={nativePlaceholder ? placeholder : ''}
        ref={inputRef}
        value={value}
        onChange={handleChange}
        disabled={disabled}
      />
      {allowClear && (
        <Clear
          className={clsx('WowInput-clear', {
            'WowInput-clear-visible': Boolean(value),
          })}
          onClick={handleClear}
        />
      )}
      {suffix}
    </Wrap>
  );
};

export default withWowTheme(TextField, 'WowTextField-root');
