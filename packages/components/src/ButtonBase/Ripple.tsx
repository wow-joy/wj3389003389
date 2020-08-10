import { useEventCallback } from '@wowjoy/hooks';
import styled, { css, DefaultTheme, keyframes, useWowTheme } from '@wowjoy/styled';
import React, { useEffect, useLayoutEffect } from 'react';
import clsx from 'clsx';

const useEnhancedEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

const enter = keyframes`
  0% {
    transform: scale(0);
    opacity: 0.1;
  }

  100% {
    transform: scale(1);
    opacity: 0.3;
  }
`;
const exit = keyframes`
   0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

const RippleWrap = styled.div<{
  timeout: number;
}>`
  position: absolute;
  opacity: 0.3;
  transform: scale(1);
  animation: ${enter} ${p => p.timeout}ms ${p => p.theme.transitions.easing.easeInOut};
`;

const childInvisible = (timeout: number) => css`
  opacity: 0;
  animation: ${exit} ${timeout}ms ${p => p.theme.transitions.easing.easeInOut};
`;
const RippleChild = styled.span<{
  leaving: boolean;
  timeout: number;
}>`
  display: block;
  opacity: 1;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: currentColor;
  ${p => p.leaving && childInvisible(p.timeout)}
`;

export interface Props extends React.HTMLAttributes<HTMLSpanElement> {
  rippleSize: number;
  rippleX: number;
  rippleY: number;
  pulsate?: boolean;
  timeout: number;
  onExited: () => void;
  in?: boolean;
  theme?: DefaultTheme;
}

export const Ripple = React.forwardRef<HTMLDivElement, Props>(
  (
    { rippleSize, rippleX, rippleY, in: inProp = false, onExited = () => {}, timeout, ...props },
    ref,
  ) => {
    const [leaving, setLeaving] = React.useState(false);
    const theme = useWowTheme();
    const rippleStyles = {
      width: rippleSize,
      height: rippleSize,
      top: rippleY - rippleSize / 2,
      left: rippleX - rippleSize / 2,
    };

    const handleExited = useEventCallback(onExited);

    useEnhancedEffect(() => {
      if (!inProp) {
        setLeaving(true);
        const timeoutId = setTimeout(handleExited, timeout);
        return () => {
          clearTimeout(timeoutId);
        };
      }
      return undefined;
    }, [inProp, handleExited]);

    return (
      <RippleWrap
        ref={ref}
        style={rippleStyles}
        timeout={timeout}
        theme={theme}
        {...props}
        className={clsx('WowRipple-root', props.className)}
      >
        <RippleChild leaving={leaving} timeout={timeout} theme={theme} />
      </RippleWrap>
    );
  },
);
export default Ripple;
