---
group:
  title: Feedback 用户反馈
title: Progress 进度条
---

# Progress 进度条

## 进度条

```tsx
/**
 * title: 进度条
 * desc: 简单标准的进度条。
 */
import React from 'react';
import { Progress } from '@wowjoy/core';

export default ()=>{
  return(
    <>
      <Progress percent={88} />
      <Progress percent={88} status="active"/>
      <Progress percent={55} status={"exception"} />
      <Progress percent={88} status="success" />
      <Progress percent={88} showInfo={false} />
    </>  
  )
}
```

## 进度圈

```tsx
/**
 * title: 进度圈
 * desc: 圈形的进度。
 */
import React from 'react';
import { Progress } from '@wowjoy/core';

export default ()=>{
  return(
    <>
      <Progress percent={88} type={"circle"} />
      <Progress percent={55} type={"circle"} status={"exception"} />
      <Progress percent={100} type={"circle"} status={"success"} />
      <Progress percent={88} type={"circle"} strokeWidth={4} showInfo={false}/>
    </>
  )
}
```

## 仪表盘

```tsx
/**
 * title: 仪表盘
 * desc: 设置 type=dashboard 实现仪表盘样式的进度条。若想要修改缺口的角度，可以设置 gapDegree 的值。修改 gapPosition 设置仪表盘进度条缺口位置。
 */
import React from 'react';
import { Progress } from '@wowjoy/core';

export default ()=>{
  return(
    <>
      <Progress percent={88} type={"dashboard"}/>
      <Progress percent={88} gapDegree={100} type={"dashboard"}/>
      <Progress percent={88} gapDegree={120} type={"dashboard"} strokeWidth={8}/>
      <Progress percent={88} gapDegree={100} gapPosition="top" type={"dashboard"}/>
    </>
  )
}
```

## 内容内部展示的进度条

```tsx
/**
 * title: 内容内部展示的进度条
 * desc: 内容内部展示的进度条(条线的宽度大于等于16时允许)。
 */
import React from 'react';
import { Progress } from '@wowjoy/core';

export default ()=>{
  return(
    <>
      <Progress percent={88} size="large" showInnerInfo/>
      <Progress percent={100} strokeWidth={18} showInnerInfo status="success"/>
    </>  
  )
}
```

## 不同大小的进度条

```tsx
/**
 * title: 不同大小的进度条
 * desc: 可以设置不同的size(small|large|large)，得到不同大小的进度条
 */
import React from 'react';
import { Progress } from '@wowjoy/core';

export default ()=>{
  return(
    <>
      <div style={{ width: 180 }}>
        <Progress percent={88} size="small" />
      </div>
      <div style={{ width: 280 }}>
        <Progress percent={88} />
      </div>
      <Progress percent={88} size="large" />
    </>
  )
}
```

## 不同大小的进度圈

```tsx
/**
 * title: 不同大小的进度圈
 * desc: 可以设置width，得到不同大小的进度圈
 */
import React from 'react';
import { Progress } from '@wowjoy/core';

export default ()=>{
  return(
    <>
      <Progress percent={88} type={"circle"} width={80} />
      <Progress percent={55} type={"circle"} status={"exception"}  width={100} />
      <Progress percent={100} type={"circle"} status={"success"} width={120} />
    </>
  )
}
```

## 动态展示

```tsx
/**
 * title: 动态展示
 * desc: 动态改变
 */
import React from 'react';
import { Progress, Button } from '@wowjoy/core';

export default ()=>{
  const [ v, setV ] = React.useState(88);
  const changeV = v => {
    if (v<=0) {
      setV(0);
    } else if (v>=100) {
      setV(100);
    } else {
      setV(v);
    }
  }
  return(
    <div style={{ maxWidth: 400}}>
      <Progress percent={v} status="active" />
      <Progress percent={v} type={"circle"} />
      <br />
      <Button onClick={()=>changeV(v-1)}>-</Button>
      &nbsp;&nbsp;
      <Button onClick={()=>changeV(v+1)}>+</Button>
    </div>
  )
}
```

