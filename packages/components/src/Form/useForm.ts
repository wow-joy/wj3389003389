import React, { useRef } from 'react';
import { useForm as useForm0, useFormContext, UseFormOptions } from 'react-hook-form';
import { FormContext } from './Form';

export function useForm(options?: UseFormOptions) {
  const form = useForm0(options);
  const context = useFormContext() as FormContext;
  const formRef = useRef<HTMLFormElement>();

  return React.useMemo(
    () => ({
      ...context,
      ...form,
      registerForm: (name: string) => context?.registerForm(name, form),
      triggerFormSubmit: (name: string) => context?.triggerFormSubmit(name, form),
      formRef,
      submit: () => {
        form.handleSubmit(() => {})();
        const name = formRef.current?.id;
        name && context?.triggerFormSubmit(name, form);
      },
    }),
    [context, form],
  );
}
