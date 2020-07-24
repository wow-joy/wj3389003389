import { useEventCallback } from '@wowjoy/hooks';
import styled, { withWowTheme } from '@wowjoy/styled';
import React, { useRef } from 'react';
import TouchRipple, { RefProps } from './TouchRipple';

const StyleButtonBase = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  border: 0;
  cursor: pointer;
  line-height: 1;
  transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  .WowButton-label {
    width: 100%;
  }
  &:focus {
    outline: 0;
  }
`;

export interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  enableTouchRipple?: boolean;
  center?: boolean;
  component?: keyof JSX.IntrinsicElements;
}
const ButtonBase: React.FC<Props> = (
  {
    children,
    component = 'button',
    enableTouchRipple = true,
    center = false,
    onMouseDown,
    onMouseUp,
    onMouseLeave,
    onTouchMove,
    onTouchStart,
    onTouchEnd,
    ...props
  },
  ref,
) => {
  const rippleRef = useRef<RefProps>();

  const useRippleHnadler = (rippleAction, eventCallback, skipRippleAction = !enableTouchRipple) => {
    return useEventCallback(event => {
      if (!skipRippleAction && rippleRef) {
        rippleRef.current[rippleAction](event);
      }
      eventCallback?.();
      return true;
    });
  };

  const handleMouseDown = useRippleHnadler('start', onMouseDown);
  const handleMouseUp = useRippleHnadler('stop', onMouseUp);
  const handleMouseLeave = useRippleHnadler('stop', onMouseLeave);
  const handleTouchStart = useRippleHnadler('start', onTouchStart);
  const handleTouchEnd = useRippleHnadler('stop', onTouchEnd);
  const handleTouchMove = useRippleHnadler('stop', onTouchMove);
  return (
    <StyleButtonBase
      {...props}
      ref={ref}
      as={component as any}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchMove={handleTouchMove}
    >
      {children}
      {enableTouchRipple ? <TouchRipple ref={rippleRef} center={center} /> : null}
    </StyleButtonBase>
  );
};

export default withWowTheme(ButtonBase, 'WowButtonBase-root');
