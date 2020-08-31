---
group:
  title: Box
title: sizing 大小
---

大小相关语法糖

```js
<Box width={1/4}> // 0到1之间的数字会自动转换成百分比
<Box width={300}> // 自动加单位
<Box width="75%"> // 字符串默认不处理
<Box width={1}>   // 100%
```

## Width

```js
<Box width="25%">…
<Box width="50%">…
<Box width="75%">…
<Box width="100%">…
<Box width="auto">…
```

## Height

```js
<Box height="25%">…
<Box height="50%">…
<Box height="75%">…
<Box height="100%">…
```

## API

| Import name | Prop        | CSS property | Theme key |
| :---------- | :---------- | :----------- | :-------- |
| `width`     | `width`     | `width`      | none      |
| `maxWidth`  | `maxWidth`  | `max-width`  | none      |
| `minWidth`  | `minWidth`  | `min-width`  | none      |
| `height`    | `height`    | `height`     | none      |
| `maxHeight` | `maxHeight` | `max-height` | none      |
| `minHeight` | `minHeight` | `min-height` | none      |
| `boxSizing` | `boxSizing` | `box-sizing` | none      |
