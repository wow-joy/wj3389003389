---
group:
  title: Utils 工具包
title: Portal 传送门
---

# Popper 弹出提示工具

```tsx
/**
 * title: 基本使用
 */

import React, { useRef } from 'react';
import { Portal, Button } from '@wowjoy/core';
import styled from '@wowjoy/styled';
import { useToggle } from '@wowjoy/hooks';

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

export default () => {
  const [show, toggle] = useToggle(false);
  const container = useRef();
  return (
    <div>
      <button type="button" onClick={toggle}>
        {show ? 'Unmount children' : 'Mount children'}
      </button>
      <div style={{ border: '1px solid #000', margin: '10px 0' }}>
        It looks like I will render here.
        {show ? (
          <Portal container={container.current}>
            <span>But I actually render here!</span>
          </Portal>
        ) : null}
      </div>
      <div style={{ border: '1px solid #000', height: 20 }} ref={container} />
    </div>
  );
};
```

## Popper Props

| 参数 | 说明 | 类型 | 默认值 |
| :-- | :-- | :-- | :-- |
| container | 挂载位置 | HTMLElement \| React.ReactInstance \| Function; | document.body |
| onRendered | 挂载之后的回调 | () => void |
| children | 内容 | React.ReactNode |  |
| disablePortal | 不使用 createPortal | boolean | false |
