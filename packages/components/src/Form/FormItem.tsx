import { PropsOf } from '@wowjoy/types';
import React from 'react';
import { Box } from '../Box';

export interface FormUIState {
  colon?: boolean;
  query?: boolean;
  layout?: 'horizontal' | 'vertical' | 'inline';
  loading?: boolean;
  rootBoxProps?: PropsOf<typeof Box>;
  labelBoxProps?: PropsOf<typeof Box>;
  valueBoxProps?: PropsOf<typeof Box>;
}

export interface FormItemProps extends FormUIState {
  required?: boolean;
  label?: React.ReactNode;
  value?: React.ReactNode;
}

export const FormItem: React.FC<FormItemProps> = ({
  layout = 'horizontal',
  label,
  children,
  rootBoxProps,
  labelBoxProps,
  valueBoxProps,
  colon,
}) => {
  return (
    <Box
      className="WowFormItem-root"
      display={layout === 'vertical' ? 'unset' : 'flex'}
      flexWrap={layout === 'inline' ? 'nowrap' : 'wrap'}
      css={
        layout === 'inline' &&
        `
      &:not(:first-child){
        margin-left:8px;
      }
    `
      }
      {...rootBoxProps}
    >
      {label !== false && (
        <Box
          className="WowFormItem-label"
          position="relative"
          pr="1em"
          lineHeight="32px"
          fontSize={14}
          display="flex"
          justifyContent={layout === 'horizontal' ? 'flex-end' : 'unset'}
          flexShrink={0}
          width={layout === 'inline' ? 'min-content' : 'unset'}
          css={
            colon &&
            label &&
            layout === 'horizontal' &&
            `
          &::after {
            content: ':';
            display: inline-block;
            margin-left: 3px;
            position: absolute;
            right: 4px;
          }
        `
          }
          {...labelBoxProps}
        >
          {label}
        </Box>
      )}
      <Box
        className="WowFormItem-value"
        css={`
          input {
            height: 32px;
            width: 100%;
          }
        `}
        {...valueBoxProps}
      >
        {children}
      </Box>
    </Box>
  );
};
