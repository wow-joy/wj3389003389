import React, { useRef } from 'react';
import { FormProvider, useFormContext, UseFormMethods } from 'react-hook-form';
import { FormContext } from './Form';
import { FormUIState } from './FormItem';

export interface ProviderProps extends FormContext {
  onFormSubmit?: any;
}

export const Provider: React.FC<ProviderProps> = ({ onFormSubmit, ...props }: any) => {
  const formContext = useFormContext() as FormContext;
  const formsRef = useRef<Record<string, UseFormMethods>>({});

  return (
    <FormProvider
      {...props}
      {...formContext}
      getForms={() => formsRef.current}
      registerForm={(name, form) => {
        if (name) {
          formsRef.current = {
            ...formsRef.current,
            [name]: form,
          };
        }
        formContext?.registerForm(name, form);
      }}
      triggerFormSubmit={(name, form) => {
        if (onFormSubmit) {
          onFormSubmit(name, {
            form,
            forms: formsRef.current,
          });
        }
        formContext?.triggerFormSubmit(name, form);
      }}
    />
  );
};
