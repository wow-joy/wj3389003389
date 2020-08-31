import React from 'react';

export interface FormItemContextProps {
  updateChildNames: React.Dispatch<React.SetStateAction<string[]>>;
}

export const FormItemContext = React.createContext<FormItemContextProps>({
  updateChildNames: () => {},
});
