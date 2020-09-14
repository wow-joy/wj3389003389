---
group:
  title: Form 表单
title: Form
---

# Form 表单

<code src="./demos/1.tsx" title="基本使用" desc="基本的表单数据域控制展示，包含布局、初始化、验证、提交。" />

<code src="./demos/2.tsx" title="必填字段" desc="required 是 true 的时候默认 message 为 label || name 必填，为字符串时即为message" />

<code src="./demos/3.tsx" title="受控表单" desc="通过 useForm 对表单数据域进行交互。 注意 useForm 是 React Hooks 的实现，只能用于函数组件。" />

<code src="./demos/4.tsx" title="获取字段值" desc="useForm() 返回的 watch 方法可以监听字段，会重新 render 整个组件，如果只想单独 渲染，可以使用 useWatch" />

<code src="./demos/5.tsx" title="表单布局" desc="表单有三种布局。" />

<code src="./demos/6.tsx" title="动态增减表单项" desc="动态增加、减少表单项。" />

<code src="./demos/7.tsx" title="嵌套结构与校验信息" desc="name 属性支持嵌套数据结构, 支持数组和对象" />

```tsx
/**
 * title: 复杂一点的控件
 * desc: 这里演示 `Form.Item` 内有多个元素的使用方式。`<Form.Item name="field" />` 只会对它的直接子元素绑定表单功能，例如直接包裹了 `Input/Select`。如果控件前后还有一些文案或样式装点，或者一个表单项内有多个控件，你可以使用内嵌的 `Form.Item` 完成。你可以给 `Form.Item` 自定义 `style` 进行内联布局，或者添加 `noStyle` 作为纯粹的无样式绑定组件
 */
import React from 'react';
import { Form, Button, Input, Box } from '@wowjoy/core';

export default () => {
  return (
    <>
      <Form
        colon
        onSubmit={async values => {
          console.log(values);
        }}
        labelBoxProps={{ width: 150 }}
        // valueBoxProps={{ width: 250 }}
      >
        <Form.Item label="Person 1" required itemControlBoxProps={{ display: 'flex' }}>
          <Form.Item noStyle name="email" required>
            <Input placeholder="请输入email" />
          </Form.Item>
          <Form.Item noStyle name="age" required>
            <Input placeholder=" age" />
          </Form.Item>
        </Form.Item>
        <Form.Item label="Person 2" required itemControlBoxProps={{ display: 'flex' }}>
          <Form.Item label={false} name="email2" required>
            <Input placeholder="请输入email2" />
          </Form.Item>
          <Form.Item label={false} name="age2" required>
            <Input placeholder="请输入age2" />
          </Form.Item>
        </Form.Item>
        <Form.Item>
          <Button type="submit" color="primary">
            submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
```

```tsx
/**
 * title: 自定义表单控件
 * desc: 自定义或第三方的表单控件，也可以与 Form 组件一起使用。只要该组件遵循以下的约定：<br /> 提供受控属性 value 或其它与 valuePropName 的值同名的属性。<br /> 提供 onChange 事件或 trigger 的值同名的事件。
 */
import { Form, Button, Input, Box } from '@wowjoy/core';
import React, { useState } from 'react';
import { Select, Switch } from 'antd';

const { Option } = Select;

const PriceInput = ({ value = {}, onChange }) => {
  const [number, setNumber] = useState(0);
  const [currency, setCurrency] = useState('rmb');

  const triggerChange = changedValue => {
    if (onChange) {
      onChange({
        number,
        currency,
        ...value,
        ...changedValue,
      });
    }
  };

  const onNumberChange = e => {
    const newNumber = parseInt(e.target.value || 0, 10);

    if (Number.isNaN(number)) {
      return;
    }
    if (!('number' in value)) {
      setNumber(newNumber);
    }

    triggerChange({
      number: newNumber,
    });
  };

  const onCurrencyChange = newCurrency => {
    if (!('currency' in value)) {
      setCurrency(newCurrency);
    }

    triggerChange({
      currency: newCurrency,
    });
  };

  return (
    <span>
      <Input
        type="text"
        value={value.number || number}
        onChange={onNumberChange}
        style={{
          width: 100,
        }}
      />
      <Select
        value={value.currency || currency}
        style={{
          width: 80,
          margin: '0 8px',
        }}
        onChange={onCurrencyChange}
      >
        <Option value="rmb">RMB</Option>
        <Option value="dollar">Dollar</Option>
      </Select>
    </span>
  );
};

export default () => {
  const onSubmit = values => {
    console.log('Received values from form: ', values);
  };

  return (
    <Form
      name="customized_form_controls"
      layout="inline"
      onSubmit={onSubmit}
      defaultValues={{
        price: {
          number: 1,
          currency: 'rmb',
        },
      }}
    >
      <Form.Item
        name="price"
        label="Price"
        rules={{
          validate: {
            checkPrice: value => (value.number > 0 ? true : 'Price must be greater than zero!'),
          },
        }}
      >
        <PriceInput />
      </Form.Item>
      <Form.Item>
        <Button type="primary">Submit</Button>
      </Form.Item>
    </Form>
  );
};
```

```tsx
/**
 * title: 表单数据存储于上层组件
 * desc: 通过 `onValuesChange`，可以把表单的数据存储到上层组件或者 Redux、dva 中 <br/> **注意**： 将表单数据存储于外部容器并非好的实践，如无必要请避免使用
 */
import { Form, Button, Input, Box } from '@wowjoy/core';
import React, { useState } from 'react';

export default () => {
  const onSubmit = values => {
    console.log('Received values from form: ', values);
  };

  return (
    <Form
      onSubmit={onSubmit}
      labelBoxProps={{ width: 100 }}
      onValuesChange={(...e) => {
        console.log(e);
      }}
    >
      <Form.Item name="a" label="aaa">
        <Input />
      </Form.Item>
      <Form.Item name="b" label="aaa">
        <Input />
      </Form.Item>
      <Form.Item>
        <Button type="primary">Submit</Button>
      </Form.Item>
    </Form>
  );
};
```
