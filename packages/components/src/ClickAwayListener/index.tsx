import ReactDOM from 'react-dom';
import React, { useRef, useEffect } from 'react';
import { useEventCallback, useForkRef } from '@wowjoy/hooks';
import ownerDocument from '../utils/ownerDocument';

export interface Props {
  children?: React.ReactElement;
  /**
   * ignore React Tree，just care Dom tree
   */
  disableReactTree?: boolean;
  mouseEvent?: 'onClick' | 'onMouseDown' | 'onMouseUp' | false;
  onClickAway?: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  touchEvent?: 'onTouchEnd' | 'onTouchStart' | false;
}

const ClickAwayListener: React.FC<Props> = ({
  children,
  disableReactTree = false,
  onClickAway,
  mouseEvent = 'onClick',
  touchEvent = 'onTouchEnd',
}) => {
  if (!React.Children.only(children)) {
    throw new Error('ClickAway support one child');
  }
  const nodeRef = useRef(null);
  const bubbleRef = useRef(false);
  const mountedRef = useRef(false);
  const movedRef = useRef(false);

  useEffect(() => {
    mountedRef.current = true;
    return () => (mountedRef.current = false);
  }, []);

  const handleOwnRef = React.useCallback(instance => {
    nodeRef.current = ReactDOM.findDOMNode(instance);
  }, []);
  // @ts-ignore
  const handleRef = useForkRef(children.ref, handleOwnRef);

  const handleClickAway = useEventCallback((e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    const insideReactTree = bubbleRef.current;
    bubbleRef.current = false;
    if (!mountedRef.current || !nodeRef.current) {
      return;
    }
    if (movedRef.current) {
      movedRef.current = false;
      return;
    }
    let insideDOM; // is inside click or outside
    // @ts-ignore
    if (e.composedPath) {
      // @ts-ignore
      insideDOM = e.composedPath().indexOf(nodeRef.current) > -1;
    } else {
      const doc = ownerDocument(nodeRef.current);
      insideDOM =
        !doc.documentElement.contains(e.target as Node) || nodeRef.current.contains(e.target);
    }
    if (!insideDOM && (disableReactTree || !insideReactTree)) {
      onClickAway?.(e);
    }
  });

  useEffect(() => {
    if (touchEvent) {
      const doc = ownerDocument(nodeRef.current);
      const eventName = touchEvent.substr(2).toLowerCase();
      const handleTouchMove = () => {
        movedRef.current = true;
      };
      doc.addEventListener(eventName as any, handleClickAway);
      doc.addEventListener('touchmove', handleTouchMove);

      return () => {
        doc.removeEventListener(eventName as any, handleClickAway);
        doc.removeEventListener('touchmove', handleTouchMove);
      };
    }
  }, [handleClickAway, touchEvent]);
  useEffect(() => {
    if (mouseEvent) {
      const doc = ownerDocument(nodeRef.current);
      const eventName = mouseEvent.substr(2).toLowerCase();
      doc.addEventListener(eventName as any, handleClickAway);
      return () => {
        doc.removeEventListener(eventName as any, handleClickAway);
      };
    }
  }, [handleClickAway, mouseEvent]);

  const handleBubble = eventName => e => {
    bubbleRef.current = true;
    children.props[eventName]?.(e);
  };

  let childrenProps = {
    ref: handleRef,
  };
  if (touchEvent) {
    childrenProps[touchEvent] = handleBubble(touchEvent);
  }
  if (mouseEvent) {
    childrenProps[mouseEvent] = handleBubble(mouseEvent);
  }

  return <>{React.cloneElement(children as React.ReactElement, childrenProps)}</>;
};

export default ClickAwayListener;
