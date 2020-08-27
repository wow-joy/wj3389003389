import React, { useMemo, useCallback } from 'react';
import Checkbox from './Checkbox';
import CheckboxGroupContext from './CheckboxGroupContext';
import styled, { useWowTheme } from '@wowjoy/styled';
import { useControlState } from '@wowjoy/hooks';

const CheckboxWrap = styled.div`
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

export interface Props {
  value?: string[];
  defaultValue?: string[];
  disabled?: boolean;
  name?: string;
  options?: Array<string | { label: string; value: string; disabled: boolean }>;
  onChange?: (checkedValues: string[]) => void;
}

const CheckboxGroup = React.forwardRef<any, Props>(
  ({ defaultValue = [], disabled, name, options, onChange, children, ...props }) => {
    const theme = useWowTheme();
    const [value, setValue] = useControlState('value' in props, props.value, defaultValue);
    const handleChange = useCallback(
      checkedValues => {
        if (!('value' in props)) {
          setValue(checkedValues);
        }
        onChange?.(checkedValues);
      },
      [onChange],
    );

    const childrenToRender = useMemo(() => {
      if (options && options.length > 0) {
        return options.map(item => {
          if (typeof item === 'object') {
            return (
              <Checkbox key={item.value} {...item}>
                {item.label}
              </Checkbox>
            );
          }
          return (
            <Checkbox key={item} value={item}>
              {item}
            </Checkbox>
          );
        });
      }
      return children;
    }, [children, options]);

    return (
      <CheckboxGroupContext.Provider
        value={{
          disabled,
          defaultValue,
          value,
          onChange: handleChange,
          name,
        }}
      >
        <CheckboxWrap theme={theme} {...props}>
          {childrenToRender}
        </CheckboxWrap>
      </CheckboxGroupContext.Provider>
    );
  },
);

export default CheckboxGroup;
