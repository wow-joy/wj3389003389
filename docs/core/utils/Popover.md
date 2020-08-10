---
group:
  title: Utils 工具包
title: Popover 弹出框
---

# Popover 弹出框

```tsx
/**
 * title: 基本使用
 */

import React from 'react';
import { Button, Popover } from '@wowjoy/core';
import { useToggle } from '@wowjoy/hooks';

export default () => {
  const ref = React.useRef();
  const [inProp, toggle] = useToggle(false);

  return (
    <Popover ref={ref} open={inProp} content="Hi, I'm a tip!" onClose={() => toggle(false)}>
      <Button onClick={() => toggle()}>open</Button>
    </Popover>
  );
};
```

## TextField Props

| 参数        | 说明 | 类型   | 默认值 |
| :---------- | :--- | :----- | :----- |
| placeholder | 提示 | string |        |
