import styled, { DefaultTheme, useWowTheme } from '@wowjoy/styled';
import React, { useEffect, useRef } from 'react';
import Backdrop, { Props as BackdropProps } from '../Backdrop';
import Portal, { Props as PortalProps } from '../Portal';
import { Fade } from '../transitions/Fade';
import clsx from 'clsx';

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
  TransitionComponent?: React.ComponentType;
  TransitionProps?: any;
  onClose?: (e?: any, triggerName?: string) => void;
  onBackdropClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  theme?: DefaultTheme;
}

const Modal = React.forwardRef<any, Props>(
  (
    {
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
      TransitionComponent = Fade,
      TransitionProps = {},
      ...props
    },
    ref,
  ) => {
    const posRef = useRef(null);
    const theme = useWowTheme();
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
    useEffect(() => {
      document.body.style.overflow = open ? 'hidden' : '';
    }, [open]);
    return (
      <Portal container={container} ref={ref} {...props}>
        <TransitionComponent mountOnEnter unmountOnExit in={open} {...TransitionProps}>
          <Wrap theme={theme} className={clsx('WowModal-root')}>
            {!hideBackdrop && (
              <Backdrop in={open} {...BackdropProps} onClick={handleBackdropClick} />
            )}
            {children}
          </Wrap>
        </TransitionComponent>
      </Portal>
    );
  },
);

export default Modal;
