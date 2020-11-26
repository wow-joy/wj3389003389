---
group:
  title: Data Display 数据展示
title: Timeline 时间轴
---

# Timeline 时间轴

## 基本使用

```tsx
/**
 * title: 基本使用
 * desc: 基本的时间轴。
 */

import React from 'react';
import { Timeline } from '@wowjoy/core';

export default () => {
  return (
    <Timeline>
      <Timeline.Item>Better to run than curse the road. 2020-09-01</Timeline.Item>
      <Timeline.Item>No business but war. No family but death. No mercy but the grave! 2020-11-01</Timeline.Item>
      <Timeline.Item>Your elements return to nature. 2020-11-01</Timeline.Item>
      <Timeline.Item>Drink and be bleary, for tomorrow we die. 2020-11-01</Timeline.Item>
    </Timeline>
  );
};
```

## 圆圈颜色

```tsx
/**
 * title: 圆圈颜色(状态)
 * desc: 圆圈颜色，`success`, `exception`, `normal`, `gray`, 具需求选择，也可以自定义颜色
 */

import React from 'react';
import { Timeline } from '@wowjoy/core';

export default () => {
  return (
    <Timeline>
      <Timeline.Item color="success">Better to run than curse the road. 2020-11-01</Timeline.Item>
      <Timeline.Item color="success">Better to run than curse the road. 2020-11-01</Timeline.Item>
      <Timeline.Item color="exception">
        <p>No business but war. No family but death. No mercy but the grave! 2020-11-01</p>
      </Timeline.Item>
      <Timeline.Item>
        <p>Your elements return to nature.  2020-11-01</p>
      </Timeline.Item>
      <Timeline.Item color="gray">
        <p>Your elements return to nature.  2020-11-01</p>
      </Timeline.Item>
      <Timeline.Item color="gray">
        <p>Your elements return to nature.  2020-11-01</p>
      </Timeline.Item>
      <Timeline.Item color="#9254de">
        <p>Your elements return to nature.  2020-11-01</p>
      </Timeline.Item>
      <Timeline.Item color="rgb(160, 217, 17)">
        <p>Your elements return to nature.  2020-11-01</p>
      </Timeline.Item>
    </Timeline>
  );
};
```

## 自定义时间轴点

```tsx
/**
 * title: 自定义时间轴点
 * desc: 可以设置为图标或其他自定义元素。
 */
import React from 'react';
import { Timeline } from '@wowjoy/core';
import { CheckFillCircle, SecureCheck } from '@wowjoy/icons';

export default () => {
  return (
    <Timeline>
      <Timeline.Item>Better to run than curse the road. 2020-11-01</Timeline.Item>
      <Timeline.Item>No business but war. No family but death. No mercy but the grave! 2020-11-01</Timeline.Item>
      <Timeline.Item dot={<CheckFillCircle />} color="success">Your elements return to nature. 2020-11-01</Timeline.Item>
      <Timeline.Item dot={<SecureCheck />}>Drink and be bleary, for tomorrow we die. 2020-11-01</Timeline.Item>
    </Timeline>
  );
};
```

## 排序

```tsx
/**
 * title: 最后一个及排序
 * desc: 当任务状态正在发生，还在记录过程中，可用幽灵节点来表示当前的时间节点，当 pending 为真值时展示幽灵节点，如果 pending 是 React 元素可用于定制该节点内容，同时 pendingDot 将可以用于定制其轴点。reverse 属性用于控制节点排序，为 false 时按正序排列，为 true 时按倒序排列。
 */
import React from 'react';
import { Timeline, Button } from '@wowjoy/core';
import { Require } from '@wowjoy/icons';

// pendingDot={<Require />}

export default () => {
  const [ reverse, change] = React.useState(false);
  return (
    <>
       <Timeline  pending="Recording..." reverse={reverse} >
        <Timeline.Item>Better to run than curse the road. 2020-11-01</Timeline.Item>
        <Timeline.Item>No business but war. No family but death. No mercy but the grave! 2020-11-01</Timeline.Item>
        <Timeline.Item>Your elements return to nature. 2020-11-01</Timeline.Item>
        <Timeline.Item>Drink and be bleary, for tomorrow we die. 2020-11-01</Timeline.Item>
      </Timeline>
      <Button type="primary" style={{ marginTop: 16 }} onClick={()=>change(!reverse)}>
          Toggle Reverse
      </Button>
    </>
  );
};
```

## 展现方式

