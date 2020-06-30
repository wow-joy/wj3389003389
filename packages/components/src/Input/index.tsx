import React, { useState, useRef } from 'react';
import styled, { withWowTheme, css, DefaultTheme } from '../styled';
import clsx from 'clsx';
import { CloseFillCircle } from '@wowjoy/icons';

const wrapCss = css<PropsWithoutSize>`
  border-radius: ${p => p.theme.shape.borderRadius}px;
  padding: 7px 10px;
  border: 1px solid #ccc;
  outline: none;
  font-size: ${p => p.sizeOpt[p._size].fontSize}px;
  transition: box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
`;
const placeholderCss = css<PropsWithoutSize>`
  &::placeholder {
    font-size: ${p => p.sizeOpt[p._size].fontSize}px;
    line-height: ${p => p.sizeOpt[p._size].fontSize}px;
    padding: 0;
    color: ${p => p.theme.palette.text.disabled};
  }
  &:placeholder-shown {
    color: ${p => p.theme.palette.text.disabled};
    text-overflow: ellipsis;
  }
`;

const StyleInput = styled.input<PropsWithoutSize>`
  ${wrapCss}
  cursor: ${p => (p.disabled ? 'not-allowed' : 'inherit')};
  ${p =>
    !p.disabled &&
    `
    &:hover {
      border: 1px solid ${p.theme.palette.primary.main};
    }
    &:focus {
      border: 1px solid ${p.theme.palette.primary.main};
      box-shadow: 0px 0px 0px 1px rgba(83, 189, 231, 0.5);
    }
  `}

    ${placeholderCss}
`;

const Wrap = styled.span<PropsWithoutSize>`
  ${wrapCss}
  .WowInput-input {
    border: none;
    padding: 0;
    font-size: ${p => p.sizeOpt[p._size].fontSize}px;
    &:focus {
      outline: none;
    }
    ${placeholderCss}
  }
  ${p =>
    !p.disabled &&
    `
    &:hover {
      border: 1px solid ${p.theme.palette.primary.main};
    }
    &:focus-within {
      border: 1px solid ${p.theme.palette.primary.main};
      box-shadow: 0px 0px 0px 1px rgba(83, 189, 231, 0.5);
    }
  `}
  display: inline-flex;
  align-items: center;
`;
const Clear = styled(CloseFillCircle)<{ visible: boolean }>`
  color: rgba(0, 0, 0, 0.3);
  cursor: ${p => (p.visible ? 'pointer' : 'text')};
  opacity: ${p => (p.visible ? 1 : 0)};
  transition: opacity 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
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
  extends Omit<React.HTMLAttributes<HTMLElement>, 'size' | 'prefix' | 'ref'>,
    Omit<React.DOMAttributes<HTMLElement>, 'onChange'> {
  size?: 'small' | 'medium' | 'large';
  allowClear?: boolean;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  ref?: React.MutableRefObject<HTMLElement> | ((instance: HTMLInputElement) => void);
  inputRef?: React.MutableRefObject<HTMLInputElement>;
  inputProps?: React.HTMLAttributes<HTMLInputElement>;
  value?: string | number | string[];
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  sizeOpt?: SizeOpt;
}

type PropsWithoutSize = Omit<Props, 'size'> & { _size: 'small' | 'medium' | 'large' };

const Input: React.ForwardRefRenderFunction<HTMLInputElement, Props> = (
  {
    placeholder = '请输入',
    allowClear = false,
    size = 'medium',
    sizeOpt = { small: { fontSize: 12 }, medium: { fontSize: 14 }, large: { fontSize: 16 } },
    prefix,
    suffix,
    inputRef,
    inputProps = {},
    defaultValue = '',
    onChange,
    disabled = false,
    ...props
  },
  ref,
) => {
  const [localValue, setLocalValue] = useState(defaultValue);
  const isControlled = 'value' in props;
  const realValue = isControlled ? props.value : localValue;

  const handleChange = e => {
    onChange?.(e);
    if (!isControlled) {
      setLocalValue(e.target.value);
    }
  };
  const handleClear = e => {
    onChange?.({ target: { value: '' } } as React.ChangeEvent<HTMLInputElement>);
    if (!isControlled) {
      setLocalValue('');
    }
  };

  if (!suffix && !prefix && !allowClear) {
    return (
      <StyleInput
        {...props}
        ref={ref}
        placeholder={placeholder}
        value={realValue}
        onChange={handleChange}
        disabled={disabled}
        _size={size}
        sizeOpt={sizeOpt}
      />
    );
  }
  return (
    <Wrap {...props} _size={size} sizeOpt={sizeOpt} disabled={disabled} ref={ref}>
      {prefix}
      <input
        {...inputProps}
        className={clsx('WowInput-input', inputProps.className)}
        ref={inputRef}
        placeholder={placeholder}
        value={realValue}
        onChange={handleChange}
        disabled={disabled}
      />
      {allowClear && <Clear visible={Boolean(realValue)} onClick={handleClear} />}
      {suffix}
    </Wrap>
  );
};

export default withWowTheme(Input, 'WowInput-root');
