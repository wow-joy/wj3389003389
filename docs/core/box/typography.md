---
group:
  title: Box
title: typography 字体
---

字体相关语法糖

## Text alignment

```js
<Box textAlign="left">…
<Box textAlign="center">…
<Box textAlign="right">…
```

## Font weight

```js
<Box fontWeight="fontWeightLight">… <Box fontWeight="fontWeightRegular">… <Box fontWeight="fontWeightMedium">… <Box fontWeight={500}>… <Box fontWeight="fontWeightBold">…

```

## Font size

```js
<Box fontSize="fontSize">…
<Box fontSize="h6.fontSize">…
<Box fontSize={16}>…
```

## Font Style

```js
<Box fontStyle="normal">…
<Box fontStyle="italic">…
<Box fontStyle="oblique">…
```

## Font family

```js
<Box fontFamily="fontFamily">…
<Box fontFamily="Monospace">…
```

## Letter Spacing

```js
<Box letterSpacing={6}>…
<Box letterSpacing={10}>…
```

## Line Height

```js
<Box lineHeight="normal">…
<Box lineHeight={10}>…
```

## API

```js
import { typography } from '@material-ui/system';
```

| Import name     | Prop            | CSS property     | Theme key                       |
| :-------------- | :-------------- | :--------------- | :------------------------------ |
| `fontFamily`    | `fontFamily`    | `font-family`    | 字符串方式访问 theme.typography |
| `fontSize`      | `fontSize`      | `font-size`      | 字符串方式访问 theme.typography |
| `fontStyle`     | `fontStyle`     | `font-style`     | 字符串方式访问 theme.typography |
| `fontWeight`    | `fontWeight`    | `font-weight`    | 字符串方式访问 theme.typography |
| `letterSpacing` | `letterSpacing` | `letter-spacing` | none                            |
| `lineHeight`    | `lineHeight`    | `line-height`    | none                            |
| `textAlign`     | `textAlign`     | `text-align`     | none                            |

```

```
