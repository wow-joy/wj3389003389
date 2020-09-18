---
group:
  title: Utils 工具包
title: ConfigProvider
---

## 主题上下文

```tsx
/**
* title: 主题上下文
* desc: 通过ConfigProvider获取默认的主题
*/
import * as React from 'react';
import { ConfigProvider } from '@wowjoy/core';
import { Theme, ThemeConsumer } from '@wowjoy/styled';

export default () => {
  
  return (
    <ConfigProvider>
      <ThemeConsumer>
        { (theme: Partial<Theme>) => {
          
          const color = theme.palette.primary.main;
          
          return (
            <span style={{ color: color }}>theme context</span>
          )
          
        }}
      </ThemeConsumer>
    </ConfigProvider>
  )
  
};

```

## 自定义全局渲染empty组件

```tsx
/**
* title: 自定义全局渲染empty组件
* desc: 通过ConfigProvider设置全局empty组件
*/
import * as React from 'react';
import { ConfigProvider } from '@wowjoy/core';
import { Theme, ThemeConsumer } from '@wowjoy/styled';

const Empty: React.FC<any> = () => {
  
  return (
    <div>empty</div>
  )
  
}

export default () => {
  
  return (
    <ConfigProvider renderEmpty={() => <Empty />}>
      <ConfigProvider.ConfigConsumer>
        { ({ renderEmpty }: ConfigConsumerProps) => {

          return renderEmpty();
          
        }}
      </ConfigProvider.ConfigConsumer>
    </ConfigProvider>
  )
  
};

```

## API

### 静态属性
### ConfigConsumer
`ConfigContext`的`consumer`

### 属性
| 参数 | 说明 | 类型 | 默认值 |
| :--- | :--- | :--- | :---   |
| prefixCls | 全局组件类名前缀, ex: `ant-modal`, `ant`就是前缀 | string | wowjoy
| renderEmpty | 组件为空时的样式 | ReactNode | |
| getTargetContainer | 全局目标容器获取方法 | (trigger: HTMLElement) => HTMLElement | trigger
