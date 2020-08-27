---
group:
  title: Feedback 用户反馈
title: Snackbar 消息条
---

# Snackbar 消息条

```tsx
/**
 * title: 基本使用
 */

import React, { useEffect, useRef } from 'react';
import { SnackbarProvider, useSnackbar, Button } from '@wowjoy/core';

function Message() {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  return (
    <Button
      color="primary"
      onClick={() => {
        enqueueSnackbar(`Time: ${new Date().toLocaleString()}!`);
      }}
    >
      Time
    </Button>
  );
}

export default function App() {
  return (
    <SnackbarProvider>
      <Message />
    </SnackbarProvider>
  );
}
```

## 最大显示数量

```tsx
/**
 * title: MaxSnack
 * desc: 属性`maxSnack`控制最大显示数量, 默认是6
 */

import React, { useEffect, useRef } from 'react';
import { SnackbarProvider, useSnackbar, Button } from '@wowjoy/core';

function Message() {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  return (
    <Button
      color="primary"
      onClick={() => {
        enqueueSnackbar(`Time: ${new Date().toLocaleString()}!`);
      }}
    >
      Max 10
    </Button>
  );
}

export default function App() {
  return (
    <SnackbarProvider maxSnack={10}>
      <Message />
    </SnackbarProvider>
  );
}
```

## 类型

```tsx
/**
 * title: 属性`severity`和`variant`
 * desc: 属性`severity`切换消息类型，`variant`切换样式
 */

import React, { useEffect, useRef, useState } from 'react';
import { SnackbarProvider, useSnackbar, Button, RadioGroup, Radio } from '@wowjoy/core';

function Message(props) {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  return (
    <Button
      color="primary"
      onClick={() => {
        enqueueSnackbar(`Time: ${new Date().toLocaleString()}!`, {
          persist: true,
        });
      }}
      {...props}
    >
      Time
    </Button>
  );
}

export default function App() {
  const [severity, setSeverity] = useState('success');
  const [variant, setVariant] = useState('filled');
  return (
    <SnackbarProvider
      maxSnack={6}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      severity={severity}
      variant={variant}
    >
      <div style={{ color: '#666' }}>variant</div>
      <RadioGroup
        value={variant}
        onChange={e => {
          setVariant(e.target.value);
        }}
      >
        <Radio value="filled">filled</Radio>
        <Radio value="standard">standard</Radio>
        <Radio value="outlined">outlined</Radio>
      </RadioGroup>
      <div style={{ marginTop: 20, color: '#666' }}>severity</div>
      <RadioGroup
        value={severity}
        onChange={e => {
          setSeverity(e.target.value);
        }}
      >
        <Radio value="success">success</Radio>
        <Radio value="error">error</Radio>
        <Radio value="info">info</Radio>
        <Radio value="warning">warning</Radio>
        <Radio value="question">question</Radio>
      </RadioGroup>

      <Message style={{ marginTop: 20 }} />
    </SnackbarProvider>
  );
}
```

## 位置

```tsx
/**
 * title: 消息弹出的位置
 * desc: 垂直方向(vertical): `top` `center` `bottom`, 水平方向`horizontal`: `left` `center` `right`
 */

import React, { useEffect, useRef, useState } from 'react';
import { SnackbarProvider, useSnackbar, Button, RadioGroup, Radio } from '@wowjoy/core';

function Message(props) {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  return (
    <Button
      color="primary"
      onClick={() => {
        enqueueSnackbar(`Time: ${new Date().toLocaleString()}!`, {
          persist: true,
        });
      }}
      {...props}
    >
      Time
    </Button>
  );
}

export default function App() {
  const [vertical, setVertical] = useState('top');
  const [horizontal, setHorizontal] = useState('center');
  return (
    <SnackbarProvider
      maxSnack={6}
      anchorOrigin={{
        vertical,
        horizontal,
      }}
    >
      <div style={{ color: '#666' }}>Vertical</div>
      <RadioGroup
        value={vertical}
        onChange={e => {
          setVertical(e.target.value);
        }}
      >
        <Radio value="top">Top</Radio>
        <Radio value="center">Center</Radio>
        <Radio value="bottom">Bottom</Radio>
      </RadioGroup>
      <div style={{ marginTop: 20, color: '#666' }}>Horizontal</div>
      <RadioGroup
        value={horizontal}
        onChange={e => {
          setHorizontal(e.target.value);
        }}
      >
        <Radio value="left">Left</Radio>
        <Radio value="center">Center</Radio>
        <Radio value="right">Right</Radio>
      </RadioGroup>

      <Message style={{ marginTop: 20 }} />
    </SnackbarProvider>
  );
}
```

