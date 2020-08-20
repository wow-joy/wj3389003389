import { createContext } from 'react';
import { Slide } from '../transitions/Slide';

export interface SnackContext {
  duration: number;
  max: number;
  TransitionComponent: React.FC;
  TransitionProps: any;
}

const snackContext = createContext<SnackContext>({
  duration: 3000,
  max: 5,
  TransitionComponent: Slide,
  TransitionProps: {},
});

snackContext.displayName = 'SnackContext';

export default snackContext;
