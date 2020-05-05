import React, { useReducer, useRef } from 'react';
import styled from 'styled-components';
import TouchRipple from './TouchRipple';
import withTheme from '../styles/withTheme';

const StyleButton = styled.button`
  position: relative;
  padding: 6px 16px;
  border-radius: 4px;
  min-width: 64px;
  line-height: 1.75;
  border: 0;
  background-color: ${p => p.theme.primary};
  color: #fff;
  cursor: pointer;
  transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  .WowButton-label {
    width: 100%;
  }
  &:focus {
    outline: 0;
  }
  &:hover {
    background-color: #4fb1ff;
  }
  &:active {
    background-color: #197bc9;
  }
`;

const Button: React.FC<any> = ({ children, ...props }) => {
  const rippleRef = useRef<{ start: (offset: any) => void }>();

  const handleMouseDown = e => {
    rippleRef.current.start({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });
    props.onClick && props.onClick();
  };
  return (
    <StyleButton {...props} onMouseDown={handleMouseDown}>
      <span className="WowButton-label">{children}</span>
      <TouchRipple ref={rippleRef} />
    </StyleButton>
  );
};

export default withTheme(Button, 'WowButton-root');
