import React, { useState, useEffect } from 'react';
import ReactDOM, { createPortal } from 'react-dom';
import setRef from '../utils/setRef';
import useForkRef from '../utils/useForkRef';

function getContainer(container: Props['container']) {
  container = typeof container === 'function' ? container() : container;
  return ReactDOM.findDOMNode(container as React.ReactInstance);
}

export interface Props {
  container?: HTMLElement | React.ReactInstance | Function;
  onRendered?: () => void;
  children?: React.ReactNode;
  disablePortal?: boolean;
}

const Portal: React.ForwardRefRenderFunction<any, Props> = (
  { container, onRendered, children, disablePortal = false },
  ref,
) => {
  const [mountNode, setMountNode] = useState(null);
  const handleRef = useForkRef(React.isValidElement(children) ? (children as any).ref : null, ref);
  useEffect(() => {
    if (!disablePortal) {
      setMountNode(getContainer(container) || document.body);
    }
  }, [container]);

  useEffect(() => {
    if (mountNode && !disablePortal) {
      setRef(ref, mountNode);
    }
  }, [ref, mountNode]);

  useEffect(() => {
    if (mountNode) {
      onRendered?.();
    }
  }, [onRendered, mountNode]);

  if (disablePortal) {
    if (React.isValidElement(children)) {
      return React.cloneElement(children, { ref: handleRef });
    }
    return children;
  }

  return mountNode ? createPortal(children, mountNode) : mountNode;
};

export default React.forwardRef(Portal);
