---
group:
  title: Navigation 导航
title: Steps 步骤条
---

# Steps 步骤条

## 基本使用

```tsx
/**
 * title: 基本使用
 * desc: 横向步骤条
 */

import React from 'react';
import { Steps } from '@wowjoy/core';
const Space = () => <div style={{ marginTop: 5 }}></div>;

export default () => {
  return (
    <>
      <Steps
        sourceDatas={[
          { name: '步骤一啊', status: 'past' },
          { name: '步骤二步骤二步骤二步骤二步骤二步骤二', status: 'past' },
          { name: '步骤三', status: 'now' },
          { name: '已完成', status: 'future' },
        ]}
      />
      <Space />
    </>
  );
};
```
## 小尺寸
```tsx
/**
 * title: 小尺寸
 * desc: size='small'
 */

import React from 'react';
import { Steps } from '@wowjoy/core';
const Space = () => <div style={{ marginTop: 5 }}></div>;

export default () => {
  return (
    <>
       <Steps
        sourceDatas={[
          { name: '步骤一啊', status: 'past' },
          { name: '步骤二步骤二步骤二步骤二步骤二步骤二', status: 'past' },
          { name: '步骤三', status: 'now' },
          { name: '已完成', status: 'future' },
        ]}
        lastNodeShowRightIcon={false}
        size={'small'}
      />
    </>
  );
};
```
## 可点击
```tsx
/**
 * title: 可点击
 * desc: ⚠️onChange为空时默认为不可点击
 */

import React from 'react';
import { Steps } from '@wowjoy/core';
const Space = () => <div style={{ marginTop: 5 }}></div>;

export default () => {
  return (
    <>
      <Steps
        sourceDatas={[
          { name: '步骤一', status: 'past' },
          { name: '步骤二', status: 'past' },
          { name: '步骤三', status: 'now' },
          { name: '已完成', status: 'future' },
        ]}
        onChange={(s) => console.log(s)}
      />
      <Space />
    </>
  );
};
```
## Props

| 参数 | 说明 | 类型 | 默认值 |
| :-- | :-- | :-- | :-- |
| sourceDatas | 进度数据 | {name: string, status: 'past' \| 'now'\| 'future' }[] |  |
| lastNodeShowRightIcon | 最后一个节点是否展示对号 默认展示 | boolean | true |
| className | 步骤条类名 | string | - |
| size | 指定大小，目前支持普通（default）和迷你（small） | string | default |
| onChange | 点击切换步骤时触发 | (current) => void | - |
