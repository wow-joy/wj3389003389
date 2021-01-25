---
group:
  title: Other 其他
title: BackTop 回到顶部
---

# BackTop 回到顶部

## 基本

```tsx
/**
 * title: 基本
 * desc: 简单的用法。
 */
import React from 'react';
import { BackTop } from '@wowjoy/core';

export default () => {
  return (
    <>
      <BackTop />
      右下角按钮
    </>
  );
};
```

```tsx
/**
 * title: 自定义样式
 * desc: 可以自定义回到顶部按钮的样式，限制宽高：40px * 40px, 可以选择监听的scroll对象
 */
import React, { useRef } from 'react';
import { BackTop } from '@wowjoy/core';
const style = {
  height: 40,
  width: 40,
  lineHeight: '40px',
  borderRadius: 4,
  backgroundColor: '#1088e9',
  color: '#fff',
  textAlign: 'center',
  fontSize: 14,
};
export default () => {
  const ref = useRef();
  return (
    <div style={{ position: 'relative' }}>
      <BackTop target={() => ref.current} style={{ position: 'absolute' }}>
        <div style={style}>UP</div>
      </BackTop>
      <div ref={ref} style={{ height: '600px', overflow: 'auto' }}>
        <div style={{ height: '600vh', padding: 8 }}>
          <div>Scroll to bottom</div>
          <div>Scroll to bottom</div>
          <div>Scroll to bottom</div>
          <div>Scroll to bottom</div>
          <div>Scroll to bottom</div>
          <div>Scroll to bottom</div>
          <div>Scroll to bottom</div>
        </div>
      </div>
    </div>
  );
};
```

## Props

| 参数 | 说明 | 类型 | 默认值 |
| :-- | :-- | :-- | :-- |
| duration | 回到顶部所需时间（ms） | number | 450 |
| target | 设置需要监听其滚动事件的元素，值为一个返回对应 DOM 元素的函数 | () => HTMLElement | () => window |
| visibilityHeight | 滚动高度达到此参数值才出现 BackTop | number | 400 |
| onClick | 点击按钮的回调函数 | function | - |
