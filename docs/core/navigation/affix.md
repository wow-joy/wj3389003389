---
group:
  title: Navigation 导航
title: Affix 固钉
---

# Affix 固钉

## 基本

```tsx
/**
 * title: 基本
 * desc: 简单的用法。
 */
import React from 'react';
import { Affix, Button, Alert } from '@wowjoy/core';

export default ()=>{
  return(
    <> 
      <Affix>
        <Alert severity="success">Affix top</Alert>
      </Affix>
      <br />
      <Affix offsetTop={100}>
        <Button variant="outlined" color="success">100px to Affix top</Button>
      </Affix>
      <br />
      <Affix offsetBottom={0}>
        {/* 可以打开控制台,将控制台调高,以查看效果 */}
        <Button variant="outlined" color="success">Affix bottom</Button>
      </Affix>
    </>
  )
}
```

## 固定状态改变的回调

```tsx
/**
 * title: 固定状态改变的回调
 * desc: 可以获得是否是固定的状态。
 */
import React from 'react';
import { Affix, Button } from '@wowjoy/core';

export default ()=>{
  return(
    <Affix offsetTop={200} onChange={affixed => console.log('固定状态改变: ',affixed)}>
      <Button variant="outlined" color="success">200px to Affix top</Button>
    </Affix>
  )
}
```

## 滚动容器

```tsx
/**
 * title: 滚动容器
 * desc: 用 `target` 设置 `Affix` 需要监听其滚动事件的元素，默认为 `window`。
 */
import React from 'react';
import { Affix, Button } from '@wowjoy/core';

export default ()=>{
  const [container, setContainer] = React.useState(null);
  // Affix 使用 target 绑定容器时，元素会跑到容器外的
  return(
    <div style={{height: 100, overflowY: 'scroll' }} ref={setContainer}>
      <div style={{height: 600, paddingTop: 60, background: '#ECFBFB' }}>
        <Affix target={() => container} className="affix">
          <Button variant="contained" color="success">Affix 滚动容器</Button>
        </Affix>
      </div>
    </div>
  )
}
```

<!-- ```tsx
/**
 * title: 滚动容器(元素会跑到容器外)
 * desc: 用 `target` 设置 `Affix` 需要监听其滚动事件的元素，默认为 `window`。希望任意滚动，可以在窗体添加滚动监听元素，避免会跑到容器外。
 */
import React from 'react';
import { Affix, Button } from '@wowjoy/core';

export default ()=>{
  const [container, setContainer] = React.useState(null);
  const affixRef = React.useRef(null);
  React.useEffect(() => {
    window.addEventListener(
      "scroll",
      (e) => {
        affixRef.current.updatePosition(e);
      },
      true
    );
  },[]);
  return(
    <div style={{height: 100, overflowY: 'scroll' }} ref={setContainer}>
      <div style={{height: 600, paddingTop: 60, background: '#ECFBFB' }}>
        <Affix target={() => container} className="affix" ref={affixRef}>
          <Button variant="contained" color="success">Affix 滚动容器</Button>
        </Affix>
      </div>
    </div>
  )
}
``` -->

## Props

| 成员 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| offsetBottom | 距离窗口底部达到指定偏移量后触发 | number | - |
| offsetTop | 距离窗口顶部达到指定偏移量后触发 | number | - |
| onChange | 固定状态改变时触发的回调函数 | function(affixed) | - |
| target | 设置 `Affix` 需要监听其滚动事件的元素，值为一个返回对应 DOM 元素的函数 | () => HTMLElement | () => window |
