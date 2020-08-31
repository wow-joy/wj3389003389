---
group:
  title: Box
title: spacing 间距
---

# Spacing 间距

<p class="description">各种简写响应边距和填充实用程序类，用于修改元素的外观。</p>

## 符号

把一系列简写语法糖转换为 margin 和 padding 对应的 CSS 声明。 使用格式`{属性}{方向}` 命名。

其中

**属性**：

- `m` - 对于设置*margin*
- `p` - 对于设置*padding*

**方向**：

- `t` - 对于设置* margin-top*或*padding-top*的类
- `b` - 对于设置*margin-bottom 的类*或*padding-bottom*的类
- `l` - 对于设置*margin-left*或*padding-left*的类
- `r` - 对于设置*margin-right*或*padding-right*的类
- `x` - 对于设置** -left\*和** -right\*的类
- `y` - 对于设置** -top\*和** -bottom\*的类

## 转换

根据输入和主题配置，应用以下转换：

- 输入：`数字` & 主题：`数字` ：该属性乘以主题值。

```js
const theme = {
  spacing: 8,
}

<Box m={-2} /> // margin: -16px;
<Box m={0} /> // margin: 0px;
<Box m={0.5} /> // margin: 4px;
<Box m={2} /> // margin: 16px;
```

- 输入：`数字` & 主题：`数组` ：属性值用作数组索引。

```js
const theme = {
  spacing: [0, 2, 3, 5, 8],
}

<Box m={-2} /> // margin: -3px;
<Box m={0} /> // margin: 0px;
<Box m={2} /> // margin: 3px;
```

- 输入：`数字` & 主题：`功能` ：使用属性值调用该函数。

```js
const theme = {
  spacing: value => value ** 2,
}

<Box m={0} /> // margin: 0px;
<Box m={2} /> // margin: 4px;
```

- input: `string`: 该属性作为原始 CSS 值传递。

```js
<Box m="2rem" /> // margin: 2rem;
<Box mx="auto" /> // margin-left: auto; margin-right: auto;
```

## 水平居中

```js
<Box mx="auto">…
```

_有些人觉得属性简写让人困惑，如果你愿意，可以使用完整版：_

```diff
-<Box pt={2} />
+<Box paddingTop={2} />
```

```diff
-<Box px={2} />
+<Box paddingX={2} />
```
