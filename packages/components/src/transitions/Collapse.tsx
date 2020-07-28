import React from 'react';
import { TransitionProps } from 'react-transition-group/Transition';
import { Transition } from 'react-transition-group';
import { useWowTheme } from '@wowjoy/styled';
import { useForkRef } from '@wowjoy/hooks';

const originStyles = {
  center: 'center',
  left: 'left',
  right: 'right',
  top: 'top',
  bottom: 'bottom',
  topLeft: 'top left',
  topRight: 'top right',
  bottomLeft: 'bottom left',
  bottomRight: 'bottom right',
};
const attrStyles = {
  width: 'scaleX',
  height: 'scaleY',
  both: 'scale',
};

export interface CollapseProps extends Omit<TransitionProps, 'children'> {
  children?: React.ReactElement<any, any>;
  position?: { x: number; y: number };
  direction?:
    | 'center'
    | 'left'
    | 'right'
    | 'top'
    | 'bottom'
    | 'topLeft'
    | 'topRight'
    | 'bottomLeft'
    | 'bottomRight';
  attr?: 'width' | 'height' | 'both';
}

export const Collapse: React.ForwardRefExoticComponent<CollapseProps> = React.forwardRef(
  ({ children, timeout, attr = 'both', direction = 'center', ...props }, ref) => {
    const styles = {
      entering: { opacity: 0, transform: `${attrStyles[attr]}(0)` },
      entered: { opacity: 1, transform: `${attrStyles[attr]}(1)` },
      exiting: { opacity: 0, transform: `${attrStyles[attr]}(0)` },
      exited: { opacity: 0, transform: `${attrStyles[attr]}(0)` },
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
              transform: `${attrStyles[attr]}(0)`,
              transformOrigin: originStyles[direction],
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
