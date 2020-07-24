import React from 'react';
import styled, { withWowTheme } from '@wowjoy/styled';

export default withWowTheme<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
  // any
>(
  styled.input`
    border: none;
    outline: none;
    padding: 0;
    background: transparent;
    &::placeholder {
      font-size: 14px;
      padding: 0;
      color: ${p => p.theme.palette.disabled};
    }
  `,
  'WowInputBase-root',
);
