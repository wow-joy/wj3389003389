import ReactDOM from 'react-dom';
import React, { useState, useRef, useEffect } from 'react';
import Modal, { Props as ModalProps } from '../Modal';
import styled, { useWowTheme } from '@wowjoy/styled';
import clsx from 'clsx';
import { Close } from '@wowjoy/icons';
import { Collapse } from '../transitions/Collapse';

const DialogWrap = styled.div`
  background: #fff;
  box-shadow: ${p => p.theme.shadows[2]};
  border-radius: ${p => p.theme.shape.borderRadius}px;
`;
const DialogHeader = styled.div`
  position: relative;
  color: ${p => p.theme.palette.primary.contrastText};
  background-color: ${p => p.theme.palette.primary.main};
  padding: 12px 10px;
  min-width: 100px;
  .WowDialog-header-title {
    font-size: 14px;
    line-height: 14px;
  }
  .WowDialog-header-close {
    font-size: 13px;
    position: absolute;
    top: 12px;
    right: 18px;
    cursor: pointer;
  }
`;
const DialogBody = styled.div``;
const DialogTitle = styled.div``;

export interface Props extends ModalProps {
  title?: React.ReactElement;
  className?: string;
  style?: React.CSSProperties;
}

const Dialog = React.forwardRef<any, Props>(
  ({ children, title, className, style, ...props }, ref) => {
    const { open, onClose } = props;
    const theme = useWowTheme();

    return (
      <Modal ref={ref} {...props}>
        <Collapse in={open}>
          <DialogWrap theme={theme} className={clsx('WowDialog-root', className)} style={style}>
            <DialogHeader theme={theme} className="WowDialog-header">
              <DialogTitle theme={theme} className="WowDialog-header-title">
                {title}
              </DialogTitle>
              <Close className="WowDialog-header-close" onClick={onClose} />
            </DialogHeader>
            <DialogBody theme={theme} className="WowDialog-body">
              {children}
            </DialogBody>
          </DialogWrap>
        </Collapse>
      </Modal>
    );
  },
);

export default Dialog;
