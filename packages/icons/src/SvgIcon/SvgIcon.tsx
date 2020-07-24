import React from 'react';
import styled from '@wowjoy/styled';

export interface Props {
  children: React.ReactNode;
  style: { [key: string]: string };
  [key: string]: any;
}

const SvgIcon = styled.svg`
  fill: currentColor;
  width: 1em;
  height: 1em;
  display: inline-block;
  user-select: none;
  flex-shrink: 0;
  transition: fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
`;

export default React.forwardRef(({ style, children, ...other }: Props, ref: any) => {
  return (
    <SvgIcon
      viewBox="0 0 1024 1024"
      focusable="false"
      aria-hidden="true"
      ref={ref}
      style={style}
      {...other}
    >
      {children}
    </SvgIcon>
  );
});
