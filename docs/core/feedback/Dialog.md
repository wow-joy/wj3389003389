---
group:
  title: Feedback 用户反馈
title: Dialog 对话框
---

# Dialog 对话框

```tsx
/**
 * title: 基本使用
 */

import React from 'react';
import { Button, Dialog } from '@wowjoy/core';
import { useToggle } from '@wowjoy/hooks';

export default () => {
  const [open, toggle] = useToggle(false);
  return (
    <>
      <Button onClick={() => toggle(true)}>open</Button>
      <Dialog title="《锦瑟》" onClose={() => toggle(false)} open={open}>
        <div style={{ padding: 10, textAlign: 'center' }}>
          <h1>锦瑟</h1>
          <i>李商隐</i>
          <h3>锦瑟无端五十弦，一弦一柱思华年</h3>
          <h3>庄生晓梦迷蝴蝶，望帝春心托杜鹃</h3>
          <h3>沧海月明珠有泪，蓝田日暖玉生烟</h3>
          <h3>此情可待成追忆，只是当时已惘然</h3>
        </div>
      </Dialog>
    </>
  );
};
```

## Props(继承 [Modal](/core/utils/modal))

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
