import React, { useState } from 'react';
/**
 *
 * @param isControl
 * @param pValue controled value
 * @param defaultValue
 */
const useControlState = <T>(
  isControl: boolean,
  pValue: T,
  defaultValue: T,
): [T, React.Dispatch<React.SetStateAction<T>>] => {
  const [val, setVal] = useState<T>(defaultValue);
  const value = isControl ? pValue : val;
  const setValue: React.Dispatch<React.SetStateAction<T>> = value => {
    if (!isControl) {
      setVal(value);
    }
  };
  return [value, setValue];
};

export default useControlState;
