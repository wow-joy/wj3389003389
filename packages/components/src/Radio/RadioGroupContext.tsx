import React from 'react';
import { Props } from './RadioGroup';

const RadioGroupContext = React.createContext<
  (Props & { registe: (value: any, preValue: any) => void }) | null
>(null);

export default RadioGroupContext;
