---
group:
  title: Layout 布局
title: Divider 分割线
---

# Divider 分割线

## 简单的分割线

```tsx

import React from 'react';
import styled from '@wowjoy/styled';

const P = styled.p`
 margin-bottom: 0
`

const Space = () => <div style={{ marginTop: 5 }}></div>;
import { Divider } from '@wowjoy/core';

export default ()=>{
  const [type, setType] = React.useState("horizontal");
  return(
    <>
      <span>111111</span>
      <Divider dashed={true}>Text</Divider>
      <span>222222</span>
      <Divider/>
      <span>333333</span>
    </>
  )
}
