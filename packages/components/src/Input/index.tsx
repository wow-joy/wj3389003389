import React, { useRef } from 'react';
import styled, { withWowTheme, css, borderCss, DefaultTheme } from '@wowjoy/styled';
import { useControlState, useForkRef } from '@wowjoy/hooks';
import { CloseFillCircle } from '@wowjoy/icons';
import clsx from 'clsx';
import InputBase from '../InputBase';

const wrapCss = css<PropsWithoutSize>`
  padding: 7px 10px;
  font-size: ${p => p.sizeOpt[p.size].fontSize}px;
`;
const placeholderCss = css<PropsWithoutSize>`
  &::placeholder {
    font-size: ${p => p.sizeOpt[p.size].fontSize}px;
    line-height: ${p => p.sizeOpt[p.size].fontSize}px;
  }
  &:placeholder-shown {
    color: ${p => p.theme.palette.disabled};
    text-overflow: ellipsis;
  }
`;

const StyleInput = styled(InputBase)<any>`
  ${borderCss}
  ${wrapCss}
  ${placeholderCss}
  cursor: ${p => (p.disabled ? 'not-allowed' : 'inherit')};
`;

const Wrap = styled.span<PropsWithoutSize>`
  ${borderCss}
  ${wrapCss}
  cursor: text;
  display: inline-flex;
  align-items: center;
  .WowInput-input {
    font-size: ${p => p.sizeOpt[p.size].fontSize}px;
    ${placeholderCss}
  }
  &:hover .WowInput-clear-visible {
    opacity: 1;
    cursor: pointer;
  }
`;
const Clear = styled(CloseFillCircle)`
  color: rgba(0, 0, 0, 0.3);
  cursor: text;
  opacity: 0;
  transition: opacity ${p => p.theme.transitions.duration.short}ms
    ${p => p.theme.transitions.easing.easeInOut} 0ms;
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
export interface Props extends Omit<React.HTMLAttributes<HTMLElement>, 'size' | 'prefix' | 'ref'> {
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
  theme?: DefaultTheme;
}

type PropsWithoutSize = Omit<Props, 'size'> & { size: 'small' | 'medium' | 'large' };

const Input: React.FC<Props> = (
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
    className,
    ...props
  },
  ref,
) => {
  const { theme } = props;
  const isControlled = 'value' in props;
  const [value, setValue] = useControlState(isControlled, props.value, defaultValue);
  const handleChange = e => {
    onChange?.(e);
    if (!isControlled) {
      setValue(e.target.value);
    }
  };
  const selfInputRef = useRef<HTMLInputElement>();
  const handleInputRef = useForkRef(inputRef, selfInputRef);

  const handleClear = e => {
    onChange?.({ target: { value: '' } } as React.ChangeEvent<HTMLInputElement>);
    if (!isControlled) {
      setValue('');
    }
  };
  const handleClick = e => {
    props.onClick?.(e);
    selfInputRef.current.focus();
  };
  if (!suffix && !prefix && !allowClear) {
    return (
      <StyleInput
        {...props}
        className={clsx(className, { 'Wow-disabled': disabled })}
        ref={ref}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        disabled={disabled}
        size={size}
        sizeOpt={sizeOpt}
      />
    );
  }
  return (
    <Wrap
      {...props}
      onClick={handleClick}
      className={clsx(className, { 'Wow-disabled': disabled })}
      size={size}
      sizeOpt={sizeOpt}
      disabled={disabled}
      ref={ref}
    >
      {prefix}
      <InputBase
        {...inputProps}
        className={clsx('WowInput-input', inputProps.className)}
        ref={handleInputRef}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        disabled={disabled}
      />
      {allowClear && (
        <Clear
          className={clsx('WowInput-input-clear', {
            'WowInput-clear-visible': Boolean(value),
          })}
          theme={theme}
          onClick={handleClear}
        />
      )}
      {suffix}
    </Wrap>
  );
};

export default withWowTheme(Input, 'WowInput-root');
