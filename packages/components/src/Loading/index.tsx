import React from 'react';
import { Loading } from '@wowjoy/icons';
import styled, { keyframes, withWowTheme } from '@wowjoy/styled';

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export default withWowTheme<any, any>(
  styled(Loading)`
    animation: ${rotate} linear 1.2s infinite;
  `,
  'WowLoading-icon',
);
