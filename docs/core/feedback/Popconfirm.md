---
group:
  title: Feedback 用户反馈
title: PopConfirm 气泡确认框
---

# PopConfirm 气泡确认框

## 基本

```tsx
/**
 * title: 基本
 * desc: 简单的用法。
 */
import React from 'react';
import { PopConfirm, Button } from '@wowjoy/core';

export default ()=>{
  return(
    <PopConfirm
      content='确认操作吗?'
      onConfirm={() => console.log('onConfirm')}
      onCancel={(e) => console.log('onCancel',e)}
      onVisibleChange={(v,e) => console.log(v,e)}
    >
      <Button variant='outlined' color='info'>基本</Button>
    </PopConfirm>
  )
}
```

## 自定义按钮

```tsx
/**
 * title: 自定义
 * desc: 使用 okText 和 cancelText 自定义按钮文字。okButtonProps，cancelButtonProps 设置按钮属性。
 */
import React from 'react';
import { PopConfirm, Button } from '@wowjoy/core';

export default ()=>{
  return(
    <PopConfirm
      cancelText='关闭'
      okText='已了解'
      content={() => '自定义按钮~~'}
      onConfirm={() => console.log('onConfirm')}
      okButtonProps={{color: 'success', variant: 'outlined' }}
    >
      <Button variant='outlined' color='info'>自定义按钮</Button>
    </PopConfirm>
  )
}
```

## 自定义 Icon 图标

```tsx
/**
 * title: 自定义 Icon 图标
 * desc: 自定义提示 icon。
 */
import React from 'react';
import { PopConfirm, Button } from '@wowjoy/core';
import { CheckboxCheck } from '@wowjoy/icons';

export default ()=>{
  return(
    <PopConfirm
      content={<span>
        自定义 Icon 图标~~~
      </span>}
      icon={<CheckboxCheck />}
      onConfirm={() => console.log('onConfirm')}
    >
      <Button variant='outlined' color='info'>自定义 Icon</Button>
    </PopConfirm>
  )
}
```

## 位置

```tsx
/**
 * title: 自定义 Icon 图标
 * desc: 位置有十二个方向。请参考Popper。默认placement为Top。
 */
import React from 'react';
import { PopConfirm, Button } from '@wowjoy/core';
import { CheckboxCheck } from '@wowjoy/icons';

export default ()=>{
  return(
    <div>
      <div style={{ marginLeft: 80}}>
        <PopConfirm content="top" placement="top">
          <Button variant='outlined' color='info'>top</Button>
        </PopConfirm>
      </div>
      <div style={{ float: 'left'}}>
         <PopConfirm content="left" placement="left">
          <Button variant='outlined' color='info'>left</Button>
          </PopConfirm>
      </div>   
      <div style={{ marginLeft:180}}>
        <PopConfirm content="right" placement="right">
          <Button variant='outlined' color='info'>right</Button>
        </PopConfirm>
      </div>
      <div style={{ marginLeft: 80}}>
        <PopConfirm content="bottom" placement="bottom">
          <Button variant='outlined' color='info'>bottom</Button>
        </PopConfirm>
      </div>
    </div>
  )
}
```

## 条件触发

```tsx
/**
 * title: 条件触发
 * desc: 可以判断是否需要弹出显示。
 */
import React from 'react';
import { PopConfirm, Button, RadioButton, RadioGroup } from '@wowjoy/core';

export default ()=>{
  const [ visible, setVisible] = React.useState(false);
  const [ show, setShow ] = React.useState(false);
  return(
    <>
      <PopConfirm
        visible={visible}
        content='确认删除吗?'
        onConfirm={() => console.log('onConfirm')}
        onCancel={(e) => console.log('onCancel',e)}
        onVisibleChange={
          (v,e) => show && setVisible(v)
        }
      >
        <Button variant='outlined' color='info'>当前状态: {show?'可以':'不可'}弹出</Button>
      </PopConfirm>
      <br />
      <br />
      是否显示:
      <RadioGroup
        value={show}
        onChange={e => {
          setShow(e.target.value);
        }}
      >
        <RadioButton value={true}>显示</RadioButton>
        <RadioButton value={false}>隐藏</RadioButton>
      </RadioGroup>
    </>
  )
}
```

## Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| cancelText | 取消按钮文字 | string | 取消 |
| okText | 确认按钮文字 | string | 确定 |
| okType | 确认按钮类型 | `contained` `outlined` `text` | `contained` |
| okButtonProps | ok 按钮 props | [ButtonProps](/core/inputs/button#props继承-buttonbase) | - |
| cancelButtonProps | cancel 按钮 props | [ButtonProps](/core/inputs/button#props继承-buttonbase) | - |
| content | 确认框的内容 | string \| ReactNode \| () => ReactNode | - |
| onCancel | 点击取消的回调 | function(e) | - |
| onConfirm | 点击确认的回调 | function(e) | - |
| icon | 自定义弹出气泡 Icon 图标 | ReactNode | &lt;WarningCircle /> |
| className | 弹出容器类名 | string | - |

触发事件设置为click，更多属性请参考 [Popper](/core/utils/popper#popper-props)。
