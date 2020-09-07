import React, { useState } from 'react';
import styled, { useWowTheme } from '@wowjoy/styled';
import { useForkRef } from '@wowjoy/hooks';
import { usePopper } from 'react-popper';
import { Placement } from '@popperjs/core';
import { Fade } from '../transitions';
import Portal, { Props as PortalProps } from '../Portal';

const PopperWrap = styled.div`
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
  /**
   * 弹出位置
   * @description 弹出位于元素的位置
   * @default top
   */
  placement?: Placement;
  /**
   * 弹出内容
   */
  content: React.ReactNode;
  /**
   * 箭头的ref
   */
  arrowRef?: React.MutableRefObject<HTMLElement>;
  /**
   * 整个弹出层的ref
   */
  popperRef?: React.MutableRefObject<HTMLElement>;
  style?: React.CSSProperties;
  /**
   * 显示箭头
   */
  showArrow?: boolean;
  /**
   * 自定义箭头
   */
  arrow?: React.ReactElement;
  open?: boolean;
  TransitionComponent?: React.ComponentType;
  TransitionProps?: any;
  PortalProps?: PortalProps;
  /**
   * 此部分参考popperjs
   */
  modifiers?: any[];
}

const Popper = React.forwardRef<any, Props>(
  (
    {
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
      open,
      modifiers = [],
      ...props
    },
    ref,
  ) => {
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
        ...modifiers,
      ],
      placement,
    });
    // @ts-ignore
    const handleRef = useForkRef(children.ref, setReferenceElement, ref);
    const handlePopperRef = useForkRef(popperRef, setPopperElement);
    const handleArrowRef = useForkRef(arrowRef, setArrowElement);
    return (
      <>
        {React.cloneElement(children as React.ReactElement, {
          ref: handleRef,
        })}
        <Portal {...PortalProps}>
          <TransitionComponent mountOnEnter unmountOnExit {...TransitionProps} in={open}>
            <PopperWrap
              ref={handlePopperRef}
              theme={theme}
              style={{ ...style, ...styles.popper }}
              className={className}
              {...attributes.popper}
              {...props}
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
            </PopperWrap>
          </TransitionComponent>
        </Portal>
      </>
    );
  },
);

export default Popper;
