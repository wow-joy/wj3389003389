---
group:
  title: Feedback 用户反馈
title: Spin 加载中
---

# Spin 加载中

```tsx
/**
 * title: 基本使用
 */

import React from 'react';
import { Spin, Button } from '@wowjoy/core';
import { useToggle } from '@wowjoy/hooks';
import styled from '@wowjoy/styled';
const Space = () => <span style={{ marginLeft: 10 }}></span>;

export default () => {
  const [spinning, toggle] = useToggle(false);

  return (
    <>
      <Button color="question" onClick={toggle}>
        toggle
      </Button>
      <div style={{ padding: 20 }}>
        <Spin spinning={spinning}>
          <div>Hello world</div>
        </Spin>
      </div>
    </>
  );
};
```

## Props

| 参数      | 说明         | 类型            | 默认值   |
| :-------- | :----------- | :-------------- | :------- |
| spinning  | 正在加载？   | boolean         | question |
| indicator | loading 组件 | React.ReactNode |          |
