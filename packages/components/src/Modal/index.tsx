import React, { useState, useEffect, useRef } from 'react';
import styled, { withWowTheme, useWowTheme } from '@wowjoy/styled';
import Portal, { Props as PortalProps } from '../Portal';
import Backdrop, { Props as BackdropProps } from '../Backdrop';
import { Transition } from 'react-transition-group';
import { Collapse } from '../transitions/Collapse';
import { Fade } from '../transitions/Fade';

import { useControlState } from '@wowjoy/hooks';
import clsx from 'clsx';
import ownerDocument from '../utils/ownerDocument';

const Wrap = styled.div`
  z-index: ${p => p.theme.zIndex.modal};
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export interface Props extends PortalProps {
  open: boolean;
  hideBackdrop?: boolean;
  BackdropProps?: BackdropProps;
  mountOnEnter?: boolean;
  unmountOnExit?: boolean;
  maskClosable?: boolean;
  onClose?: (e: any, triggerName: string) => void;
  onBackdropClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const Modal: React.FC<Props> = ({
  open,
  hideBackdrop = false,
  container,
  BackdropProps,
  children,
  onClose,
  onBackdropClick,
  mountOnEnter = true,
  unmountOnExit = true,
  maskClosable = true,
  ...props
}) => {
  const posRef = useRef(null);
  const theme = useWowTheme();
  const timeout = {
    appear: theme.transitions.duration.enteringScreen,
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  };
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    onBackdropClick?.(e);
    maskClosable && onClose?.(e, 'backdropClick');
  };

  useEffect(() => {
    const getPosition = e => {
      posRef.current = {
        x: e.clientX,
        y: e.clientY,
      };
    };
    document.addEventListener('mousedown', getPosition);

    return () => {
      document.removeEventListener('mousedown', getPosition);
      posRef.current = null;
    };
  }, []);
  return (
    <Portal container={container} {...props}>
      <Transition
        mountOnEnter={mountOnEnter}
        unmountOnExit={unmountOnExit}
        in={open}
        timeout={timeout}
      >
        <Wrap theme={theme}>
          {!hideBackdrop && <Backdrop in={open} {...BackdropProps} onClick={handleBackdropClick} />}
          {children}
        </Wrap>
      </Transition>
    </Portal>
  );
};

export default withWowTheme(Modal, 'WowModal-root');
