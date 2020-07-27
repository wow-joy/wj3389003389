---
group:
  title: Feedback 用户反馈
title: Backdrop 背景板
---

# Button 按钮

```tsx
/**
 * title: 基本使用
 */

import React from 'react';
import { Button, Backdrop } from '@wowjoy/core';
import { useToggle } from '@wowjoy/hooks';

export default () => {
  const [inProps, toggle] = useToggle(false);
  return (
    <>
      <Button onClick={() => toggle(true)}>open</Button>
      <Backdrop
        TransitionProps={{ unmountOnExit: true, mountOnEnter: true }}
        in={inProps}
        onClick={() => toggle(false)}
        style={{ zIndex: 1000 }}
      />
    </>
  );
};
```

## Props(继承 ButtonBase)

| 参数             | 说明                   | 类型                                | 默认值    |
| :--------------- | :--------------------- | :---------------------------------- | :-------- |
| variant          | 按钮类型               | 'contained' \| 'outlined' \| 'text' | contained |
| size             | 按钮尺寸               | 'small' \| 'medium' \| 'large'      | medium    |
| sizeOpt          | 按钮尺寸配置           | SizeOpt                             |
| disabled         | 禁用                   | boolean                             | false     |
| disableElevation | 禁用阴影，按钮变得扁平 | boolean                             | false     |
| href             | 变成 a 标签，添加 href | string                              |           |
| startIcon        | 前置 icon              | ReactNode                           |           |
| endIcon          | 后置 icon              | ReactNode                           |           |
