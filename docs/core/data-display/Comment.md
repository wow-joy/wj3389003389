---
group:
  title: Data Display 数据展示
title: Comment 评论
---

# Comment 评论

## 基本使用

```jsx

/**
 * title: 基本使用
 * desc: 基本的评论。
 */
import React from 'react';
import { Comment, Tooltip } from '@wowjoy/core';

export default  () => {
 
  const actions = [
    <span key="comment-basic-reply-to">Reply to</span>,
  ];

  return (
    <Comment
      actions={actions}
      author={<a>小新</a>}
      avatar={"https://s3.ax1x.com/2021/01/28/y9MHMt.jpg"}
      content={
        <p>
          小新：有酱油卖吗？ 鱼铺老板：没有。 小新：有芥末卖吗？ 鱼铺老板：没有。 小新：什么都没有还敢开店。
        </p>
      }
      datetime={
        <span>2021-01-28 16:20:54</span>
      }
    />
  );
};
```

## 嵌套评论

```jsx

/**
 * title: 嵌套评论
 * desc: 评论可以嵌套。
 */
import React from 'react';
import { Comment } from '@wowjoy/core';

const ExampleComment = ({ children }) => (
  <Comment
    actions={[<span key="comment-nested-reply-to">Reply to</span>]}
    author={<a>小新</a>}
    avatar={"https://s3.ax1x.com/2021/01/28/y9MHMt.jpg"}
    content={
      <p>
        小新：有酱油卖吗？ 鱼铺老板：没有。 小新：有芥末卖吗？ 鱼铺老板：没有。 小新：什么都没有还敢开店。
      </p>
    }
  >
    {children}
  </Comment>
);

export default () => {
  return (
    <ExampleComment>
      <ExampleComment>
        <ExampleComment />
        <ExampleComment />
      </ExampleComment>
    </ExampleComment>
  );
}
```

## API

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| actions | 在评论内容下面呈现的操作项列表 | Array&lt;ReactNode> | - |  |
| author | 要显示为注释作者的元素 | ReactNode | - |  |
| avatar | 要显示为评论头像的元素 - 通常是 antd Avatar 或者 src | ReactNode | - |  |
| children | 嵌套注释应作为注释的子项提供 | ReactNode | - |  |
| content | 评论的主要内容 | ReactNode | - |  |
| datetime | 展示时间描述 | ReactNode | - |  |
