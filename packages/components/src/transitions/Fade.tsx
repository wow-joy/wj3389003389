import React from 'react';
import { TransitionProps } from 'react-transition-group/Transition';
import { Transition } from 'react-transition-group';
import { useWowTheme } from '@wowjoy/styled';
import { useForkRef } from '@wowjoy/hooks';

const styles = {
  entering: { opacity: 0 },
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
  exited: { opacity: 0 },
};

export interface FadeProps extends Omit<TransitionProps, 'children'> {
  children?: React.ReactElement<any, any>;
}

export const Fade: React.ForwardRefExoticComponent<FadeProps> = React.forwardRef(
  ({ children, timeout, ...props }, ref) => {
    const theme = useWowTheme();
    // @ts-ignore
    const handleRef = useForkRef(ref, children.ref);
    const defaultTimeout = {
      appear: theme.transitions.duration.standard,
      enter: theme.transitions.duration.enteringScreen,
      exit: theme.transitions.duration.leavingScreen,
    };
    timeout = timeout === undefined ? defaultTimeout : timeout;
    return (
      <Transition appear timeout={timeout} {...props}>
        {(state, childProps) =>
          React.cloneElement(children, {
            style: {
              transition: `opacity ${typeof timeout === 'object' ? timeout.appear : timeout}ms ${
                theme.transitions.easing.easeInOut
              }`,
              opacity: 0,
              ...styles[state],
              ...children.props.style,
            },
            ref: handleRef,
            ...childProps,
          })
        }
      </Transition>
    );
  },
);
