---
group:
  title: Layout 布局
title: Divider 分割线
---

# Divider 分割线

## 简单的分割线

```tsx
/**
 * title: 水平分割线
 * desc: 根据传入的dashed值判断分割线是否为虚线，type默认为horizontal
 */
import React from 'react';
import { Divider } from '@wowjoy/core';

export default ()=>{
  return(
    <>
      <a>Function</a>
      <Divider dashed={true}/>
      <a>Object</a>
      <Divider/>
      <a>Array</a>
    </>
  )
}
```

## 标题水平分割线
```tsx
/**
 * title: 标题水平分割线
 * desc: text属性显示标题，orientation控制标题位置
 */
import React from 'react';
import { Divider } from '@wowjoy/core';

export default ()=>{
  return(
    <>
      <a>Function</a>
      <Divider text={"Text"} orientation="left"/>
      <a>Object</a>
      <Divider text={"Text"} orientation="center"/>
      <a>Array</a>
      <Divider text={"Text"} orientation="right" dashed={true}/>

    </>
  )
}
```

## 垂直分割线

```tsx
/**
 * title: 垂直分割线
 * desc: 使用 type="vertical" 设置为行内的垂直分割线。
 */
import React from 'react';
import { Divider } from '@wowjoy/core';

export default ()=>{
  return(
    <>
      <a>Function</a>
      <Divider type={"vertical"} dashed={true}>Text</Divider>
      <a>Object</a>
      <Divider type={"vertical"}/>
      <a>Array</a>
    </>
  )
}
```

## Props

| 参数 | 说明 | 类型 | 默认值 |
| :-- | :-- | :-- | :-- |
| type	 | 水平还是垂直类型	 | horizontal \| vertical | horizontal |
| dashed	 | 是否虚线		 | boolean | flase |
| text	 | 标题		 | React.ReactNode |  |
| orientation	| 分割线标题的位置	 | left \| center \| right	 | center |

