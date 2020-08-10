import React, { useState, useContext } from 'react';
import styled from '@wowjoy/styled';
import { useControlState } from '@wowjoy/hooks';
import Popper, { Props as PopperProps } from '../Popper';

export interface Props extends Omit<PopperProps, 'content'> {
  title: React.ReactNode;
  trigger?: 'hover' | 'focus' | 'click' | 'contextMenu';
}

const PopperSty = styled(Popper)`
  background-color: rgba(0, 0, 0, 0.7);
  padding: 10px 14px;
  color: #fff;
  & [data-popper-arrow]::before {
    background-color: rgba(0, 0, 0, 0.7);
  }
`;

const Tooltip: React.FC<Props> = ({ children, trigger = 'hover', title, ...props }) => {
  const [open, setOpen] = useControlState('open' in props, props.open, false);

  const handleOpen = eventname => e => {
    setOpen(true);
    children.props[eventname]?.(e);
  };
  const handleClose = eventname => e => {
    setOpen(false);
    children.props[eventname]?.(e);
  };

  const childProps: any = {};
  if (trigger === 'hover') {
    childProps.onMouseEnter = handleOpen('onMouseEnter');
    childProps.onMouseLeave = handleClose('onMouseLeave');
  }
  if (trigger === 'focus') {
    childProps.onFocus = handleOpen('onFocus');
    childProps.onBlur = handleClose('onBlur');
  }
  if (trigger === 'click') {
    childProps.onClick = e => {
      setOpen(prev => !prev);
      children.props.onClick?.(e);
    };
  }
  if (trigger === 'contextMenu') {
    childProps.onContextMenu = handleOpen('onContextMenu');
    childProps.onBlur = handleClose('onBlur');
  }

  return (
    <PopperSty content={title} {...props} open={open}>
      {React.cloneElement(children, {
        ...childProps,
      })}
    </PopperSty>
  );
};

export default Tooltip;
