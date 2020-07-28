import React from 'react';
import setRef from '../utils/setRef';

export default function useForkRef<T>(
  refA: React.Ref<T>,
  refB: React.Ref<T>,
  ...refs: React.Ref<T>[]
): React.Ref<T> {
  return React.useMemo(() => {
    if (refA === null && refB === null) {
      return null;
    }
    return refValue => {
      setRef(refA, refValue);
      setRef(refB, refValue);
      refs?.forEach(ref => setRef(ref, refValue));
    };
  }, [refA, refB]);
}