## 自定义消息 Icon

```tsx
/**
 * title: 自定义消息
 * desc: 属性`icon`可以设置图标，会覆盖所有的`Snack`，设置为`false`隐藏图标，`iconMapping`可以设置不同消息类型的图标
 */

import React, { useEffect, useRef, useState } from 'react';
import { SnackbarProvider, useSnackbar, Button, Checkbox } from '@wowjoy/core';

function Message(props) {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  return (
    <Button
      onClick={() => {
        enqueueSnackbar(`Time: ${new Date().toLocaleString()}!`, {
          persist: true,
          severity: props.color,
        });
      }}
      {...props}
    >
      {props.children}
    </Button>
  );
}

export default function App() {
  const [icon, setIcon] = useState();
  const [iconMapping, setIconMapping] = useState();
  return (
    <SnackbarProvider maxSnack={10} icon={icon} iconMapping={iconMapping}>
      <Checkbox
        onChange={e => {
          if (e.target.checked) {
            setIcon(false);
          } else {
            setIcon();
          }
        }}
      >
        隐藏Icon
      </Checkbox>
      <Checkbox
        onChange={e => {
          if (e.target.checked) {
            setIconMapping({
              success: '✅',
              error: '✖️',
              warning: '⚠️',
              info: 'ℹ️',
            });
          } else {
            setIconMapping();
          }
        }}
      >
        使用Emojis
      </Checkbox>
      <br />
      <Message style={{ margin: 5 }} color="success">
        success
      </Message>
      <Message style={{ margin: 5 }} color="error">
        error
      </Message>
      <br />
      <Message style={{ margin: 5 }} color="warning">
        warning
      </Message>
      <Message style={{ margin: 5 }} color="info">
        info
      </Message>
      <Message style={{ margin: 5 }} color="question">
        question
      </Message>
    </SnackbarProvider>
  );
}
```

## 紧凑模式(dense)

```tsx
/**
 * title: dense设置紧凑模式
 */

import React, { useEffect, useRef, useState } from 'react';
import { SnackbarProvider, useSnackbar, Button, Checkbox } from '@wowjoy/core';

function Message(props) {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  return (
    <Button
      onClick={() => {
        enqueueSnackbar(`Time: ${new Date().toLocaleString()}!`, {
          persist: true,
          severity: props.color,
        });
      }}
      {...props}
    >
      {props.children}
    </Button>
  );
}

export default function App() {
  const [dense, setDense] = useState(false);
  return (
    <SnackbarProvider maxSnack={10} dense={dense}>
      <Checkbox
        onChange={e => {
          setDense(e.target.checked);
        }}
      >
        紧凑
      </Checkbox>
      <br />
      <Message style={{ margin: 5 }} color="success">
        message
      </Message>
    </SnackbarProvider>
  );
}
```

## 去重(preventDuplicate)

```tsx
/**
 * title: preventDuplicate防止重复消息
 */

import React, { useEffect, useRef, useState } from 'react';
import { SnackbarProvider, useSnackbar, Button, Checkbox } from '@wowjoy/core';

function Message(props) {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  return (
    <Button
      onClick={() => {
        enqueueSnackbar(`Time: ${new Date().toLocaleString()}!`, {
          persist: true,
          severity: props.color,
        });
      }}
      {...props}
    >
      {props.children}
    </Button>
  );
}

export default function App() {
  const [preventDuplicate, setPreventDuplicate] = useState(false);
  return (
    <SnackbarProvider maxSnack={10} preventDuplicate={preventDuplicate}>
      <Checkbox
        onChange={e => {
          setPreventDuplicate(e.target.checked);
        }}
      >
        去重
      </Checkbox>
      <br />
      <Message style={{ margin: 5 }} color="success">
        message
      </Message>
    </SnackbarProvider>
  );
}
```

## Alert 响应触发(action)

