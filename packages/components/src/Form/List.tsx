import React from 'react';
import { useFieldArray, useFormContext, UseFormMethods } from 'react-hook-form';

export interface ListProps {
  name?: string;
  control?: UseFormMethods['control'];
  children: (args: ReturnType<typeof useFieldArray>) => any;
}

export const List: React.FC<ListProps> = ({ children, name, control: control0 }) => {
  const context = useFormContext();

  const res = useFieldArray({ control: control0 || context.control, name });
  return children(res);
};
