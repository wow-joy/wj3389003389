---
group:
  title: Utils 工具包
title: ClickAwayListener 他处点击监视器
---

# ClickAwayListener 他处点击监视器

```tsx
/**
 * title: 基本使用
 */

import React from 'react';
import { ClickAwayListener, Portal, Popper } from '@wowjoy/core';
import { useToggle } from '@wowjoy/hooks';

export default () => {
  const [show, toggle] = useToggle(false);
  return (
    <ClickAwayListener onClickAway={() => toggle(false)}>
      <Popper open={show} content={<div>点我不会消失，但点我和button外面会消失</div>}>
        <button type="button" onClick={() => toggle(true)}>
          显示
        </button>
      </Popper>
    </ClickAwayListener>
  );
};
```

## ClickAwayListener Props

| 参数 | 说明 | 类型 | 默认值 |
| :-- | :-- | :-- | :-- |
| disableReactTree | 是否监听 react 树结构, 默认已经监听了 DOM 树 | boolean | false |
| mouseEvent | 鼠标触发事件 | 'onClick' \| 'onMouseDown' \| 'onMouseUp' \| false | onClick |
| touchEvent | 移动端触发事件 | 'onTouchEnd' \| 'onTouchStart' \| false | onTouchEnd |
| onClickAway | clickaway 回调 | () => void |  |
