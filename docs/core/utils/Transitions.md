---
group:
  title: Utils 工具包
title: Transitions 动画
---

# Transitions 动画

## Fade 淡入淡出

```tsx
/**
 * title: 基本使用
 */

import React from 'react';
import { Fade, Button } from '@wowjoy/core';
import { useToggle } from '@wowjoy/hooks';

export default () => {
  const [open, toggle] = useToggle(true);
  return (
    <>
      <Button onClick={() => toggle()} style={{ marginBottom: 10 }}>
        toggle
      </Button>
      <Fade in={open}>
        <div style={{ height: 100, width: 100, background: 'red' }} />
      </Fade>
    </>
  );
};
```

## Collapse 折叠

<code src="./transitions/CollapseDemo.tsx" />

## Shift 移入移出

<code src="./transitions/ShiftDemo.tsx" />

## [BaseProps](https://reactcommunity.org/react-transition-group/transition)

## Collapse Props

| 参数 | 说明 | 类型 | 默认值 |
| :-- | :-- | :-- | :-- |
| direction | 方向 | 'center' \| 'left' \| 'right' \|'top' \|'bottom' \|'topLeft' \| 'topRight' \| 'bottomLeft' \| 'bottomRight' | center |
| attr | 属性 | 'width' \| 'height' \| 'both' | both |

## Shift Props

| 参数      | 说明     | 类型                                 | 默认值 |
| :-------- | :------- | :----------------------------------- | :----- |
| direction | 方向     | 'left' \| 'right' \|'top' \|'bottom' | center |
| movement  | 移动距离 | string                               | '10px' |
