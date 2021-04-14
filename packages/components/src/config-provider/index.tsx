/**
 *
 * config provider
 * @module @wowjoy/core/config-provider
 * @author lh
 * @since 0.0.5
 * @version 1.0.0
 *
 * */
import * as React from 'react';
import { createConfigContext, ConfigConsumerProps, RenderEmptyHandler } from './context';
import { ThemeContext, createTheme } from '@wowjoy/styled';

export interface ConfigProviderProps {
  getTargetContainer?: () => HTMLElement;
  getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement;
  prefixCls?: string;
  children?: React.ReactNode;
  renderEmpty?: RenderEmptyHandler;
  autoInsertSpaceInButton?: boolean;
}

const context = createConfigContext();

const { ConfigContext, ConfigConsumer } = context;

// @ts-ignore
const ConfigProvider: React.FC<ConfigProviderProps> & {
  _ConfigContext: typeof context.ConfigContext,
  ConfigConsumer: typeof context.ConfigConsumer
} = function (props) {

  const { prefixCls } = props;

  const getPrefixClsWrapper = function getPrefixClsWrapper(context: ConfigConsumerProps) {

    return (suffixCls: string, customizePrefixCls?: string) => {
      const { prefixCls } = props;

      if (customizePrefixCls) return customizePrefixCls;

      const mergedPrefixCls = prefixCls || context.getPrefixCls('');

      return suffixCls ? `${mergedPrefixCls}-${suffixCls}` : mergedPrefixCls;
    };

  };


  const renderProvider = (context: ConfigConsumerProps) => {

    const {
      children,
      ...others
    } = props;

    const config: ConfigConsumerProps = {
      ...context,
      getPrefixCls: getPrefixClsWrapper(context),
      ...others,
    };

    const theme = createTheme();

    return (
      <ThemeContext.Provider value={theme}>
        <ConfigContext.Provider value={config}>
          { children }
        </ConfigContext.Provider>
      </ThemeContext.Provider>
    )

  }

  return (
    <ConfigConsumer>
      {renderProvider}
    </ConfigConsumer>
  )
};

ConfigProvider.displayName = 'ConfigProvider';

ConfigProvider._ConfigContext = ConfigContext;


ConfigProvider.ConfigConsumer = ConfigConsumer;

export default ConfigProvider;
