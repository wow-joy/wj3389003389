import React from 'react';
import setRef from './setRef';

export default function useForkRef<T>(refA: React.Ref<T>, refB: React.Ref<T>): React.Ref<T> {
  return React.useMemo(() => {
    if (refA === null && refB === null) {
      return null;
    }
    return refValue => {
      setRef(refA, refValue);
      setRef(refB, refValue);
    };
  }, [refA, refB]);
}
