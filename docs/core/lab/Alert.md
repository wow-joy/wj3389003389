---
group:
  title: Lab 实验室
title: Alert 警告提示
---

# Alert 警告提示

## 简单的警告提示

```tsx
/**
 * title: 基本使用
 * desc: 五种不同的警告
 */

import React from 'react';
import { Alert, AlertTitle } from '@wowjoy/core';
const Space = () => <div style={{ marginTop: 5 }}></div>;

export default () => {
  return (
    <>
      <Alert severity="error">This is a error alert — check it out!</Alert>
      <Space />
      <Alert severity="success">This is a success alert — check it out!</Alert>
      <Space />
      <Alert severity="question">This is a question alert — check it out!</Alert>
      <Space />
      <Alert severity="info">This is a info alert — check it out!</Alert>
      <Space />
      <Alert severity="warning">This is a success alert — check it out!</Alert>
    </>
  );
};
```

## 描述

```tsx
/**
 * title: 基本使用
 * desc: 使用`AlertTitle`添加一个标题
 */

import React from 'react';
import { Alert, AlertTitle } from '@wowjoy/core';
const Space = () => <div style={{ marginTop: 5 }}></div>;

export default () => {
  return (
    <>
      <Alert severity="error">
        <AlertTitle>Error</AlertTitle>This is a error alert — check it out!
      </Alert>
      <Space />
      <Alert severity="success">
        <AlertTitle>Success</AlertTitle>This is a success alert — check it out!
      </Alert>
      <Space />
      <Alert severity="question">
        <AlertTitle>Question</AlertTitle>This is a question alert — check it out!
      </Alert>
      <Space />
      <Alert severity="info">
        <AlertTitle>Info</AlertTitle>This is a info alert — check it out!
      </Alert>
      <Space />
      <Alert severity="warning">
        <AlertTitle>Warning</AlertTitle>This is a success alert — check it out!
      </Alert>
    </>
  );
};
```

## 大小

```tsx
/**
 * title: 基本使用
 * desc: small middle large
 */

import React from 'react';
import { Alert, AlertTitle } from '@wowjoy/core';
const Space = () => <div style={{ marginTop: 5 }}></div>;

export default () => {
  return (
    <>
      <Alert size="small">This is a success alert — check it out!</Alert>
      <Space />
      <Alert size="middle">This is a success alert — check it out!</Alert>
      <Space />
      <Alert size="large">This is a success alert — check it out!</Alert>
    </>
  );
};
```

## 行为

```tsx
/**
 * title: 基本使用
 * desc: 使用动画结合`onClose`或者`action`实现关闭
 */

import React from 'react';
import { Alert, AlertTitle, Button, Collapse } from '@wowjoy/core';
const Space = () => <div style={{ marginTop: 5 }}></div>;

export default () => {
  const [open, setOpen] = React.useState(true);
  const [open1, setOpen1] = React.useState(true);
  return (
    <>
      <Collapse in={open} mountOnEnter>
        <Alert onClose={() => setOpen(false)}>Closeable</Alert>
      </Collapse>
      <Space />
      <Collapse in={open1} mountOnEnter>
        <Alert
          action={
            <Button variant="text" onClick={() => setOpen1(false)}>
              UNDO
            </Button>
          }
        >
          <AlertTitle>title</AlertTitle>Closeable
        </Alert>
      </Collapse>
    </>
  );
};
```

## 图标

```tsx
/**
 * title: icon
 * desc: 使用`icon`自定义图标,设置为`false`不显示图标，通过`IconMapping`可以映射`severity`的图标
 */

import React from 'react';
import { Alert, AlertTitle, Button, Collapse } from '@wowjoy/core';
import { HuatuoLogo } from '@wowjoy/icons';
const Space = () => <div style={{ marginTop: 5 }}></div>;

export default () => {
  return (
    <>
      <Alert icon={<HuatuoLogo />}>华卓科技</Alert>
      <Space />
      <Alert icon={false}>下雨了，收衣服了！</Alert>
    </>
  );
};
```

## 类型

```tsx
/**
 * title: 类型(变体)
 * desc: 三种类型， `filled` `outlined` `standard(default)`
 */

import React from 'react';
import { Alert } from '@wowjoy/core';
import { CheckCircle } from '@wowjoy/icons';
const Space = () => <div style={{ marginTop: 5 }}></div>;

export default () => {
  return (
    <>
      <Alert variant="standard">Standard</Alert>
      <Space />
      <Alert variant="outlined">Outlined</Alert>
      <Space />
      <Alert icon={<CheckCircle />} variant="filled">
        Filled
      </Alert>
    </>
  );
};
```

## 颜色

```tsx
/**
 * title: Color
 * desc: 你可以使用color覆盖不同程度提醒的颜色
 */

import React from 'react';
import { Alert } from '@wowjoy/core';

export default () => {
  return (
    <Alert severity="success" color="error">
      Closeable
    </Alert>
  );
};
```

## Props(继承 [PopperProps](/core/utils/popper))

| 参数 | 说明 | 类型 | 默认值 |
| :-- | :-- | :-- | :-- |
| clo | title 内容 | React.ReactNode |
| trigger | 触发方式，也可以自己控制 open | 'click' \| 'focus' \| 'hover' \| 'contextMenu' | hover |
