---
group:
  title: Utils 工具包
title: TextField 文本框
---

# TextField 文本框

```tsx
/**
 * title: 基本使用
 */

import React from 'react';
import { TextField } from '@wowjoy/core';
const Space = () => <span style={{ marginLeft: 10 }}></span>;

export default () => <TextField placeholder="请输入" />;
```

## TextField Props

| 参数        | 说明 | 类型   | 默认值 |
| :---------- | :--- | :----- | :----- |
| placeholder | 提示 | string |        |
