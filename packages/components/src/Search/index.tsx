import React, { useState } from 'react';
import styled, { withWowTheme } from '@wowjoy/styled';
import Input from '../Input';
import InputGroup from '../InputGroup';
import ButtonBase from '../ButtonBase';

import { Search as SearchIcon } from '@wowjoy/icons';

const StyleIconWrap = styled(ButtonBase)`
  background: ${p => p.theme.palette.primary.main};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 32px;
  cursor: pointer;
  svg {
    color: #fff;
    font-size: 14px;
  }
`;

export interface Props extends React.HTMLAttributes<HTMLElement>, React.DOMAttributes<HTMLElement> {
  size?: 'small' | 'medium' | 'large';
  theme?: any;
  value?: string | number | string[];
  defaultValue?: string | number | string[];
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch?: (value: string | number | string[]) => void;
  disabled?: boolean;
  allowClear?: boolean;
  placeholder?: string;
}

const Search: React.FC<Props> = (
  {
    size = 'medium',
    allowClear = false,
    disabled = false,
    defaultValue = '',
    placeholder = '请输入',
    onChange,
    onSearch,
    theme,
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
  const handleSearch = () => {
    onSearch?.(realValue);
  };
  return (
    <InputGroup ref={ref}>
      <Input
        value={realValue}
        allowClear={allowClear}
        onChange={handleChange}
        disabled={disabled}
        onKeyPress={e => {
          if (e.which === 13) {
            handleSearch();
          }
        }}
        placeholder={placeholder}
      />
      <StyleIconWrap theme={theme} onClick={handleSearch}>
        <SearchIcon />
      </StyleIconWrap>
    </InputGroup>
  );
};

export default withWowTheme(Search, 'WowSearch-root');
