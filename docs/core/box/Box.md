---
group:
  title: Box
title: Box 简单介绍
order: -1
---

## 概念

实际开发中，经常会需要给某些 html 元素加一点点小样式，而开发者们应该避免使用内联样式，单独定义 class 写 css 又太麻烦，Box 就是为了解决这个问题的。 Box 本质上就是做了 props => css 属性的映射，使开发效率尽可能提高，同时不失可读性。同时还能结合 theme 做一些更高级的语法糖。

## 使用前置

Box 内部需要访问 theme，请包裹 ThemeProvider 以确保有些映射能正常工作。

```js
import { createTheme } from '@wowjoy/styled';
import  { createTheme, ThemeProvider } from '@wowjoy/styled';

export default () => {
  return (
    <ThemeProvider theme={createTheme()}>
      {...}
    </ThemeProvider>
  );
};
```

```tsx
/**
 * title: 基本使用
 * desc: padding、margin 等长度单位如果是 number ,则会乘以间距最小单位（取自 theme.spacing）,width 做了分数处理，也可以手动输入字符串自定义
 */
import React from 'react';
import { Box } from '@wowjoy/core';
import { createTheme } from '@wowjoy/styled';
import { ThemeProvider } from '@wowjoy/styled';

export default () => {
  return (
    <ThemeProvider theme={createTheme()}>
      <Box color="red">hello</Box>
      <Box p={1}>4px</Box>
      <Box p={2}>8px</Box>
      <Box p={-1}>-4px</Box>
      <Box width={1}>100%</Box>
      <Box width={1 / 2}>50%</Box>
      <Box width={1 / 3}>33.3%</Box>
      <Box color="primary.main">hello</Box>
      <Box color="secondary.main">hello</Box>
      <Box color="error.main">hello</Box>
      <Box color="warning.main">hello</Box>
      <Box color="info.main">hello</Box>
      <Box color="success.main">hello</Box>
      <Box color="text.primary">hello</Box>
      <Box color="text.secondary">hello</Box>
      <Box color="text.disabled">hello</Box>
    </ThemeProvider>
  );
};
```

## 媒体查询

```tsx
/**
 * title: 同一个属性下的媒体查询
 * desc: 写法有顺序要求，宽度小的 key 放最前面，以便大宽度的时候样式权重更高
 */
import React from 'react';
import { Box } from '@wowjoy/core';

export default () => {
  return (
    <>
      <Box
        color={{
          md: 'green',
          xs: 'yellow',
          lg: 'red',
        }}
      >
        hello
      </Box>
    </>
  );
};
```

```tsx
/**
 * title: 不同属性下的媒体查询
 * desc: 建议有多种属性需要分别设置时用这种写法，大多数时候都应该用这种，**同一属性不应该同时出现在2种写法里,会有出人意料的结果**
 */
import React from 'react';
import { Box } from '@wowjoy/core';

export default () => {
  return (
    <>
      <Box
        xs={{
          color: 'yellow',
          fontSize: 12,
        }}
        md={{
          color: 'green',
          fontSize: 22,
        }}
        lg={{
          color: 'red',
          fontSize: 32,
        }}
      >
        hello
      </Box>
    </>
  );
};
```

## 预设映射

为了使 Box 组件更实用，我们已预置了一套样式函数，下面是一个完整的列表：

```tsx | inline
import React from 'react';
import { Link } from 'react-router-dom';

export default () => {
  return (
    <ul>
      <li>
        <Link to="/core/box/borders">borders</Link>
      </li>
      <li>
        <Link to="/core/box/display">display</Link>
      </li>
      <li>
        <Link to="/core/box/flexbox">flexbox</Link>
      </li>
      <li>
        <Link to="/core/box/grid">grid</Link>
      </li>
      <li>
        <Link to="/core/box/palette">palette</Link>
      </li>
      <li>
        <Link to="/core/box/positions">positions</Link>
      </li>
      <li>
        <Link to="/core/box/sizing">sizing</Link>
      </li>
      <li>
        <Link to="/core/box/spacing">spacing</Link>
      </li>
      <li>
        <Link to="/core/box/typography">typography</Link>
      </li>
    </ul>
  );
};
```

## 如何自定义更多映射

### style 方法

options:

- prop：string，传入的 props 值
- cssProperty： false | css 属性字符串。默认值是 options.prop。 这使用了 CSS 属性。 你可以传入 false 来禁用此选项。 禁用的情况下，这个属性的值会被作为样式对象应用于其本身。
- themeKey：string，支持从过 'a.b.c'的形式访问 theme 里的属性
- transform: 在输出 CSS 值之前应用一个转换

#### 简单扩展

```js
import React from 'react';
import { style, Box } from '@wowjoy/core';
import styled from 'styled-components';

// 这样MyBox 就支持接收 position 了
const position = style({
  prop: 'position',
});

// 这样MyBox 就支持接收 bgcolor 映射成 backgroundColor 了
// 同时可以使用如 'background.default'这样的字符串形式访问 theme.palette 里的属性
const bgcolor = style({
  prop: 'bgcolor',
  cssProperty: 'backgroundColor',
  themeKey: 'palette',
});

const MyBox = styled(Box)`
  ${position}
`;
```

#### 高级扩展

```tsx
/**
 * title: 自定义props：flexCenter
 */
import React from 'react';
import { style, Box } from '@wowjoy/core';
import styled, { createTheme, ThemeProvider } from '@wowjoy/styled';

const flexCenter = style({
  prop: 'flexCenter',
  // flexCenter 是自己定义的，不是真实的 css 属性
  cssProperty: false,
  // 一对多的映射 css 属性
  transform: (flexCenter, theme) => {
    return flexCenter
      ? {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }
      : {};
  },
});

const MyBox = styled(Box)`
  ${flexCenter}
  ${p => {
    console.log(p);
  }}
`;

export default () => {
  return (
    <ThemeProvider theme={createTheme()}>
      <Box flexCenter width={100} height={100} bgcolor={'question.main'}>
        flex center
      </Box>
    </ThemeProvider>
  );
};
```

> 该扩展映射已内置于 flexbox
