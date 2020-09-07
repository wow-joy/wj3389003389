---
group:
  title: Inputs 输入框
title: Button 按钮
---

# Button 按钮

## variant 按钮类型

```tsx
/**
 * title: 按钮类型
 * desc: 有三种类型的按钮 Contained Text Outlined
 */

import React from 'react';
import { Button, IconButton } from '@wowjoy/core';
import { Delete } from '@wowjoy/icons';
const Space = () => <span style={{ marginLeft: 10 }}></span>;

export default () => (
  <>
    <Button variant="contained">Contained</Button>
    <Space />
    <Button variant="contained" disableElevation>
      Contained
    </Button>
    <Space />
    <Button variant="contained" disabled>
      Contained
    </Button>
    <Space />
    <Button variant="text">Text</Button>
    <Space />
    <Button variant="text" disabled>
      Text
    </Button>
    <Space />
    <Button variant="outlined">Outlined</Button>
    <Space />
    <Button variant="outlined" disabled>
      Outlined
    </Button>
  </>
);
```

## size 大小

```tsx
/**
 * title: 按钮尺寸
 * desc: 三种尺寸 small medium(default) large, 可以通过sizeOpt配置每种大小的样式
 */

import React from 'react';
import { Button, IconButton } from '@wowjoy/core';
import { Delete } from '@wowjoy/icons';
const Space = () => <span style={{ marginLeft: 10 }}></span>;

export default () => (
  <>
    <Button size="small">small</Button>
    <Space />
    <Button size="medium">medium</Button>
    <Space />
    <Button size="large">large</Button>
  </>
);
```

## color 颜色

```tsx
/**
 * title: 基本使用color
 * desc: 属性color设置颜色
 */

import React from 'react';
import { Button } from '@wowjoy/core';
const Space = () => <span style={{ marginLeft: 10 }}></span>;
export default () => (
  <>
    <Button variant="contained">default(inherit)</Button>
    <Space />
    <Button variant="contained" color="primary">
      primary
    </Button>
    <Space />
    <Button variant="contained" color="secondary">
      secondary
    </Button>
    <Space />
    <Button variant="contained" color="error">
      error
    </Button>
    <Space />
    <Button variant="contained" color="warning">
      warning
    </Button>
    <Space />
    <Button variant="contained" color="success">
      success
    </Button>
    <Space />
    <Button variant="contained" color="info">
      info
    </Button>
    <Space />
    <Button variant="contained" color="question">
      question
    </Button>
  </>
);
```

## startIcon endIcon

```tsx
/**
 * title: 基本使用color
 * desc: 属性color设置颜色
 */

import React from 'react';
import { Button } from '@wowjoy/core';
import { CheckCircle, CloseCircle } from '@wowjoy/icons';
const Space = () => <span style={{ marginLeft: 10 }}></span>;
export default () => (
  <>
    <Button variant="contained" startIcon={<CheckCircle />} endIcon={<CloseCircle />}>
      Primary
    </Button>
  </>
);
```

## IconButton

```tsx
/**
 * title: 基本使用color
 * desc: 属性color设置颜色
 */

import React from 'react';
import { IconButton } from '@wowjoy/core';
import { Delete, CloseCircle } from '@wowjoy/icons';
const Space = () => <span style={{ marginLeft: 10 }}></span>;
export default () => (
  <>
    <IconButton size="small">
      <Delete />
    </IconButton>
    <IconButton>
      <Delete />
    </IconButton>
    <IconButton size="large">
      <Delete />
    </IconButton>
    <IconButton disabled>
      <Delete />
    </IconButton>
    <Space />
    <br />
    <IconButton size="small" color="primary">
      <Delete />
    </IconButton>
    <IconButton color="primary">
      <Delete />
    </IconButton>
    <IconButton size="large" color="primary">
      <Delete />
    </IconButton>
    <IconButton disabled color="primary">
      <Delete />
    </IconButton>
    <Space />
    <br />
    <IconButton variant="text" size="small" color="primary">
      <Delete />
    </IconButton>
    <IconButton variant="text" color="primary">
      <Delete />
    </IconButton>
    <IconButton variant="text" size="large" color="primary">
      <Delete />
    </IconButton>
    <IconButton disabled variant="text" color="primary">
      <Delete />
    </IconButton>
  </>
);
```

## Props(继承 ButtonBase)

| 参数             | 说明                   | 类型                                | 默认值    |
| :--------------- | :--------------------- | :---------------------------------- | :-------- |
| variant          | 按钮类型               | 'contained' \| 'outlined' \| 'text' | contained |
| size             | 按钮尺寸               | 'small' \| 'medium' \| 'large'      | medium    |
| disabled         | 禁用                   | boolean                             | false     |
| disableElevation | 禁用阴影，按钮变得扁平 | boolean                             | false     |
| href             | 变成 a 标签，添加 href | string                              |           |
| startIcon        | 前置 icon              | ReactNode                           |           |
| endIcon          | 后置 icon              | ReactNode                           |           |
