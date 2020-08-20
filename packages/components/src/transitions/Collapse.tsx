import React, { useRef, useLayoutEffect, useEffect, useReducer } from 'react';
import { TransitionProps } from 'react-transition-group/Transition';
import { Transition } from 'react-transition-group';
import { useWowTheme } from '@wowjoy/styled';
import { useForkRef } from '@wowjoy/hooks';

export interface CollapseProps extends Omit<TransitionProps, 'children'> {
  children?: React.ReactElement<any, any>;
  collapsedHeight?: string | number;
}

export const Collapse: React.ForwardRefExoticComponent<CollapseProps> = React.forwardRef(
  ({ children, timeout, collapsedHeight = 0, in: inProp, ...props }, ref) => {
    const theme = useWowTheme();
    const nodeRef = useRef<HTMLDivElement>();
    const childRef = useRef<HTMLElement>();
    const rectRef = useRef(null);
    const [_, forceUpdate] = useReducer(x => x + 1, 0);
    // @ts-ignore
    const handleNodeRef = useForkRef<HTMLElement>(nodeRef, ref);
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
        height: collapsedHeight,
      },
      entered: {
        height: rectRef.current ? rectRef.current.height : 'auto',
      },
      exiting: {
        height: collapsedHeight,
      },
      exited: {
        height: collapsedHeight,
      },
    };
    timeout = timeout === undefined ? defaultTimeout : timeout;

    return (
      <Transition
        nodeRef={nodeRef}
        appear
        timeout={timeout}
        in={inProp}
        onEnter={isAppearing => {
          if (!rectRef.current) {
            const rect = childRef.current.getBoundingClientRect();
            rectRef.current = rect;
            nodeRef.current.style.height = rect.height + 'px';
          }
        }}
        onEntered={isAppearing => {
          nodeRef.current.style.height = rectRef.current.height + 'px';
        }}
        {...props}
      >
        {(state, childProps) => (
          <div
            ref={nodeRef}
            style={{
              overflow: 'hidden',
              height: 0,
              transition: `all ${typeof timeout === 'object' ? timeout.appear : timeout}ms ${
                theme.transitions.easing.easeInOut
              }`,
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