```tsx
/**
 * title: 可以设置`Alert`的`action`
 */

import React, { useEffect, useRef, useState } from 'react';
import { SnackbarProvider, useSnackbar, Button, Checkbox } from '@wowjoy/core';

function Message(props) {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  return (
    <Button
      onClick={() => {
        enqueueSnackbar(`Time: ${new Date().toLocaleString()}!`, {
          persist: true,
          severity: props.color,
        });
      }}
      {...props}
    >
      {props.children}
    </Button>
  );
}

export default function App() {
  const [preventDuplicate, setPreventDuplicate] = useState(false);
  const notistackRef = React.createRef();
  const notistackRef2 = React.createRef();
  return (
    <>
      <SnackbarProvider
        maxSnack={10}
        action={
          <Button
            style={{ height: 20 }}
            variant="text"
            color="error"
            onClick={() => alert('Hello')}
          >
            Alert
          </Button>
        }
      >
        <Message style={{ margin: 5 }} color="warning">
          Normal Action
        </Message>
      </SnackbarProvider>
      <SnackbarProvider
        ref={notistackRef}
        maxSnack={10}
        action={(key, message, options) => (
          <Button
            variant="text"
            color="error"
            style={{ height: 20 }}
            onClick={() => {
              notistackRef.current.closeSnackbar(key);
            }}
          >
            close
          </Button>
        )}
      >
        <Message style={{ margin: 5 }} color="info">
          Function Action
        </Message>
      </SnackbarProvider>
      <SnackbarProvider
        ref={notistackRef2}
        maxSnack={10}
        onClose={(key, message, options) => () => notistackRef2.current.closeSnackbar(key)}
      >
        <Message style={{ margin: 5 }} color="question">
          Alert onClose
        </Message>
      </SnackbarProvider>
    </>
  );
}
```

## 使用`enqueueSnackbar`单独设置

```tsx
/**
 * title: 单独配置
 * desc: 消息`enqueueSnackbar`的`options`优先级高于`SnackbarProvider`，`SnackbarProvider`所有属性都能在`options`设置, `key`和`persist`是`options`独有的
 */

import React, { useEffect, useRef, useState } from 'react';
import { SnackbarProvider, useSnackbar, Button, Checkbox } from '@wowjoy/core';

function Message(props) {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  return (
    <Button
      onClick={() => {
        enqueueSnackbar(`Time: ${new Date().toLocaleString()}!`, {
          persist: true,
          severity: 'info',
          action: key => (
            <Button
              color="primary"
              style={{ height: 20 }}
              onClick={() => {
                closeSnackbar(key);
              }}
            >
              close
            </Button>
          ),
        });
      }}
      {...props}
    >
      {props.children}
    </Button>
  );
}

export default function App() {
  const [preventDuplicate, setPreventDuplicate] = useState(false);
  const notistackRef = React.createRef();
  return (
    <>
      <SnackbarProvider
        ref={notistackRef}
        maxSnack={10}
        action={(key, message, options) => (
          <Button
            variant="text"
            color="error"
            style={{ height: 20 }}
            onClick={() => {
              notistackRef.current.closeSnackbar(key);
            }}
          >
            Options 配置
          </Button>
        )}
      >
        <Message style={{ margin: 5 }} color="success">
          Function Action
        </Message>
      </SnackbarProvider>
    </>
  );
}
```

## `enqueueSnackbar`返回值 key

```tsx
/**
 * title: 方法`enqueueSnackbar`会返回当前`snackbar`的`key`值
 * desc: 可以单独获取`key`关闭
 */

import React, { useEffect, useRef, useState } from 'react';
import { SnackbarProvider, useSnackbar, Button, Checkbox } from '@wowjoy/core';

function Message(props) {
  const [key, setKey] = useState();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  return (
    <>
      <Button
        style={{ marginRight: 20 }}
        disabled={key}
        onClick={() => {
          setKey(
            enqueueSnackbar(`Time: ${new Date().toLocaleString()}!`, {
              persist: true,
              severity: 'info',
            }),
          );
        }}
        color="error"
      >
        Simulate connection loss
      </Button>
      <Button
        disabled={!key}
        onClick={() => {
          setKey();
          closeSnackbar(key);
        }}
        color="success"
      >
        Back Online
      </Button>
    </>
  );
}

export default function App() {
  const [preventDuplicate, setPreventDuplicate] = useState(false);
  const notistackRef = React.createRef();
  return (
    <>
      <SnackbarProvider ref={notistackRef} maxSnack={10}>
        <Message style={{ margin: 5 }} />
      </SnackbarProvider>
    </>
  );
}
```

## `Persist`持久

```tsx
/**
 * title: 持久显示
 * desc: 属性`Persist`并不会关闭`snackbar`，你只能通过手动关闭
 */

import React, { useEffect, useRef, useState } from 'react';
import { SnackbarProvider, useSnackbar, Button, Checkbox } from '@wowjoy/core';

function Message(props) {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  return (
    <>
      <Button
        style={{ marginRight: 20 }}
        variant="outlined"
        color="info"
        onClick={() => {
          enqueueSnackbar(`Time: ${new Date().toLocaleString()}!`, {
            persist: true,
            severity: 'info',
            onClose: key => () => closeSnackbar(key),
          });
        }}
      >
        Persist
      </Button>
      <Button
        variant="outlined"
        color="info"
        onClick={() => {
          enqueueSnackbar(`Time: ${new Date().toLocaleString()}!`, {
            persist: false,
            severity: 'success',
          });
        }}
      >
        Normal
      </Button>
    </>
  );
}

export default function App() {
  const [preventDuplicate, setPreventDuplicate] = useState(false);
  const notistackRef = React.createRef();
  return (
    <>
      <SnackbarProvider ref={notistackRef} maxSnack={10}>
        <Message style={{ margin: 5 }} />
      </SnackbarProvider>
    </>
  );
}
```

