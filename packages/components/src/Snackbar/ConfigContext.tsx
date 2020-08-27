import { createContext } from 'react';
import { Props as AlertProps } from '../Alert';

export type SnackbarKey = number | string;
export type SnackbarMessage = string | React.ReactNode;

export interface ConfigProviderProps extends SharedProps {
  /**
   * Dense Mode
   * @description 紧凑模式
   * @default false
   */
  dense?: boolean;
  /**
   * 挂载位置，默认最近的SnackbarProvider
   * @description 挂载位置
   * @default 默认最近的SnackbarProvider
   */
  domRoot?: HTMLElement;
  /**
   * 消息容量
   * @description 消息显示的最大数量
   * @default 6
   */
  maxSnack?: number;
  /**
   * 消息容器的位置
   * @default vertical: top, horizontal: center
   */
  anchorOrigin?: {
    vertical: 'top' | 'center' | 'bottom';
    horizontal: 'left' | 'center' | 'right';
  };
}

export interface SharedProps extends Omit<AlertProps, 'onClose'> {
  /**
   * 显示时长
   * @default 3000ms
   */
  autoHideDuration?: number;
  /**
   * 阻止重复显示消息
   * @default false
   */
  preventDuplicate?: boolean;
  /**
   * Alert的action
   * @default undefined
   */
  action?:
    | React.ReactNode
    | ((key: SnackbarKey, message: SnackbarMessage, options: OptionsObject) => React.ReactNode);
  /**
   * Alert的onClose
   * @default undefined
   */
  onClose?: (
    key: SnackbarKey,
    message: SnackbarMessage,
    options: OptionsObject,
  ) => AlertProps['onClose'];
  /**
   * 自定义消息体
   * @default Alert
   */
  content?: React.ReactNode | ((key: SnackbarKey, message: SnackbarMessage) => React.ReactNode);
}

export interface OptionsObject extends SharedProps {
  /**
   * 消息条的唯一标识key
   * @default 当前时间戳
   */
  key?: SnackbarKey;
  /**
   * 除非手动关闭，否则消息条一直保留
   * @default false
   */
  persist?: boolean;
}
/**
 * 配置
 */
const ConfigContext = createContext<ConfigProviderProps>({});

export default ConfigContext;
