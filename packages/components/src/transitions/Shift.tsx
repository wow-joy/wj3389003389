import React from 'react';
import { TransitionProps } from 'react-transition-group/Transition';
import { Transition } from 'react-transition-group';
import { useWowTheme } from '@wowjoy/styled';
import { useForkRef } from '@wowjoy/hooks';

const directionStyles = {
  left: ['translateX', '-'],
  right: ['translateX', ''],
  top: ['translateY', '-'],
  bottom: ['translateY', ''],
};

export interface ShiftProps extends Omit<TransitionProps, 'children'> {
  children?: React.ReactElement<any, any>;
  direction?: 'left' | 'right' | 'top' | 'bottom';
  movement?: string;
}

export const Shift: React.ForwardRefExoticComponent<ShiftProps> = React.forwardRef<any, ShiftProps>(
  ({ children, timeout, direction = 'top', movement = '10px', ...props }, ref) => {
    const styles = {
      entering: {
        opacity: 0,
        transform: `${directionStyles[direction][0]}(${directionStyles[direction][1]}${movement})`,
        visibility: 'hidden',
      },
      entered: { opacity: 1, transform: `translate(0,0)` },
      exiting: {
        opacity: 0,
        transform: `${directionStyles[direction][0]}(${directionStyles[direction][1]}${movement})`,
      },
      exited: {
        opacity: 0,
        transform: `${directionStyles[direction][0]}(${directionStyles[direction][1]}${movement})`,
        visibility: 'hidden',
      },
    };
    const theme = useWowTheme();
    // @ts-ignore
    const handleRef = useForkRef(ref, children.ref);
    const defaultTimeout = {
      appear: theme.transitions.duration.enteringScreen,
      enter: theme.transitions.duration.enteringScreen,
      exit: theme.transitions.duration.leavingScreen,
    };
    timeout = timeout === undefined ? defaultTimeout : timeout;
    return (
      <Transition appear timeout={timeout} {...props}>
        {(state, childProps) =>
          React.cloneElement(children, {
            style: {
              opacity: 0,
              transition: `all ${typeof timeout === 'object' ? timeout.appear : timeout}ms ${
                theme.transitions.easing.easeInOut
              }`,
              transform: `translate(0, 0)`,
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
