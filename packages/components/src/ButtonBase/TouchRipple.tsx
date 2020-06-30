// @ts-nocheck
import React, { useState, useImperativeHandle, useRef, useCallback } from 'react';
import Ripple, { Props } from './Ripple';
import styled from '../styled';
import { TransitionGroup } from 'react-transition-group';

const DURATION = 550;

const Wrap = styled.span`
  border-radius: inherit;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  pointer-events: none;
  overflow: hidden;
`;

export interface Props extends React.HTMLAttributes<HTMLSpanElement> {
  center?: boolean;
}

export interface RefProps {
  start: (e: React.MouseEvent<any>) => void;
  stop: (e: React.MouseEvent<any>) => void;
}

const TouchRipple: React.FC<any> = ({ center = false, ...props }, ref) => {
  const [ripples, setRipples] = useState<Props[]>([]);
  const container = useRef<HTMLSpanElement>();
  const refKey = useRef(0);
  const ingoringMouseDown = useRef<boolean>(false);

  const startCommit = useCallback(params => {
    const { rippleX, rippleY, rippleSize } = params;
    setRipples(oldRipples => [
      ...oldRipples,
      <Ripple
        key={refKey.current}
        timeout={DURATION}
        rippleSize={rippleSize}
        rippleX={rippleX}
        rippleY={rippleY}
      />,
    ]);
    refKey.current += 1;
  });

  // start wave
  const start = useCallback(
    (
      e: React.MouseEvent<HTMLButtonElement>,
      option: { fakeElement: boolean } = { fakeElement: false },
    ) => {
      // mobile only triggle touchstart, ignore mousedown
      if (e.type === 'mousedown' && ingoringMouseDown.current) {
        ingoringMouseDown.current = false;
        return;
      }
      if (e.type === 'touchstart') {
        ingoringMouseDown.current = true;
      }
      // fakeElement for test
      const rect = option.fakeElement
        ? {
            width: 0,
            height: 0,
            left: 0,
            top: 0,
          }
        : container.current.getBoundingClientRect();
      let rippleX, rippleY, rippleSize;
      if (!e.touches) {
        rippleX = Math.round(e.clientX - rect.left);
        rippleY = Math.round(e.clientY - rect.top);
      } else {
        rippleX = Math.round(e.touches[0].clientX - rect.left);
        rippleY = Math.round(e.touches[0].clientY - rect.top);
      }

      // circle center
      if (center || (e.clientX === 0 && e.clientY === 0) || (!e.clientX && !e.touches)) {
        rippleX = Math.round(rect.width / 2);
        rippleY = Math.round(rect.height / 2);
        rippleSize = Math.round(Math.sqrt(rect.width ** 2 + rect.height ** 2));
        // for some reason the animation broken on Mobile Chrome if size is even
        if (rippleSize % 2 === 0) {
          rippleSize += 1;
        }
      } else {
        rippleSize =
          Math.sqrt(
            Math.max(rippleX, rect.width - rippleX) ** 2 +
              2 +
              Math.max(rippleY, rect.height - rippleY) ** 2 +
              2,
          ) * 2;
      }
      if (!e.touches) {
        startCommit({ rippleSize, rippleX, rippleY });
      } else {
        setTimeout(() => {
          startCommit({ rippleSize, rippleX, rippleY });
        });
      }
    },
    [center],
  );

  const stop = useCallback(() => {
    // clearTimeout(startTimer.current)
    setRipples(oldRipples => {
      if (oldRipples.length > 0) {
        return oldRipples.slice(1);
      }
      return oldRipples;
    });
  }, []);
  useImperativeHandle<RefProps>(
    ref,
    () => ({
      start,
      stop,
    }),
    [start, stop],
  );

  return (
    <Wrap {...props} ref={container}>
      <TransitionGroup
        component={null}
        exit
        handleExited={function() {
          console.log('exite', arguments);
        }}
      >
        {ripples}
      </TransitionGroup>
    </Wrap>
  );
};

export default React.forwardRef(TouchRipple);