```jsx
/**
 * title: 展现方式
 * desc: 有 label 情况下，不同 mode 的展现。
 */
import React, { useState } from 'react';
import { Timeline, RadioGroup, Radio } from '@wowjoy/core';

export default () =>  {
  const [mode, setMode] = useState('left');

  const onChange = e => {
    setMode(e.target.value);
  };

  return (
    <>
      <RadioGroup
        onChange={onChange}
        value={mode}
        style={{
          marginBottom: 20,
        }}
      >
        <Radio value="left">Left</Radio>
        <Radio value="right">Right</Radio>
        <Radio value="alternate">Alternate</Radio>
      </RadioGroup>
      <Timeline mode={mode}>
        <Timeline.Item label="2020-11-01">Better to run than curse the road.</Timeline.Item>
        <Timeline.Item label="2020-11-01 09:12:11">No business but war. No family but death. No mercy but the grave!</Timeline.Item>
        <Timeline.Item>Your elements return to nature.</Timeline.Item>
        <Timeline.Item label="2020-11-01 09:12:11">Drink and be bleary, for tomorrow we die.</Timeline.Item>
      </Timeline>
    </>
  );
};
```

```jsx
/**
 * title: 展现方式
 * desc: 无 label 情况下，不同 mode 的展现。
 */
import React, { useState } from 'react';
import { Timeline, RadioGroup, Radio } from '@wowjoy/core';

export default () =>  {
  const [mode, setMode] = useState('left');

  const onChange = e => {
    setMode(e.target.value);
  };

  return (
    <>
      <RadioGroup
        onChange={onChange}
        value={mode}
        style={{
          marginBottom: 20,
        }}
      >
        <Radio value="left">Left</Radio>
        <Radio value="right">Right</Radio>
        <Radio value="alternate">Alternate</Radio>
      </RadioGroup>
      <Timeline mode={mode}>
        <Timeline.Item >Better to run than curse the road.</Timeline.Item>
        <Timeline.Item >No business but war. No family but death. No mercy but the grave!</Timeline.Item>
        <Timeline.Item >Your elements return to nature.</Timeline.Item>
        <Timeline.Item >Drink and be bleary, for tomorrow we die.</Timeline.Item>
      </Timeline>
    </>
  );
};
```

## 自定义节点位置

```jsx
/**
 * title: 自定义节点位置
 * desc: position 自定义节点位置。优先级高于 Timeline 设置的 mode。
 */
import React, { useState } from 'react';
import { Timeline, RadioGroup, Radio } from '@wowjoy/core';

export default () =>  {
  const [mode, setMode] = useState('left');

  const onChange = e => {
    setMode(e.target.value);
  };

  return (
    <>
      <RadioGroup
        onChange={onChange}
        value={mode}
        style={{
          marginBottom: 20,
        }}
      >
        <Radio value="left">Left</Radio>
        <Radio value="right">Right</Radio>
        <Radio value="alternate">Alternate</Radio>
      </RadioGroup>
      <Timeline mode={mode}>
        <Timeline.Item label="2020-11-01">Better to run than curse the road.</Timeline.Item>
        <Timeline.Item label="2020-11-01 09:12:11">No business but war. No family but death. No mercy but the grave!</Timeline.Item>
        <Timeline.Item >Your elements return to nature.</Timeline.Item>
        <Timeline.Item label="2020-11-01 09:12:11">Drink and be bleary, for tomorrow we die.</Timeline.Item>
        <Timeline.Item label="2020-11-01" position={'right'}>Better to run than curse the road.</Timeline.Item>
        <Timeline.Item label="2020-11-01" position={'right'}>Better to run than curse the road.</Timeline.Item>
      </Timeline>
    </>
  );
};
```

## API


### Timeline

时间轴。

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| pending | 指定最后一个幽灵节点是否存在或内容 | boolean \| string \| ReactNode | false |
| pendingDot | 当最后一个幽灵节点存在時，指定其时间图点 | string \| ReactNode | &lt;LoadingOutlined /> |
| reverse | 节点排序 | boolean | false |
| mode | 通过设置 `mode` 可以改变时间轴和内容的相对位置 | `left` \| `alternate` \| `right` | - |

### Timeline.Item

时间轴的每一个节点。

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| color | 指定圆圈颜色 `success`, `exception`, `normal`, `gray`，或自定义的颜色值 | string | `normal` |
| dot | 自定义时间轴点 | ReactNode | - |
| position | 自定义节点位置 (优先级高于 Timeline 设置的 mode ) | `left` \| `right` | - |
| label | 设置标签 (设置 label, 请先设置 mode ) | ReactNode | - |
