import React, { useMemo, useCallback } from 'react';
import Radio from './Radio';
import RadioButton from './RadioButton';
import RadioGroupContext from './RadioGroupContext';
import styled, { useWowTheme } from '@wowjoy/styled';
import { useControlState, useList } from '@wowjoy/hooks';
import { EventTarget } from './useRadio';

const RadioWrap = styled.div`
  display: flex;
  align-items: center;
  .WowButton-root {
    &:not(:last-child) {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
      margin-right: -1px;
    }
    &:not(:first-child) {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
  }
`;

export interface Props extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  value?: any;
  defaultValue?: any;
  disabled?: boolean;
  name?: string;
  onChange?: (e: React.MouseEvent & { target: EventTarget }) => void;
  options?: Array<string | { label: string; value: string; disabled: boolean }>;
  optionType?: 'radio' | 'button';
  size?: 'large' | 'medium' | 'small';
  buttonVariant?: 'contained' | 'outlined' | 'text'; // 每个子Radio注入的props
}

const RadioGroup = React.forwardRef<any, Props>(
  ({
    defaultValue,
    disabled,
    name,
    options,
    optionType = 'radio',
    size,
    buttonVariant = 'contained',
    onChange,
    children,
    ...props
  }) => {
    const theme = useWowTheme();
    const [value, setValue] = useControlState('value' in props, props.value, defaultValue);
    // 子组件Radio的value注册
    const [values, { push, updateAt, remove }] = useList([]);

    const handleChange = useCallback(
      e => {
        if (!('value' in props)) {
          setValue(e.target.value);
        }
        onChange?.(e);
      },
      [onChange],
    );

    const childrenToRender = useMemo(() => {
      if (options && options.length > 0) {
        const RadioOption = optionType === 'radio' ? Radio : RadioButton;
        return options.map(item => {
          if (typeof item === 'object') {
            return (
              <RadioOption key={item.value} {...item}>
                {item.label}
              </RadioOption>
            );
          }
          return (
            <RadioOption key={item} value={item}>
              {item}
            </RadioOption>
          );
        });
      }
      return children;
    }, [children, options]);

    // 键盘切换value
    const handleKeyDown = e => {
      e.preventDefault();
      props.onKeyDown?.(e);
      if (e.key.startsWith('Arrow')) {
        let changedIndex;
        let currentIndex = values.findIndex(item => item.value === value);
        if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
          changedIndex = currentIndex === 0 ? values.length - 1 : currentIndex - 1;
        } else {
          changedIndex = currentIndex === values.length - 1 ? 0 : currentIndex + 1;
        }
        e.target = values[changedIndex];
        e.target.focus();
        handleChange(e);
      }
    };
    // 将Radio的值注册到Group
    const registe = useCallback((value, preValue) => {
      let index = values.findIndex(v => v.value === preValue);
      // 如果已经存在，替换掉，否则加入values
      if (index !== -1) {
        if (!value.disabled) {
          updateAt(index, value);
        } else {
          remove(index);
        }
      } else {
        !value.disabled && push(value);
      }
    }, []);

    return (
      <RadioGroupContext.Provider
        value={{
          disabled,
          defaultValue,
          value,
          onChange: handleChange,
          name,
          size,
          buttonVariant,
          registe,
        }}
      >
        <RadioWrap {...props} theme={theme} onKeyDown={handleKeyDown}>
          {childrenToRender}
        </RadioWrap>
      </RadioGroupContext.Provider>
    );
  },
);

RadioGroup.displayName = 'RadioGroup';

export default RadioGroup;