## 自定义`Snackbar`内容

```tsx
/**
 * title: 可以通过过`content`自定义`Snackbar`内容
 * desc: 默认使用的`Alert`
 */

import React, { useEffect, useRef, useState } from 'react';
import { SnackbarProvider, useSnackbar, Button, Checkbox } from '@wowjoy/core';

function Message(props) {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  return (
    <>
      <Button
        style={{ marginRight: 20 }}
        variant="outlined"
        color="info"
        onClick={() => {
          enqueueSnackbar(`Time: ${new Date().toLocaleString()}!`);
        }}
      >
        SnackbarProvider自定义
      </Button>
      <Button
        variant="outlined"
        color="info"
        onClick={() => {
          enqueueSnackbar(`Time: ${new Date().toLocaleString()}!`, {
            content: (key, message) => (
              <div style={{ border: '1px solid green', color: 'green' }}>{message}</div>
            ),
          });
        }}
      >
        Options自定义
      </Button>
    </>
  );
}

export default function App() {
  const [preventDuplicate, setPreventDuplicate] = useState(false);
  const notistackRef = React.createRef();
  return (
    <>
      <SnackbarProvider
        ref={notistackRef}
        maxSnack={10}
        content={(key, message) => <div style={{ color: 'red' }}>{message}</div>}
      >
        <Message style={{ margin: 5 }} />
      </SnackbarProvider>
    </>
  );
}
```

## 消息挂载位置

```tsx
/**
 * title: domRoot 消息挂载位置
 * desc: 默认挂载在当前`SnackbarProvider`
 */

import React, { useEffect, useRef, useState } from 'react';
import { SnackbarProvider, useSnackbar, Button, Checkbox } from '@wowjoy/core';

function Message(props) {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  return (
    <Button
      variant="outlined"
      color="info"
      onClick={() => {
        enqueueSnackbar(`Time: ${new Date().toLocaleString()}!`);
      }}
    >
      Render at body
    </Button>
  );
}

export default function App() {
  return (
    <>
      <SnackbarProvider maxSnack={10} domRoot={document.body}>
        <Message style={{ margin: 5 }} />
      </SnackbarProvider>
    </>
  );
}
```

# API

## 共有属性

> `SnackbarProvider Props` 和 `enqueueSnackbar options`公共的部分，继承[Alert](/core/lab/alert)

| 参数 | 说明 | 类型 | 默认值 |
| :-- | :-- | :-- | :-- |
| autoHideDuration | 显示时长(毫秒) | number | 3000 |
| preventDuplicate | 消息去重 | boolean | false |
| action | `Alert` 的 `action` | React.ReactNode \| ((key: SnackbarKey, message: SnackbarMessage, options: OptionsObject) => React.ReactNode) | 6 |
| onClose | `Alert` 的 `onClose` | (key: SnackbarKey,message: SnackbarMessage,options: OptionsObject) => AlertProps['onClose'] |  |
| content | 自定义消息条 | React.ReactNode \| (key: SnackbarKey, message: SnackbarMessage) => React.ReactNode | Alert |

## SnackbarProvider Props

| 参数         | 说明         | 类型         | 默认值                                  |
| :----------- | :----------- | :----------- | :-------------------------------------- |
| dense        | 紧凑模式     | boolean      | false                                   |
| domRoot      | 消息挂载位置 | HTMLElement  |                                         |
| maxSnack     | 消息显示数量 | number       | 6                                       |
| anchorOrigin | 消息位置     | AnchorOrigin | {vertical: 'top', horizontal: 'center'} |

### AnchorOrigin

```
interface AnchorOrigin {
  vertical: 'top' | 'center' | 'bottom';
  horizontal: 'left' | 'center' | 'right';
}

type SnackbarKey = number | string;
type SnackbarMessage = string | React.ReactNode;
```

## enqueueSnackbar _options_

| 参数    | 说明                           | 类型    | 默认值     |
| :------ | :----------------------------- | :------ | :--------- |
| key     | 消息的唯一标识                 | any     | Date.now() |
| persist | 除非主动关闭，否则消息一直存在 | boolean | false      |
