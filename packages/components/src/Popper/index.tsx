import React, { useState, ReactElement } from 'react';
import styled, { useWowTheme } from '@wowjoy/styled';
import { usePopper } from 'react-popper';
import { Placement } from '@popperjs/core';
import useForkRef from '../utils/useForkRef';
import { Fade } from '../transitions';
import Portal, { Props as PortalProps } from '../Portal';
import { useControlState } from '@wowjoy/hooks';

const TooltipWrap = styled.div`
  background-color: #fff;
  border-radius: ${p => p.theme.shape.borderRadius}px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  &[data-popper-placement^='top'] > [data-popper-arrow] {
    bottom: -11px;
    &::before {
      box-shadow: 3px 3px 7px rgba(0, 0, 0, 0.07);
      left: 2px;
      top: -4px;
    }
  }
  &[data-popper-placement^='bottom'] > [data-popper-arrow] {
    top: -11px;
    &::before {
      left: 3px;
      top: 8px;
      box-shadow: -3px -3px 7px rgba(0, 0, 0, 0.07);
    }
  }
  &[data-popper-placement^='left'] > [data-popper-arrow] {
    right: -11px;
    &::before {
      top: 3px;
      left: -4px;
      box-shadow: 3px -3px 7px rgba(0, 0, 0, 0.07);
    }
  }
  &[data-popper-placement^='right'] > [data-popper-arrow] {
    left: -11px;
    &::before {
      left: 8px;
      top: 2px;
      box-shadow: -3px 3px 7px rgba(0, 0, 0, 0.07);
    }
  }
`;
const Arrow = styled.div`
  position: absolute;
  width: 11px;
  height: 11px;
  z-index: -1;
  overflow: hidden;
  &::before {
    content: '';
    position: absolute;
    width: 7px;
    height: 7px;
    z-index: -1;
    transform: rotate(45deg);
    background: #fff;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
  }
`;

export interface Props {
  children?: React.ReactElement;
  className?: string;
  placement?: Placement;
  content: React.ReactNode;
  arrowRef?: React.MutableRefObject<HTMLElement>;
  popperRef?: React.MutableRefObject<HTMLElement>;
  style?: React.CSSProperties;
  showArrow?: boolean;
  arrow?: React.ReactElement;
  open?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  TransitionComponent?: React.ComponentType;
  TransitionProps?: any;
  PortalProps?: PortalProps;
}

const Popper: React.FC<Props> = ({
  children,
  content,
  placement = 'top',
  arrowRef,
  popperRef,
  style,
  className,
  showArrow = true,
  arrow = <Arrow />,
  TransitionComponent = Fade,
  TransitionProps = {},
  PortalProps,
  ...props
}) => {
  const [open, setOpen] = useControlState('open' in props, props.open, false);
  const theme = useWowTheme();
  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);
  const [arrowElement, setArrowElement] = useState(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    modifiers: [
      { name: 'arrow', options: { element: arrowElement } },
      {
        name: 'offset',
        options: {
          offset: [0, 8],
        },
      },
    ],
    placement,
  });
  // @ts-ignore
  const handleRef = useForkRef(children.ref, setReferenceElement);
  const handlePopperRef = useForkRef(popperRef, setPopperElement);
  const handleArrowRef = useForkRef(arrowRef, setArrowElement);
  return (
    <>
      {React.cloneElement(children as React.ReactElement, {
        ref: handleRef,
      })}
      <Portal {...PortalProps}>
        <TransitionComponent {...TransitionProps} in={open}>
          <TooltipWrap
            ref={handlePopperRef}
            theme={theme}
            style={{ ...style, ...styles.popper }}
            className={className}
            {...attributes.popper}
          >
            {showArrow &&
              React.cloneElement(arrow, {
                ref: handleArrowRef,
                'data-popper-arrow': true,
                style: { ...arrow.props.style, ...styles.arrow },
                theme: theme,
                ...attributes.arrow,
              })}
            {content}
          </TooltipWrap>
        </TransitionComponent>
      </Portal>
    </>
  );
};

export default Popper;
