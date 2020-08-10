---
group:
  title: Data Display 数据展示
title: Tooltip 提示
---

# Tooltip 提示

```tsx
/**
 * title: 基本使用
 */

import React from 'react';
import { Button, Tooltip } from '@wowjoy/core';
import { useToggle } from '@wowjoy/hooks';

export default () => {
  const [inProp, toggle] = useToggle(false);
  return (
    <Tooltip open={inProp} title="Hi, I'm a tip!">
      <Button onClick={() => toggle()}>open</Button>
    </Tooltip>
  );
};
```

## Props(继承 [PopperProps](/core/utils/popper))

| 参数 | 说明 | 类型 | 默认值 |
| :-- | :-- | :-- | :-- |
| title | title 内容 | React.ReactNode |
| trigger | 触发方式，也可以自己控制 open | 'click' \| 'focus' \| 'hover' \| 'contextMenu' | hover |
