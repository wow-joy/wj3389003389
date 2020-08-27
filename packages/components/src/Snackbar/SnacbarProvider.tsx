import React, { useContext, useCallback, useImperativeHandle } from 'react';
import ConfigContext, {
  ConfigProviderProps,
  SnackbarMessage,
  OptionsObject,
} from './ConfigContext';
import Portal from '../Portal';
import SnackbarContext from './SnackbarContext';
import { useList } from '@wowjoy/hooks';
import SnackbarContainer from './SnackbarContainer';

export interface SnackbarProviderProps extends ConfigProviderProps {
  children: React.ReactNode | React.ReactNode[];
}

export interface Snack {
  message: SnackbarMessage;
  options?: OptionsObject;
  key: number | string;
}
/**
 * SnackbarProvider容器
 */
const SnackProvider = React.forwardRef<any, any>(({ children }, ref) => {
  const config = useContext(ConfigContext);
  const [snacks, { push, clear, filter, remove, set }] = useList<Snack>([]);
  /**
   * 往队列加入消息
   * @param message 消息内容
   * @param options 消息配置
   */
  const enqueueSnackbar = useCallback(
    (message: SnackbarMessage, options: OptionsObject = {}) => {
      let key = options?.key || Date.now();
      let snack = { message, options, key };
      if (snacks.length === config.maxSnack) {
        remove(0);
      }
      if (options.preventDuplicate || config.preventDuplicate) {
        if (snacks.findIndex(snack => snack.message === message) === -1) {
          push(snack);
        }
      } else {
        push(snack);
      }
      if (!options?.persist) {
        setTimeout(() => {
          set(prev => prev.filter(item => item !== snack));
        }, options.autoHideDuration || config.autoHideDuration);
      }
      return key;
    },
    [snacks],
  );
  /**
   * 从队列移除消息
   * @param key 消息key值
   */
  const closeSnackbar = useCallback(
    key => {
      if (key) {
        filter(item => item.key !== key);
      } else {
        clear();
      }
    },
    [snacks],
  );
  // 暴露给ref的方法
  useImperativeHandle(ref, () => ({
    enqueueSnackbar,
    closeSnackbar,
  }));
  return (
    <SnackbarContext.Provider
      value={{
        enqueueSnackbar,
        closeSnackbar,
      }}
    >
      {children}
      <Portal container={config.domRoot} disablePortal={!config.domRoot}>
        <SnackbarContainer snacks={snacks} />
      </Portal>
    </SnackbarContext.Provider>
  );
});
/**
 * SnackbarProvider(ConfigContext.Provider & SnackbarContext.Provider)
 */
const SnackbarProvider = React.forwardRef<any, SnackbarProviderProps>(
  ({ children, ...props }, ref) => {
    return (
      <ConfigContext.Provider
        value={{
          maxSnack: 6,
          autoHideDuration: 3000,
          severity: 'success',
          dense: false,
          variant: 'filled',
          size: 'large',
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'center',
          },
          preventDuplicate: false,
          ...props,
        }}
      >
        <SnackProvider ref={ref}>{children}</SnackProvider>
      </ConfigContext.Provider>
    );
  },
);

export default SnackbarProvider;
