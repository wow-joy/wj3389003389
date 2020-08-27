import React, { useRef, useLayoutEffect, useEffect, useReducer } from 'react';
import { TransitionProps } from 'react-transition-group/Transition';
import { Transition } from 'react-transition-group';
import { useWowTheme } from '@wowjoy/styled';
import { useForkRef } from '@wowjoy/hooks';
import { CollapseProps } from './Collapse';
import { SlideProps } from './Slide';

const directionStyles = {
  left: ['translateX', '-'],
  right: ['translateX', ''],
  top: ['translateY', '-'],
  bottom: ['translateY', ''],
};

const DISAPPER_TIME = 200; // height变为0的时间

export interface CollapseSlideProps extends SlideProps {}

export const CollapseSlide: React.ForwardRefExoticComponent<CollapseSlideProps> = React.forwardRef(
  (
    {
      children,
      timeout,
      collapsedHeight = 0,
      in: inProp,
      direction = 'top',
      movement = '10px',
      className,
      style,
      // onExited,
      ...props
    },
    ref,
  ) => {
    const theme = useWowTheme();
    const nodeRef = useRef<HTMLDivElement>();
    const childRef = useRef<HTMLElement>();
    const rectRef = useRef(null);
    // @ts-ignore
    const handleNodeRef = useForkRef<HTMLDivElement>(nodeRef, ref);
    // @ts-ignore
    const handleRef = useForkRef(childRef, children.ref);
    const defaultTimeout = {
      appear: theme.transitions.duration.enteringScreen,
      enter: theme.transitions.duration.enteringScreen,
      exit: theme.transitions.duration.leavingScreen,
    };

    useEffect(() => {
      // console.log(inProp, domRef.current);
    }, [children, inProp]);

    const styles = {
      entering: {
        height: 0,
        opacity: 0,
        transform: `${directionStyles[direction][0]}(${directionStyles[direction][1]}${movement})`,
      },
      entered: {
        height: 'auto',
        opacity: 1,
        transform: `translate(0,0)`,
      },
      exiting: {
        opacity: 0,
        transform: `${directionStyles[direction][0]}(${directionStyles[direction][1]}${movement})`,
        visibility: 'hidden',
      },
      exited: {
        height: 0,
        opacity: 0,
        transform: `${directionStyles[direction][0]}(${directionStyles[direction][1]}${movement})`,
      },
    };
    timeout = timeout === undefined ? defaultTimeout : timeout;
    return (
      <Transition
        nodeRef={nodeRef}
        appear
        timeout={{
          appear: typeof timeout === 'number' ? timeout : timeout.appear,
          enter: typeof timeout === 'number' ? 0 : timeout.enter || 0,
          exit:
            typeof timeout === 'number'
              ? timeout + DISAPPER_TIME
              : (timeout.exit || 0) + timeout.appear + DISAPPER_TIME,
        }}
        in={inProp}
        onEnter={isAppearing => {
          if (!rectRef.current) {
            const rect = childRef.current.getBoundingClientRect();
            rectRef.current = rect;
          }
        }}
        onEntered={isAppearing => {
          // nodeRef.current.style.height = rectRef.current.height + 'px';
        }}
        onExiting={() => {
          nodeRef.current.style.height = rectRef.current.height + 'px';
        }}
        addEndListener={done => {
          nodeRef.current.addEventListener('transitionend', e => {
            if (!nodeRef.current) {
              done();
            }
            if (
              nodeRef.current.style.visibility === 'hidden' &&
              nodeRef.current.style.height !== '0'
            ) {
              nodeRef.current.style.height = '0';
              nodeRef.current.style.transition = `height ${DISAPPER_TIME}ms ${theme.transitions.easing.easeIn}`;
            }
          });
        }}
        {...props}
      >
        {(state, childProps) => (
          <div
            ref={handleNodeRef}
            className={className}
            style={{
              overflow: 'hidden',
              height: 0,
              transition: `all ${typeof timeout === 'object' ? timeout.appear : timeout}ms ${
                theme.transitions.easing.easeInOut
              }`,
              opacity: 0,
              transform: `translate(0, 0)`,
              ...style,
              ...styles[state],
            }}
          >
            {React.cloneElement(children, {
              ref: handleRef,
              ...childProps,
            })}
          </div>
        )}
      </Transition>
    );
  },
);
