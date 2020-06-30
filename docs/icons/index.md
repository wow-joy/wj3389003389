---
title: 图标
sidemenu: false
---

## 安装

```
yarn add @wowjoy/core
```

## 自定义图标

```js
import createSvgIcon from '@wowjoy/icons/utils/createSvgIcon';
export default createSvgIcon(
  <React.Fragment>
    <path d=""></path>
  </React.Fragment>,
  'IconDisplayName',
);
```

```tsx
/**
 * inline: true
 */
import React from 'react';
import * as Icons from '@wowjoy/icons';
import styled from 'styled-components';

const Wrap = styled.div`
  margin: 40px;
  line-height: 40px;
`;

const Item = styled.div<{ [key: string]: any }>`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 30px;
  position: relative;
  :hover {
    background: #1890ff;
    color: white;
  }
  svg {
    font-size: 2em;
    transition: transform 0.3s;
    &:hover {
      transform: scale(1.2, 1.2);
    }
  }
  span {
    font-size: 12px;
  }
  &:after {
    content: 'Copied!';
    opacity: 0;
    position: absolute;
    top: 10px;
    left: 0;
    height: 100%;
    width: 100%;
    color: #fff;
    font-size: 12px;
    text-align: center;
    line-height: 100px;
    background: rgba(255, 255, 255, 0.1);
    transition: all 0.5s cubic-bezier(0.18, 0.89, 0.32, 1.28);
    ${p => p.flag && `top: 0px;opacity: 1;`}
  }
`;

function IconWrap({ onClick, ...props }: { [key: string]: any }) {
  const [flag, setFlag] = React.useState(false);
  const copy = () => {
    setFlag(true);
    onClick();
  };
  const handleTransitionEnd = (e: any) => {
    setFlag(false);
  };
  return <Item flag={flag} onTransitionEnd={handleTransitionEnd} onClick={copy} {...props} />;
}

function IconList() {
  const copy = (key: string) => (e: any) => {
    const input = document.createElement('input');
    input.value = key;
    document.body.appendChild(input);
    input.select();
    document.execCommand('copy');
    document.body.removeChild(input);
  };
  return (
    <Wrap>
      {Object.entries(Icons).map((value, index) => {
        const [key, Icon] = value;
        if (key === 'SvgIcon') {
          return null;
        }
        return (
          <IconWrap onClick={copy(key)}>
            <Icon key={key} data-icon={key} />
            <span>{key}</span>
          </IconWrap>
        );
      })}
    </Wrap>
  );
}
export default IconList;
```
