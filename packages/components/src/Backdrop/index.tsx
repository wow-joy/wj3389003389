import React from 'react';
import styled, { withWowTheme, DefaultTheme } from '@wowjoy/styled';
import { Fade } from '../transitions';
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

export interface Props extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  invisible?: boolean;
  className?: string;
  TransitionComponent?: React.ComponentType;
  TransitionProps?: any;
  theme: DefaultTheme;
  in: boolean;
}
const Backdrop: React.FC<Props> = ({
  invisible = false,
  TransitionComponent = Fade,
  children,
  TransitionProps,
  theme,
  className,
  in: inProps,
  ...props
}) => {
  return (
    <TransitionComponent in={inProps} {...TransitionProps}>
      <Template theme={theme} className={clsx(className, { invisible: invisible })} {...props}>
        {children}
      </Template>
    </TransitionComponent>
  );
};

export default withWowTheme(Backdrop, 'WowBackdrop-root');
