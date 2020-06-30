---
group:
  title: 通用组件
title: Input 文本框
---

# Input 文本框

```tsx
/**
 * title: 基本使用
 */

import React from 'react';
import { Input } from '@wowjoy/core';
import { Delete } from '@wowjoy/icons';
const Space = () => <span style={{ marginLeft: 10 }}></span>;

export default () => (
  <>
    <Input placeholder="small" size="small" />
    <Space />
    <Input placeholder="medium" />
    <Space />
    <Input placeholder="large" size="large" />
    <br />
    <Input placeholder="disabled" disabled />
    <Space />
    <Input placeholder="allowClear" allowClear />
    <Space />
    <Input placeholder="allowClear" prefix={<Delete color="red" />} />
    <Space />
    <Input placeholder="allowClear" suffix={<Delete color="blue" />} />
  </>
);
```

## Input Props

| 参数       | 说明                   | 类型                           | 默认值 |
| :--------- | :--------------------- | :----------------------------- | :----- |
| size       | 按钮尺寸               | 'small' \| 'medium' \| 'large' | medium |
| sizeOpt    | 按钮尺寸配置           | SizeOpt                        |
| disabled   | 禁用                   | boolean                        | false  |
| allowClear | 清除按钮               | boolean                        | false  |
| href       | 变成 a 标签，添加 href | string                         |        |
| prefix     | 前置 icon              | ReactNode                      |        |
| suffix     | 后置 icon              | ReactNode                      |        |

```
interface SizeOpt {
  small: {
    fontSize: number;
  };
  medium: {
    fontSize: number;
  };
  large: {
    fontSize: number;
  };
}
default {
      small: {
        fontSize: 12,
      },
      medium: {
        fontSize: 14,
      },
      large: {
        fontSize: 16,
      },
    }
```

# InputGroup

```tsx
/**
 * title: 基本使用
 */

import React from 'react';
import { Input, InputGroup } from '@wowjoy/core';
import { Delete } from '@wowjoy/icons';
const Space = () => <span style={{ marginLeft: 10 }}></span>;

export default () => (
  <InputGroup>
    <Input placeholder="medium" />
    <Input placeholder="allowClear" suffix={<Delete color="blue" />} />
  </InputGroup>
);
```

## InputGroup Props

| 参数 | 说明     | 类型                           | 默认值 |
| :--- | :------- | :----------------------------- | :----- |
| size | 按钮尺寸 | 'small' \| 'medium' \| 'large' | medium |

# Search 搜索框

```tsx
/**
 * title: 基本使用
 */

import React from 'react';
import { Search } from '@wowjoy/core';
const Space = () => <span style={{ marginLeft: 10 }}></span>;

export default () => (
  <>
    <Search placeholder="small" size="small" />
  </>
);
```

## Search Props(继承 Input)

| 参数     | 说明         | 类型                    | 默认值 |
| :------- | :----------- | :---------------------- | :----- |
| onSearch | 触发搜索事件 | (value: string) => void |        |
