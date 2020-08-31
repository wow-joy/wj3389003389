import React from 'react';

interface IFieldProps {}

const formFields = {};

export function registerFormField(name: string, Component: React.ComponentType<IFieldProps>) {
  formFields[name] = Component;
}

export const RegisterField = React.forwardRef<any, { component: string }>(
  ({ component, ...restProps }, ref) => {
    const Com = formFields[component];
    return <Com {...restProps} ref={ref} />;
  },
);
