import React from 'react';
import { Props } from './CheckboxGroup';

const CheckboxGroupContext = React.createContext<Props | null>(null);

export default CheckboxGroupContext;
