import React from 'react';
import styled, { withWowTheme } from '@wowjoy/styled';
import { Fade, FadeProps } from '../transitions';
import clsx from 'clsx';

const Template = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: -1;
  -webkit-tap-highlight-color: transparent;
  background-color: rgba(0, 0, 0, 0.3);
  &.invisible {
    background-color: transparent;
  }
`;

export interface Props extends FadeProps, Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  invisible?: boolean;
  className?: string;
}
const Backdrop: React.FC<Props> = ({ invisible = false, children, theme, className, ...props }) => {
  return (
    <Fade {...props}>
      <Template theme={theme} className={clsx(className, { invisible: invisible })}>
        {children}
      </Template>
    </Fade>
  );
};

export default withWowTheme(Backdrop, 'WowBackdrop-root');
