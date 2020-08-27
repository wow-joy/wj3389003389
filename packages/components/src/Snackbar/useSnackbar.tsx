import SnackContext, { SnackbarContextProps } from './SnackbarContext';
import { useContext } from 'react';

const useSnackbar = (): SnackbarContextProps => useContext(SnackContext);
export default useSnackbar;
