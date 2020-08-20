---
group:
  title: Feedback 用户反馈
title: Confirm 确认框
---

# Confirm 确认框

## 基本使用

```tsx
/**
 * title: 基本使用
 */

import React from 'react';
import { Button, Confirm, ButtonBase } from '@wowjoy/core';
import { useToggle } from '@wowjoy/hooks';
import styled from '@wowjoy/styled';
const Space = () => <span style={{ marginLeft: 10 }}></span>;

export default () => {
  const [open, toggle] = useToggle(false);
  const [type, setType] = React.useState('question');
  const [loading, setLoading] = React.useState(false);
  const [equal, setEqual] = useToggle(false);

  const handleClick = type => () => {
    setType(type);
    toggle(true);
  };
  return (
    <>
      <Button color="question" onClick={handleClick('question')}>
        question
      </Button>
      <Space />
      <Button color="warning" onClick={handleClick('warning')}>
        warning
      </Button>
      <Space />
      <Button color="success" onClick={handleClick('success')}>
        success
      </Button>
      <Space />
      <Button color="error" onClick={handleClick('error')}>
        error
      </Button>
      <Space />
      <Button
        onClick={() => {
          setType(type);
          toggle(true);
          setEqual();
        }}
      >
        equal
      </Button>
      <Confirm
        type={type}
        title="您确定要禁用该角色吗？"
        desc="角色禁用后，已授权用户及用户组将 被禁止使用角色关联的权限！"
        open={open}
        onClose={() => toggle(false)}
        equal={equal}
        loading={loading}
        onOk={() => {
          setLoading(true);
          setTimeout(() => setLoading(false), 3000);
        }}
      />
    </>
  );
};
```

## 函数调用

```tsx
/**
 * title: 函数
 */

import React from 'react';
import { Button, confirm } from '@wowjoy/core';
import styled from '@wowjoy/styled';
const Space = () => <span style={{ marginLeft: 10 }}></span>;
export default () => {
  const handleClick = () => {
    confirm({
      title: '标题党人',
      desc: '来自uc编辑部',
    });
  };
  const handleClickAsyn = () => {
    confirm({
      title: '确认删除?',
      desc: '删除之后不能恢复',
      type: 'warning',
      equal: false,
      onOk: () => {
        return new Promise(res => {
          setTimeout(res, 3000);
        });
      },
    });
  };
  return (
    <>
      <Button color="question" onClick={handleClick}>
        open
      </Button>
      <Space />
      <Button color="warning" onClick={handleClickAsyn}>
        with Promise
      </Button>
    </>
  );
};
```

## Props(继承 [Modal](/core/utils/modal))

| 参数    | 说明         | 类型                                                   | 默认值   |
| :------ | :----------- | :----------------------------------------------------- | :------- |
| type    | confirm 类型 | 'question' \| 'warning' \| 'success'\|'error'          | question |
| title   | 标题         | string                                                 |          |
| desc    | 描述         | string                                                 |
| equal   | 按钮是否评级 | boolean                                                | false    |
| onOk    | ok           | (e: React.MouseEvent<HTMLElement, MouseEvent>) => void | string   |
| loading | loading      | boolean                                                |          |
