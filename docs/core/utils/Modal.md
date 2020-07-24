---
group:
  title: Utils 工具包
title: Modal 模态框
---

# Modal 模态框

## 简单的模态框

```tsx
/**
 * title: 普通模态框
 * desc: open 控制显隐
 */
import React, { useState } from 'react';
import { Button, Modal } from '@wowjoy/core';
import styled from '@wowjoy/styled';

const Content = styled.div`
  background: #fff;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.25);
  border-radius: 3px;
  padding: 20px 80px;
`;
const Space = () => <span style={{ marginLeft: 10 }}></span>;

export default () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Open
      </Button>
      <Modal open={open} onClose={() => setOpen(false)} BackdropProps={{ timeout: 3000 }}>
        <Content>
          <h2>Modal</h2>
          <p>Content</p>
          <Button color="secondary" variant="contained" onClick={() => setOpen(false)}>
            Close
          </Button>
        </Content>
      </Modal>
    </>
  );
};
```

## 过渡动画

```tsx
/**
 * title: 添加过渡动画
 * desc: 可以自己使用过渡动画, 比如react-transition-group或react-spring, 也可以使用本库动画
 */
import React, { useState } from 'react';
import { Button, Modal, Collapse } from '@wowjoy/core';
import styled from '@wowjoy/styled';

const Content = styled.div`
  background: #fff;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.25);
  border-radius: 3px;
  padding: 20px 80px;
`;
const Space = () => <span style={{ marginLeft: 10 }}></span>;

export default () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Open
      </Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Collapse in={open}>
          <Content>
            <h2>Modal</h2>
            <p>Content</p>
            <Button color="secondary" variant="contained" onClick={() => setOpen(false)}>
              Close
            </Button>
          </Content>
        </Collapse>
      </Modal>
    </>
  );
};
```

## Props(继承 PortalProps)

| 参数 | 说明 | 类型 | 默认值 |
| :-- | :-- | :-- | :-- |
| open | 显示隐藏 | boolean |
| hideBackdrop | 隐藏蒙层 | boolean | false |
| BackdropProps | 蒙层参数 |  |
| mountOnEnter | 参照 Trasition | boolean | true |
| unmountOnExit | 参照 Trasition | boolean | true |
| maskClosable | 点击蒙层关闭 | boolean | true |
| onClose | 关闭回调 | (e: any, triggerName: string) => void |  |
| onBackdropClick | 蒙层点击事件 | (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void |  |
