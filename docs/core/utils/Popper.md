---
group:
  title: Utils 工具包
title: Popper 弹出提示工具
---

# Popper 弹出提示工具

```tsx
/**
 * title: 基本使用
 */

import React from 'react';
import { Popper, Button } from '@wowjoy/core';
import styled from '@wowjoy/styled';

const Wrap = styled.div`
  display: grid;
  grid-gap: 10px;
  grid-template-areas:
    'c1 top-start top top-end c2'
    'left-start c3 c3 c3 right-start'
    'left c4 c4 c4 right'
    'left-end c5 c5 c5 right-end'
    'c6 bottom-start bottom bottom-end c7';
`;

export default () => (
  <Wrap>
    {[
      'top-start',
      'top',
      'top-end',
      'left-start',
      'right-start',
      'left',
      'right',
      'left-end',
      'right-end',
      'bottom-start',
      'bottom',
      'bottom-end',
    ].map(placement => (
      <Popper
        placement={placement}
        content={<div style={{ padding: 3 }}>popper</div>}
        open
        showArrow={true}
      >
        <Button style={{ gridArea: placement }}>{placement}</Button>
      </Popper>
    ))}
  </Wrap>
);
```

## Popper Props

| 参数 | 说明 | 类型 | 默认值 |
| :-- | :-- | :-- | :-- |
| placement | 位置 | 'top-start' \| 'top' \| 'top-end' \| 'left-start' \| 'left' \| 'left-end' \| 'right-start' \| 'right' \| 'right-end' \| ''bottom-start' \| 'bottom' \| 'bottom-end' | medium |
| content | popper 内容 | React.ReactNode |
| showArrow | 显示箭头 | boolean | true |
| arrow | 自定义箭头 | React.ReactElement | false |
| arrowRef | 箭头的 ref | Ref |  |
| popperRef | Popper 的 ref | Ref |  |
| open | 显示状态 | boolean |  |
| TransitionComponent | 动画组件, 必须提供 in 类似于 react-transition-group | React.ComponentType | [Fade](/core/utils/transitions) |
| TransitionProps | 动画组件参数 | boolean |  |
| PortalProps | portal 参数 | [Portal](/core/utils/portal) |  |
