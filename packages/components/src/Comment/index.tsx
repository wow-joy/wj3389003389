import * as React from 'react';
import styled from '@wowjoy/styled';

const CommentBox = styled.div`
  position: relative;
  background-color: @comment-bg;
`;

const CommentInner = styled.div`
  display: flex;
  padding: 16px 0;
`;

const Avatar = styled.div`
  position: relative;
  flex-shrink: 0;
  margin-right: 12px;
  cursor: pointer;
  img {
    width: 32px;
    height: 32px;
    border-radius: 50%;
  }
`;

const Content = styled.div`
  position: relative;
  flex: 1 1 auto;
  min-width: 1px;
  font-size: 14px;
  word-wrap: break-word;
`;

const AuthorContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin-bottom: 4px;
  span {
    padding-right: 8px;
    font-size: 12px;
    line-height: 18px;
  }
`;

const AuthorContentName = styled.span`
  color: rgba(0, 0, 0, 0.45);
  transition: color 0.3s;
`;

const AuthorContentTime = styled.span`
  color: #ccc;
  white-space: nowrap;
  cursor: auto;
`;

const ContentDetail = styled.div`
  p {
    margin-bottom: inherit;
    white-space: pre-wrap;
  }
`;

const Actions = styled.ul`
  margin-top: 12px;
  margin-bottom: inherit;
  padding-left: 0;
  list-style: none;
  li {
    display: inline-block;
    color: rgba(0, 0, 0, 0.45);
  }
`;

const NestedChildren = styled.div`
  margin-left: 44px;
`;

export interface CommentProps {
  actions?: Array<React.ReactNode>;
  author?: React.ReactNode;
  avatar?: React.ReactNode;
  className?: string;
  content: React.ReactNode;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  datetime?: React.ReactNode;
}

const Comment: React.FC<CommentProps> = ({
  actions,
  author,
  avatar,
  children,
  className,
  content,
  datetime,
  ...otherProps
}) => {
  
  const authorContent = (author || datetime) && (
    <AuthorContent>
      {author && <AuthorContentName>{author}</AuthorContentName>}
      {datetime && <AuthorContentTime>{datetime}</AuthorContentTime>}
    </AuthorContent>
  );

  const actionDom =
    actions && actions.length ? (
      <Actions>
        {actions.map((action, index) => (
          <li key={`action-${index}`}>{action}</li> // eslint-disable-line react/no-array-index-key
        ))}
      </Actions>
    ) : null;

  const contentDom = (
    <Content>
      {authorContent}
      <ContentDetail>{content}</ContentDetail>
      {actionDom}
    </Content>
  );

  const renderNested = (nestedChildren: any) => <NestedChildren>{nestedChildren}</NestedChildren>;

  return (
    <CommentBox {...otherProps} className={className}>
      <CommentInner>
        {avatar ? (
          <Avatar>
            {typeof avatar === 'string' ? <img src={avatar} alt="comment-avatar" /> : avatar}
          </Avatar>
        ) : null}
        {contentDom}
      </CommentInner>
      {children ? renderNested(children) : null}
    </CommentBox>
  );
};

export default Comment;
