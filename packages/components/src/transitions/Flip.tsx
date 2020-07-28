import React, { useRef, useLayoutEffect } from 'react';
import { useForkRef } from '@wowjoy/hooks';

const Flip: React.FC = ({ children }) => {
  const ref = useRef();
  // @ts-ignore
  const handleRef = useForkRef(ref, children.ref);

  useLayoutEffect(() => {});

  return React.cloneElement(children as React.ReactElement, {
    ref: handleRef,
  });
};
