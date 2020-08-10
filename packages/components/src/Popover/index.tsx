import ReactDOM from 'react-dom';
import React, { useCallback, useRef, useEffect } from 'react';
import Modal, { Props as ModalProps } from '../Modal';
import { Placement } from '@popperjs/core';
import { useForkRef, useControlState } from '@wowjoy/hooks';
import styled, { useWowTheme } from '@wowjoy/styled';

const PopoverWrap = styled.div`
  background-color: #fff;
  border-radius: ${p => p.theme.shape.borderRadius}px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  &[data-popper-placement^='top'] > [data-popper-arrow] {
    bottom: -11px;
    &::before {
      box-shadow: 3px 3px 7px rgba(0, 0, 0, 0.07);
      left: 2px;
      top: -4px;
    }
  }
  &[data-popper-placement^='bottom'] > [data-popper-arrow] {
    top: -11px;
    &::before {
      left: 3px;
      top: 8px;
      box-shadow: -3px -3px 7px rgba(0, 0, 0, 0.07);
    }
  }
  &[data-popper-placement^='left'] > [data-popper-arrow] {
    right: -11px;
    &::before {
      top: 3px;
      left: -4px;
      box-shadow: 3px -3px 7px rgba(0, 0, 0, 0.07);
    }
  }
  &[data-popper-placement^='right'] > [data-popper-arrow] {
    left: -11px;
    &::before {
      left: 8px;
      top: 2px;
      box-shadow: -3px 3px 7px rgba(0, 0, 0, 0.07);
    }
  }
`;

export interface Props {
  className?: string;
  placement?: Placement;
  content: React.ReactNode;
  arrowRef?: React.MutableRefObject<HTMLElement>;
  popperRef?: React.MutableRefObject<HTMLElement>;
  style?: React.CSSProperties;
  showArrow?: boolean;
  arrow?: React.ReactElement;
  open?: boolean;
  TransitionComponent?: React.ComponentType;
  TransitionProps?: any;
  ModalProps?: ModalProps;
  onClose?: (e: any, triggerName: string) => void;
}

const Popover = React.forwardRef<any, Props>(
  (
    {
      children,
      open,
      content,
      showArrow,
      arrow,
      TransitionComponent,
      arrowRef,
      TransitionProps,
      ModalProps,
      onClose,
      ...props
    },
    ref,
  ) => {
    const theme = useWowTheme();
    const referenceRef = useRef<HTMLElement>(null);
    const popoverRef = useRef<HTMLDivElement>(null);
    const handleOwnRef = useCallback(instance => {
      // @ts-ignore
      referenceRef.current = ReactDOM.findDOMNode(instance);
    }, []);
    // @ts-ignore
    const handleReferenceRef = useForkRef(children.ref, handleOwnRef);

    useEffect(() => {
      if (open) {
        let pos = referenceRef.current.getBoundingClientRect();
        console.log(pos);
        popoverRef.current.style.position = 'absolute';
        popoverRef.current.style.top = pos.height + pos.top + 'px';
        popoverRef.current.style.left = pos.left + 'px';
      }
    }, [open]);
    return (
      <>
        {React.cloneElement(children as React.ReactElement, {
          ref: handleReferenceRef,
        })}
        <Modal
          onClose={onClose}
          open={open}
          BackdropProps={{ invisible: true }}
          ref={ref}
          {...ModalProps}
        >
          <PopoverWrap theme={theme} ref={popoverRef}>
            {showArrow &&
              React.cloneElement(arrow, {
                ref: arrowRef,
                'data-popper-arrow': true,
                style: { ...arrow.props.style },
                theme: theme,
              })}
            {content}
          </PopoverWrap>
        </Modal>
      </>
    );
  },
);

export default Popover;
