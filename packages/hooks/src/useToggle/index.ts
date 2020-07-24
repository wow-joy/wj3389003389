import { useState } from 'react';

const useToggle = (
  defaultValue: boolean,
): [boolean, (value?: boolean | ((prevState: boolean) => boolean)) => void] => {
  const [value, setValue] = useState(defaultValue);
  const toggle = (v?: boolean | ((prevState: boolean) => boolean)) => {
    if (typeof v === 'boolean' || typeof v === 'function') {
      setValue(v);
    } else {
      setValue(!value);
    }
  };
  return [value, toggle];
};

export default useToggle;
