/**
 *
 * config provider
 * @module @wowjoy/core/config-provider/demo
 * @author lh
 *
 * */
import * as React from 'react';
import ConfigProvider from '../index';
import { Theme, ThemeConsumer } from '@wowjoy/styled';
import getPath from '../../utils/getPath';

const Demo: React.FC<any> = () => {
  
  return (
    <ConfigProvider>
      <ThemeConsumer>
        { (theme: Partial<Theme>) => {
          
          return (
            <span color={getPath(theme, 'palette.primary.main')}>theme context</span>
          )
          
        }}
      </ThemeConsumer>
    </ConfigProvider>
  )
  
};

export default Demo;
