---
group:
  title: InputNumber 数字输入框
title: InputNumber 数字输入框
---

# InputNumber 数字输入框

## 基本使用

```tsx
/**
 * title: 基本使用
 * desc: 基本的数字输入框。
 */
import React from 'react';
import { InputNumber } from '@wowjoy/core';

function onChange(value) {
  console.log('changed', value);
}

export default () => (
  <InputNumber min={1} max={100} defaultValue={3} onChange={onChange} />
);
```

## 三种大小

```tsx
/**
 * title: 三种大小
 * desc: 三种大小的数字输入框，设置 size 改变( large / 42px，middle / 32px，small / 24px)，默认middle。
 */
import React from 'react';
import { InputNumber } from '@wowjoy/core';

function onChange(value) {
  console.log('changed', value);
}

export default () => (
  <>
    <InputNumber size="small" min={1} max={100} defaultValue={6} onChange={onChange} style={{ margin: "0 10px" }}/>
    <InputNumber min={1} max={100} defaultValue={6} onChange={onChange} style={{ margin: "0 10px" }}/>
    <InputNumber size="large" min={1} max={100} defaultValue={6} onChange={onChange} style={{ margin: "0 10px" }}/>
  </>
  
);
```

## 不可用

```tsx
/**
 * title: 不可用
 * desc: 不可用状态和只读状态
 */
import React from 'react';
import { InputNumber, Button } from '@wowjoy/core';

function onChange(value) {
  console.log('changed', value);
}

export default () => {
  const [ disabled, change] = React.useState(true);
  return (
    <>
      {disabled && "不"}可用：
      <InputNumber min={1} max={1000} disabled={disabled} defaultValue={8} />
      <div style={{ marginTop: 20 }}>
        <Button onClick={()=>change(!disabled)} variant="contained">
          Toggle disabled
        </Button>
      </div>
      <br />
      只读：
      <InputNumber min={1} max={10} readOnly defaultValue={8} />
    </>
  );
};
```

## 格式化展示

```tsx
/**
 * title: 格式化展示
 * desc: 通过 formatter 格式化数字，以展示具有具体含义的数据，往往需要配合 parser 一起使用。
 */
import React from 'react';
import { InputNumber } from '@wowjoy/core';

function onChange(value) {
  console.log('changed', value);
}

export default () => (
  <>
    <InputNumber
      defaultValue={1000}
      formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
      parser={value => value.replace(/\$\s?|(,*)/g, '')}
      onChange={onChange}
    />
    <br />
    <br />
    <InputNumber
      defaultValue={100}
      min={0}
      max={100}
      formatter={value => `${value}%`}
      parser={value => value.replace('%', '')}
      onChange={onChange}
    />
  </>
);
```

## API

属性如下

| 成员 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| defaultValue | 初始值 | number | - |
| disabled | 禁用 | boolean | false |
| readOnly | 只读 | boolean | false |
| max | 最大值 | number | [Number.MAX_SAFE_INTEGER](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_SAFE_INTEGER) |
| min | 最小值 | number | [Number.MIN_SAFE_INTEGER](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number/MIN_SAFE_INTEGER) |
| formatter | 指定输入框展示值的格式 | function(value: number \| string): string | - |
| parser | 指定从 `formatter` 里转换回数字的方式，和 `formatter` 搭配使用 | function(string): number | - |
| precision | 数值精度 | number | - |
| size | 输入框大小 | `large` \| `middle` \| `small` | - |
| step | 每次改变步数，可以为小数 | number \| string | 1 |
| value | 当前值 | number | - |
| onChange | 变化回调 | function(value: number \| string) | - |
| onStep | 点击上下箭头的回调 | (value: number, info: { offset: number, type: 'up' \| 'down' }) => void | - |
