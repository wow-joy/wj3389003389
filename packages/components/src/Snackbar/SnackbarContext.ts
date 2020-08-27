import { createContext } from 'react';
import { SnackbarKey, SnackbarMessage, OptionsObject } from './ConfigContext';
export interface SnackbarContextProps {
  enqueueSnackbar?: (message: SnackbarMessage, options?: OptionsObject) => SnackbarKey;
  closeSnackbar?: (key?: SnackbarKey) => void;
}
/**
 * 保存消息移入移出的函数
 */
const SnackbarContext = createContext<SnackbarContextProps>({});

export default SnackbarContext;
