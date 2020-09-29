import styled from '@wowjoy/styled';
import { PropsOf } from '@wowjoy/types';
import isEmpty from 'lodash/isEmpty';
import set from 'lodash/set';
import React, { useContext, useEffect, useState } from 'react';
import { Controller, useFormContext, ValidationRules } from 'react-hook-form';
import { Box, Slide } from '..';
import getPath from '../utils/getPath';
import { FormItemContext } from './conext';
import { FormContext } from './Form';
import { FormItem, FormItemProps, FormUIState } from './FormItem';

const FormItemExplain = styled.div`
  min-height: 20px;
  line-height: 20px;
  font-size: 12px;
  color: red;
`;

export interface ItemProps extends Omit<FormItemProps, 'required'>, FormUIState {
  name?: string;
  required?: boolean | string;
  rules?: ValidationRules;
  defaultValue?: string | ReadonlyArray<string> | number | boolean;
  control?: boolean;
  valuePropName?: string;
  trigger?: string;
  refKey?: string;
  noStyle?: boolean;
  renderValue?: (value: React.ReactNode) => React.ReactNode;
  itemControlBoxProps?: PropsOf<typeof Box>;
  children: ((formContext: FormContext) => React.ReactNode) | React.ReactNode;
}

export const Item: React.FC<ItemProps> = props => {
  const {
    control = true,
    name,
    defaultValue = '',
    refKey = 'ref',
    required,
    rules = {},
    valuePropName = 'value',
    trigger = 'onChange',
    label,
    noStyle,
    renderValue,
    itemControlBoxProps,
  } = props;
  const { updateChildNames } = useContext(FormItemContext);
  const context = useFormContext() as FormContext;
  const { register, errors, uiState } = context;
  const [childNames, setChildNames] = useState<string[]>([]);

  const formItemPropsWithContext = [
    'colon',
    'query',
    'layout',
    'loading',
    'rootBoxProps',
    'labelBoxProps',
    'valueBoxProps',
  ].reduce((memo, prop) => {
    memo[prop] = props[prop] !== undefined ? props[prop] : uiState[prop];
    return memo;
  }, {});

  const mergeRules = {
    ...rules,
    required:
      typeof required === 'string'
        ? required
        : required === true
        ? `${label || name} 必填`
        : rules.required || false,
  };

  // @ts-ignore
  const children = typeof props.children === 'function' ? props.children(context) : props.children;

  const child = control ? (
    <Controller
      name={name}
      defaultValue={defaultValue}
      control={context.control}
      rules={mergeRules}
      render={({ value, onChange, onBlur, name }) => {
        return React.cloneElement(children as React.ReactElement, {
          name,
          onBlur,
          [valuePropName]: value,
          [trigger]: (e: any) => {
            const newValue = !!e?.nativeEvent ? e?.target?.[valuePropName] : e;
            context.onValuesChange?.(
              set({}, name, newValue),
              set(context.getValues(), name, newValue),
            );
            children.props[trigger]?.(newValue);
            return onChange(newValue);
          },
        });
      }}
    />
  ) : (
    children
  );

  const childNode = name
    ? React.cloneElement(child as React.ReactElement, {
        name,
        defaultValue,
        ...(control
          ? {}
          : {
              [refKey]: register(mergeRules),
            }),
      })
    : children;

  const errorMsg = getPath(errors, name)?.message;

  useEffect(() => {
    name && noStyle && updateChildNames(p => [...p, name]);
  }, [name, noStyle]);

  if (noStyle) {
    return childNode;
  }

  const finalErrorMsg = noStyle
    ? null
    : childNames.length > 0 && !isEmpty(errors)
    ? Object.keys(errors).some(name => childNames.includes(name))
      ? errors
      : null
    : errorMsg || null;

  const errorMsgNode =
    finalErrorMsg && !isEmpty(finalErrorMsg) ? (
      typeof finalErrorMsg === 'string' ? (
        <Slide
          unmountOnExit
          in={!!finalErrorMsg}
          movement="10px"
          timeout={{ appear: 100, enter: 0, exit: 0 }}
        >
          <FormItemExplain>{finalErrorMsg}</FormItemExplain>
        </Slide>
      ) : (
        <div>
          {Object.keys(finalErrorMsg)
            .filter(name => childNames.includes(name))
            .map((name, i) => (
              <Slide
                key={i}
                unmountOnExit
                in={!!finalErrorMsg}
                movement="10px"
                timeout={{ appear: 100, enter: 0, exit: 0 }}
              >
                <FormItemExplain>{finalErrorMsg[name].message}</FormItemExplain>
              </Slide>
            ))}
        </div>
      )
    ) : (
      <div style={{ height: 20 }} />
    );

  return (
    <>
      <FormItem label={noStyle ? false : label} {...formItemPropsWithContext}>
        <Box
          className="Wowform-form-item-control"
          minHeight={32}
          position="relative"
          display="flex"
          alignItems="center"
          flex="auto"
          maxWidth="100%"
          {...itemControlBoxProps}
        >
          <FormItemContext.Provider
            value={{
              updateChildNames: noStyle ? updateChildNames : setChildNames,
            }}
          >
            {renderValue ? renderValue(childNode) : childNode}
          </FormItemContext.Provider>
        </Box>
        {errorMsgNode}
      </FormItem>
    </>
  );
};
