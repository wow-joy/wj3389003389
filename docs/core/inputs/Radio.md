---
group:
  title: Inputs 输入框
title: Radio 单选框
---

# Radio 单选框

```tsx
/**
 * title: 基本使用
 */

import React from 'react';
import { Radio } from '@wowjoy/core';
const Space = () => <span style={{ marginLeft: 10 }}></span>;

export default () => (
  <>
    <Radio
      onChange={e => {
        console.log(e.target.checked);
      }}
    >
      选项名称
    </Radio>
    <Radio disabled>选项名称</Radio>
    <Radio checked>选项名称</Radio>
    <Radio checked disabled>
      选项名称
    </Radio>
  </>
);
```

## RadioGroup

```tsx
/**
 * title: RadioGroup
 */

import React, { useState } from 'react';
import { Radio, RadioGroup } from '@wowjoy/core';
const Space = () => <span style={{ marginLeft: 10 }}></span>;

export default () => {
  const [value, setValue] = useState(1);

  return (
    <RadioGroup
      value={value}
      onChange={e => {
        console.log(e.target.value);
        setValue(e.target.value);
      }}
    >
      <Radio value={1} autoFocus>
        A
      </Radio>
      <Radio value={2} disabled>
        B
      </Radio>
      <Radio value={3}>C</Radio>
      <Radio value={4}>D</Radio>
      <Radio value={5}>E</Radio>
    </RadioGroup>
  );
};
```

## RadioButton

```tsx
/**
 * title: RadioGroup
 */

import React, { useState } from 'react';
import { RadioButton, RadioGroup } from '@wowjoy/core';
const Space = () => <span style={{ marginLeft: 10 }}></span>;

export default () => {
  const [value, setValue] = useState(1);
  return (
    <RadioGroup
      value={value}
      onChange={e => {
        setValue(e.target.value);
      }}
    >
      <RadioButton value={1}>北京</RadioButton>
      <RadioButton value={2}>上海</RadioButton>
      <RadioButton value={3}>广州</RadioButton>
      <RadioButton value={4}>深圳</RadioButton>
    </RadioGroup>
  );
};
```

## Options

```tsx
/**
 * title: RadioGroup组合配置方式
 * desc: 通过配置`options`参数渲染单选框, `optionType`设置radio类型
 */

import React, { useState } from 'react';
import { RadioButton, RadioGroup } from '@wowjoy/core';
const Space = () => <span style={{ marginLeft: 10 }}></span>;

export default () => {
  const [value, setValue] = useState('zh');
  return (
    <>
      <RadioGroup
        value={value}
        onChange={e => {
          setValue(e.target.value);
        }}
        options={[
          {
            label: '中国',
            value: 'zh',
          },
          {
            label: '美国',
            value: 'us',
          },
          {
            label: '英国',
            value: 'uk',
          },
          {
            label: '日本',
            value: 'jp',
          },
        ]}
      ></RadioGroup>
      <RadioGroup
        value={value}
        onChange={e => {
          setValue(e.target.value);
        }}
        buttonVariant="outlined"
        optionType="button"
        size="small"
        options={[
          {
            label: '中国',
            value: 'zh',
          },
          {
            label: '美国',
            value: 'us',
          },
          {
            label: '英国',
            value: 'uk',
          },
          {
            label: '日本',
            value: 'jp',
          },
        ]}
      />
      <RadioGroup
        value={value}
        onChange={e => {
          setValue(e.target.value);
        }}
        buttonVariant="contained"
        optionType="button"
        size="large"
        options={[
          {
            label: '中国',
            value: 'zh',
          },
          {
            label: '美国',
            value: 'us',
          },
          {
            label: '英国',
            value: 'uk',
          },
          {
            label: '日本',
            value: 'jp',
          },
        ]}
      />
    </>
  );
};
```

## Radio/RadioButton Props

| 参数 | 说明 | 类型 | 默认值 |
| :-- | :-- | :-- | :-- |
| autoFocus | 自动获取焦点 | boolean | false |
| checked | 选中状态 | boolean | false |
| defaultChecked | 默认选中状态 | boolean | false |
| disabled | 禁用 | boolean | false |
| value | 根据 value 进行比较，判断是否选中 | any |  |
| name | 添加到 input 属性 name | string |  |
| inputRef | input 的 ref | React.MutableRefObject<HTMLInputElement\> \| ((instance: HTMLInputElement):void) |  |
| IconButtonProps | IconButton 的 props | [IconButton Props](/core/inputs/IconButton) |  |
| onChange | 状态改变的回调 | (e: React.MouseEvent & { target: EventValue }): void |

## RadioGroup Props

| 参数 | 说明 | 类型 | 默认值 |
| :-- | :-- | :-- | :-- |
| value | 根据 value 进行比较，判断是否选中 | any |  |
| defaultValue | 默认 value | any |  |
| disabled | 禁用 | boolean | false |
| name | 添加到 input 属性 name | string |  |
| onChange | 状态改变的回调 | (e: React.MouseEvent & { target: EventTarget }): void |
| options | options 配置式 | Array<string \| { label: string; value: string; disabled: boolean }\> |
| optionType | radio 形式 | radio \| button |
| buttonVariant | RadioButton 的样式 | contained \| outlined \| text | contained |
| size | 设置 RadioButton 的大小 | large \| medium \| small |

### EventTarget

```
interface EventTarget {
  value: any;
  checked: boolean;
  name: string;
  disabled: boolean;
}
```