## 自定义文字格式

```tsx
/**
 * title: 自定义文字格式
 * desc: format 属性指定格式
 */
import React from 'react';
import { Progress } from '@wowjoy/core';

export default ()=>{
  return(
    <>
      <Progress percent={88} type={"circle"}  format={percent => `${percent}°C`}/>
      <Progress
        percent={95}
        type={"circle"}
        format={(percent) => {
          if (percent >= 95) {
            return `Goal`;
          }
          return `waiting`;
      }}/>
    </>
  )
}
```

## 自定义进颜色

```tsx
/**
 * title: 仪表盘
 * desc: 设置 color 为 string 时为普通颜色。设置 color 为 object 时为渐变色，推荐只传两种颜色。注意不同的type支持的数据格式不同。
 */
import React from 'react';
import { Progress } from '@wowjoy/core';

export default ()=>{
  // circle dashboard 支持百分比
  return(
    <>
      <Progress percent={100} color={"#87d068"} />
      <Progress percent={100} color={{
        from: '#108ee9',
        to: '#87d068',
      }} />
      <Progress percent={100} color={{
        '0%': '#108ee9',
        '100%': '#87d068',
      }} />
      <Progress percent={88} type={"dashboard"} color={"#87d068"} />
      <Progress percent={88} type={"dashboard"} color={{
        "0%": '#108ee9',
        "100%": '#87d068',
      }} />
      <Progress percent={88} type={"dashboard"} color={{
        "0%": '#108ee9',
        "50%": '#87d068',
      }} />
      <Progress percent={88} type={"circle"} color={"#87d068"} />
      <Progress percent={88} type={"circle"} color={{
        "0%": '#108ee9',
        "100%": '#87d068',
      }} />
      <Progress percent={88} type={"circle"} color={{
        "0%": '#108ee9',
        "50%": '#87d068',
      }} />
    </>
  )
}
```

## Props

各类型共用的属性。

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| type | 类型，可选 `line` `circle` `dashboard` | string | `line` |
| format | 内容的模板函数 | function(percent) | (percent) => percent + `%` |
| percent | 百分比 | number | 0 |
| showInfo | 是否显示进度数值或状态图标 | boolean | true |
| status | 状态，可选：`success` `exception` `normal` `active`(仅限 line) | string | - |
| color | 进度条的色彩 | string | - |

### `type="line"`

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| strokeWidth | 进度条线的宽度，单位 px | number | 8 |
| color | 进度条的色彩，传入 object 时为渐变 | string \| { from: string; to: string; direction: string } \| { 'xx%': string; 'xx%': string; direction: string } | - |
| size | 大小 | 可选： `small` `default` `large`  | `default` |
| showInnerInfo | 信息展示在线条之上,线条较宽时允许使用(条线的宽度大于等于16时允许)  | boolean | false |

### `type="circle"`

| 属性        | 说明                                             | 类型             | 默认值 |
| ----------- | ------------------------------------------------ | ---------------- | ------ |
| width       | 圆形进度条画布宽度，单位 px                      | number           | 128px    |
| strokeWidth | 圆形进度条线的宽度，单位是进度条画布宽度的百分比 | number           | 6      |
| color | 圆形进度条线的色彩，传入 object 时为渐变         | string \| { 'xx%': string; 'xx%': string; } | - |

### `type="dashboard"`

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| width | 仪表盘进度条画布宽度，单位 px | number | 132 |
| strokeWidth | 仪表盘进度条线的宽度，单位是进度条画布宽度的百分比 | number | 6 |
| color | 圆形进度条线的色彩，传入 object 时为渐变         | string \| { 'xx%': string; 'xx%': string; } | - |
| gapDegree | 仪表盘进度条缺口角度，可取值 0 ~ 295 | number | 75 |
| gapPosition | 仪表盘进度条缺口位置 | `top` \| `bottom` \| `left` \| `right` | `bottom` |
