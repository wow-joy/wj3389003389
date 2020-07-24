import React, { useState } from 'react';
import styled from '@wowjoy/styled';
import Popper, { Props as PopperProps } from '../Popper';
import ClickAwayListener from '../ClickAwayListener';

export interface Props extends Omit<PopperProps, 'content'> {
  title: React.ReactNode;
}

const PopperSty = styled(Popper)`
  background-color: rgba(0, 0, 0, 0.7);
  padding: 10px 14px;
  color: #fff;
  & [data-popper-arrow]::before {
    background-color: rgba(0, 0, 0, 0.7);
  }
`;

const Tooltip: React.FC<Props> = ({ children, title, placement, ...props }) => {
  return (
    <PopperSty showArrow content={title} placement={placement} open={true} {...props}>
      {children}
    </PopperSty>
  );
};

export default Tooltip;
