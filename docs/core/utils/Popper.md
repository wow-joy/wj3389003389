---
group:
  title: Utils 工具包
title: Popper 弹出提示工具
---

# Popper 弹出提示工具

```tsx
/**
 * title: 简单的弹出
 */

import React from 'react';
import { Button, Popper } from '@wowjoy/core';
import { useToggle } from '@wowjoy/hooks';

export default () => {
  const [inProp, toggle] = useToggle(false);
  return (
    <Popper open={inProp} content="Hi, I'm a tip!">
      <Button onClick={() => toggle()}>open</Button>
    </Popper>
  );
};
```

## 位置 placement

```tsx
/**
 * title: 设置弹出位置
 * desc: top-start  top top-end left-start right-start left right left-end right-end bottom-start bottom bottom-end
 */

import React from 'react';
import { Popper, Button } from '@wowjoy/core';
import styled from '@wowjoy/styled';
import { useToggle } from '@wowjoy/hooks';

const Container = styled.div`
  background: #f5f5f5;
  padding: 50px 0;
`;
const Wrap = styled.div`
  margin: 0 auto;
  width: 600px;
  display: grid;
  grid-gap: 10px;
  grid-template-areas:
    'c1 top-start top-start top top-end top-end c2'
    'left-start left-start c3 c3 c3 right-start right-start'
    'left left c4 c4 c4 right right'
    'left-end left-end c5 c5 c5 right-end right-end'
    'c6 bottom-start bottom-start bottom bottom-end bottom-end c7';
`;
const PopperBtn = ({ children, style, ...props }) => {
  const [inProp, toggle] = useToggle(false);
  return (
    <Popper open={inProp} content={<div style={{ padding: 10 }}>Hi, I'm a tip!</div>} {...props}>
      <Button variant="text" style={style} onClick={() => toggle()}>
        {children}
      </Button>
    </Popper>
  );
};
export default () => (
  <Container>
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
        <PopperBtn placement={placement} style={{ gridArea: placement }}>
          {placement.toUpperCase()}
        </PopperBtn>
      ))}
    </Wrap>
  </Container>
);
```

## 滚动测试

```tsx
/**
 * title: 滚动会进行自动适应
 * transform: true
 */

import React from 'react';
import { Button, Popper } from '@wowjoy/core';
import { useToggle } from '@wowjoy/hooks';
import styled from '@wowjoy/styled';

const Wrap = styled.div`
  height: 300px;
  background: #f5f5f5;
  overflow: auto;
  .inner {
    height: 1000px;
    position: relative;

    .WowButton-root {
      display: block;
      margin: 100px auto;
    }
  }
`;

export default () => {
  const [inProp, toggle] = useToggle(false);
  const ref = React.useRef();
  return (
    <Wrap>
      <div className="inner" ref={ref}>
        <Popper
          open={inProp}
          content={<div style={{ padding: 10 }}>Hi, I'm a tip!</div>}
          PortalProps={{ container: ref.current }}
        >
          <Button onClick={() => toggle()}>open</Button>
        </Popper>
      </div>
    </Wrap>
  );
};
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
