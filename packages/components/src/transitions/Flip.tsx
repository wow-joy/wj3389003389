import ReactDOM from 'react-dom';
import React, { useRef, useLayoutEffect } from 'react';
import { useForkRef } from '@wowjoy/hooks';

export interface Props {
  in: boolean;
  timeout?: number;
}

const Flip: React.FC<Props> = ({ in: inProp, children }) => {
  const nodeRef = useRef(null);
  const handleOwnRef = React.useCallback(instance => {
    nodeRef.current = ReactDOM.findDOMNode(instance);
  }, []);
  // @ts-ignore
  const handleRef = useForkRef(handleOwnRef, children.ref);

  useLayoutEffect(() => {
    if (inProp) {
      console.log(nodeRef.current);
    }
  }, [inProp]);

  return React.cloneElement(children as React.ReactElement, {
    ref: handleRef,
  });
};
