import { useForkRef } from '@wowjoy/hooks';
import styled from '@wowjoy/styled';
import React, { useEffect, useImperativeHandle } from 'react';
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useFormContext,
  UseFormMethods,
  UseFormOptions,
} from 'react-hook-form';
import { SubmitErrorHandler } from 'react-hook-form/dist/types/form';
import { FormUIState } from './FormItem';
import { useForm } from './useForm';

const StyledForm = styled.form<{ layout: FormUIState['layout'] }>`
  ${p => p.layout === 'inline' && `display:flex;`}
`;

export interface FormContext extends UseFormMethods {
  uiState: FormUIState;
  onValuesChange?: (changedValues: any, values: any) => void;
  onFormSubmit?: any;
  registerForm?: (name: string, form: UseFormMethods) => void;
  triggerFormSubmit?: (name: string, ctx: any) => void;
}

export interface FormProps extends UseFormOptions, FormUIState {
  name?: string;
  onSubmit?: SubmitHandler<FieldValues>;
  onError?: SubmitErrorHandler<FieldValues>;
  form?: ReturnType<typeof useForm>;
  onValuesChange?: (values: any) => void;
  formRef?: React.Ref<HTMLFormElement>;
  children: React.ReactElement | React.ReactElement[];
}

export const Form = React.forwardRef<any, FormProps>(
  (
    {
      children,
      onSubmit,
      onError,
      form: form0,
      loading,
      query = false,
      layout = 'horizontal',
      colon = false,
      rootBoxProps,
      labelBoxProps,
      valueBoxProps,
      onValuesChange,
      name,
      formRef: formRef0,
      ...rest
    },
    ref,
  ) => {
    const context = useFormContext() as FormContext;
    const form = form0 || useForm(rest);
    const formRef = useForkRef(form.formRef, formRef0);

    useImperativeHandle(ref, () => form);

    useEffect(() => {
      name && context?.registerForm?.(name, form);
    }, [context, form]);

    return (
      <FormProvider
        {...form}
        onValuesChange={onValuesChange}
        {...context}
        // @ts-ignore
        uiState={{
          ...context?.uiState,
          colon,
          query,
          layout,
          loading,
          rootBoxProps,
          labelBoxProps,
          valueBoxProps,
        }}
        onSubmit={e => {
          form.handleSubmit(onSubmit, onError)(e);
          context?.triggerFormSubmit?.(name, form);
        }}
        {...rest}
      >
        <StyledForm
          ref={formRef}
          id={name}
          layout={layout}
          {...(onSubmit
            ? {
                onSubmit: e => {
                  form.handleSubmit(onSubmit, onError)(e);
                  context?.triggerFormSubmit?.(name, form);
                },
              }
            : {})}
        >
          {children}
        </StyledForm>
      </FormProvider>
    );
  },
);
