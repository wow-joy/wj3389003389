/**
 * getRenderPropValue 用于返回string,ReactNode,() => ReactNode 类型的属性
 */
import React from 'react';

export type RenderFunction = () => React.ReactNode;

export const getRenderPropValue = (propsValue?: React.ReactNode | RenderFunction):React.ReactNode  => {
  if (!propsValue) {
    return null;
  }
  const isFunc = typeof propsValue === 'function';
  if (isFunc) {
    return (propsValue as RenderFunction)();
  }
  return propsValue;
}
