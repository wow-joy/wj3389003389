---
group:
  title: Inputs 输入框
title: Checkbox 单选框
---

# Checkbox 单选框

```tsx
/**
 * title: 基本使用
 */

import React from 'react';
import { Checkbox } from '@wowjoy/core';
const Space = () => <span style={{ marginLeft: 10 }}></span>;

export default () => (
  <>
    <Checkbox
      onChange={e => {
        console.log(e.target.checked);
      }}
    >
      选项名称
    </Checkbox>
    <Checkbox disabled>选项名称</Checkbox>
    <Checkbox checked>选项名称</Checkbox>
    <Checkbox checked disabled>
      选项名称
    </Checkbox>
  </>
);
```

## CheckboxGroup

```tsx
/**
 * title: CheckboxGroup
 */

import React, { useState } from 'react';
import { Checkbox, CheckboxGroup } from '@wowjoy/core';
const Space = () => <span style={{ marginLeft: 10 }}></span>;

export default () => {
  const [value, setValue] = useState([1]);

  return (
    <CheckboxGroup
      value={value}
      onChange={checkedValues => {
        console.log(checkedValues);
        setValue(checkedValues);
      }}
    >
      <Checkbox value={1}>A</Checkbox>
      <Checkbox value={2} disabled>
        B
      </Checkbox>
      <Checkbox value={3}>C</Checkbox>
      <Checkbox value={4}>D</Checkbox>
      <Checkbox value={5}>E</Checkbox>
    </CheckboxGroup>
  );
};
```

## Options

```tsx
/**
 * title: CheckboxGroup组合配置方式
 * desc: 通过配置`options`参数渲染单选框, `optionType`设置Checkbox类型
 */

import React, { useState } from 'react';
import { CheckboxButton, CheckboxGroup } from '@wowjoy/core';
const Space = () => <span style={{ marginLeft: 10 }}></span>;

export default () => {
  const [value, setValue] = useState(['zh']);
  return (
    <>
      <CheckboxGroup
        value={value}
        onChange={checkedValues => {
          setValue(checkedValues);
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
      />
      <CheckboxGroup
        onChange={checkedValues => {
          console.log(checkedValues);
        }}
        options={['Apple', 'Orange', 'Banana', 'Watermelon']}
      />
    </>
  );
};
```

## Checkbox/CheckboxButton Props

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
| onChange | 状态改变的回调 | (e: React.MouseEvent & { target: EventTarget }): void |

## CheckboxGroup Props

| 参数 | 说明 | 类型 | 默认值 |
| :-- | :-- | :-- | :-- |
| value | 根据 value 进行比较，判断是否选中 | string[] |  |
| defaultValue | 默认 value | string[] |  |
| disabled | 禁用 | boolean | false |
| name | 添加到 input 属性 name | string |  |
| onChange | 状态改变的回调 | (e: React.MouseEvent & { target: EventTarget }): void |
| options | options 配置式 | Array<string \| { label: string; value: string; disabled: boolean }\> |

### EventTarget

```
interface EventTarget {
  value: any;
  checked: boolean;
  name: string;
  disabled: boolean;
}
```
