/**
 *
 * config provider context
 * @module @wowjoy/core/config-provider
 * @author lh
 * @since 0.0.4
 * @version 1.0.0
 *
 * */
import * as React from 'react';

export type RenderEmptyHandler = () => React.ReactNode;

export interface ConfigConsumerProps {
  getTargetContainer?: () => HTMLElement;
  getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement;
  rootPrefixCls?: string;
  getPrefixCls: (suffixCls?: string, customizePrefixCls?: string) => string;
  renderEmpty: RenderEmptyHandler;
}

function createConfigContext() {

  const ConfigContext = React.createContext<ConfigConsumerProps>({
    getPrefixCls(suffixCls, customizePrefixCls) {
      if(customizePrefixCls) return customizePrefixCls;

      return suffixCls ? `wowjoy-${suffixCls}` : 'wowjoy';

    },

    renderEmpty: () => 'renderEmpty',
  });

  ConfigContext.displayName = 'ConfigContext';

  const ConfigConsumer = ConfigContext.Consumer;

  return {
    ConfigContext,
    ConfigConsumer,
  }

}

export {
  createConfigContext,
}
