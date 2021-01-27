import React, { useState, useEffect } from 'react';
import styled from '@wowjoy/styled';
import clsx from 'clsx';
import { Caret } from '@wowjoy/icons';
import { addition, subtraction } from './utils';

const MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || 2 ** 53 - 1;

const InputNumberBox = styled.div<{ width: number }>`
  position: relative;
  min-width: 0;
  font-size: 14px;
  line-height: 1.57;
  background-color: #fff;
  background-image: none;
  transition: all 0.3s;
  display: inline-block;
  width: ${p => p.width || 100}px;
  height: 32px;
  margin: 0;
  padding: 0;
  border: 1px solid rgb(220, 220, 220);
  border-radius: 3px;

  &&.wowjoy-input-number:hover {
    border-color: #40a9ff;
    border-right-width: 1px !important;
    .input-number-handler-wrap {
      opacity: 1;
    }
  }
  &&.wowjoy-input-number-disabled {
    color: rgba(0, 0, 0, 0.25);
    background-color: #f5f5f5;
    cursor: not-allowed;
    opacity: 1;
    .input-number-handler-wrap {
      display: none;
    }
    input {
      cursor: not-allowed;
    }
  }
  &&.wowjoy-input-number-readOnly {
    .input-number-handler-wrap {
      display: none;
    }
  }
  &&.wowjoy-input-number-small {
    font-size: 12px;
    height: 24px;
    svg {
      font-size: 7px;
    }
  }
  &&.wowjoy-input-number-large {
    font-size: 16px;
    height: 42px;
  }
`;
const HandlerWrap = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 22px;
  height: 100%;
  background: #fff;
  border-left: 1px solid #d9d9d9;
  border-radius: 0 2px 2px 0;
  opacity: 0;
  transition: opacity 0.24s linear 0.1s;
  span {
    position: relative;
    display: block;
    width: 100%;
    height: 50%;
    padding-top: 2px;
    overflow: hidden;
    color: rgba(0, 0, 0, 0.45);
    font-weight: 700;
    line-height: 0;
    text-align: center;
    transition: all 0.1s linear;
    cursor: pointer;
    svg {
      font-size: 10px;
    }
  }
  span:hover {
    color: rgb(25, 142, 235);
    height: 60% !important;
    padding-top: 4px !important;
  }
  :hover {
    span {
      height: 40%;
      padding-top: 1px;
    }
  }
`;
const HandlerUp = styled.span`
  border-top-right-radius: 3px;
  svg {
    transform: rotate(-90deg);
  }
`;
const HandlerDown = styled.span`
  top: 0;
  border-top: 1px solid #d9d9d9;
  border-bottom-right-radius: 3px;
  svg {
    transform: rotate(90deg);
  }
`;

const InputWrap = styled.div`
  height: 100%;
`;
const Input = styled.input`
  height: 100%;
  width: 100%;
  padding: 0 11px;
  text-align: left;
  background-color: transparent;
  border: 0;
  border-radius: 2px;
  outline: 0;
  transition: all 0.3s linear;
  &&:placeholder-shown {
    color: rgb(204, 204, 204);
    text-overflow: ellipsis;
  }
`;

export interface InputNumberProps {
  placeholder?: string;
  min?: number;
  max?: number;
  value?: number;
  step?: number | string;
  defaultValue?: number;
  onChange?: (value: number | string | undefined) => void;
  disabled?: boolean;
  readOnly?: boolean;
  size?: 'small' | 'middle' | 'large';
  formatter?: (value: number | string | undefined) => string;
  parser?: (displayValue: string | undefined) => number | string;
  style?: React.CSSProperties;
  className?: string;
  name?: string;
  id?: string;
  onStep?: (value: number, info: { offset: number; type: 'up' | 'down' }) => void;
  width?: number;
}

const InputNumber = React.forwardRef<any, InputNumberProps>(
  (
    {
      placeholder = '请输入',
      size = 'middle',
      defaultValue,
      onChange,
      disabled = false,
      readOnly = false,
      className,
      step = 1,
      value,
      min = -MAX_SAFE_INTEGER,
      max = MAX_SAFE_INTEGER,
      formatter,
      parser,
      style,
      onStep,
      width,
      ...props
    },
    ref,
  ) => {
    const [v, setV] = useState<number>(defaultValue);
    useEffect(() => {
      if (value) {
        changeValue(value);
      }
    }, [value]);
    const changeValue = (num: number | string) => {
      if (num === '') {
        setV(undefined);
      }
      if (num < min || num > max) {
        return;
      } else {
        setV(Number(num));
      }
      onChange && onChange(parser ? parser(`${num}`) : num);
    };

    const inputChange = e => {
      const val = e.target.value;
      const trueVal = parser ? parser(val) : val;
      if (/^(\d|\.)+$/.test(trueVal) || trueVal === '') {
        changeValue(trueVal);
      }
    };
    const add = (num: number, str: 'up' | 'down') => {
      // 没有设置任何值的情况
      const preV = v || 0;
      let currV;
      if (str === 'up') {
        currV = addition(preV, num);
      } else {
        currV = subtraction(preV, num);
      }
      changeValue(currV);
      onStep && onStep(currV, { offset: Number(step), type: str });
    };
    const format = () => {
      if (v === undefined) {
        return '';
      }
      if (formatter) {
        return formatter(v);
      }
      return v && v.toString();
    };
    const formatValue = format();
    return (
      <InputNumberBox
        className={clsx(
          className,
          disabled ? 'wowjoy-input-number-disabled' : 'wowjoy-input-number',
          readOnly && 'wowjoy-input-number-readOnly',
          `wowjoy-input-number-${size}`,
        )}
        style={style}
        width={width}
      >
        <HandlerWrap className={'input-number-handler-wrap'}>
          <HandlerUp onClick={() => add(Number(step), 'up')}>
            <Caret />
          </HandlerUp>
          <HandlerDown onClick={() => add(Number(step), 'down')}>
            <Caret />
          </HandlerDown>
        </HandlerWrap>
        <InputWrap>
          <Input
            {...props}
            placeholder={placeholder}
            min={min}
            max={max}
            disabled={disabled}
            readOnly={readOnly}
            onChange={inputChange}
            value={formatValue}
          ></Input>
        </InputWrap>
      </InputNumberBox>
    );
  },
);

export default InputNumber;
