import React from 'react';
import styled from '@wowjoy/styled';
import classNames from 'classnames';



const Line = styled.div<{
  type: string;
}>`
  display: ${ p => p.type === 'vertical' ? 'inline-block' : 'block'};
  .wowjoy-divider-horizontal{
    display: flex;
    clear: both;
    width: 100%;
    min-width: 100%;
    margin: 24px 0;
    border-top: 1px solid #999;
  }
  .wowjoy-divider-vertical {
    position: relative;
    top: -0.06em;
    display: inline-block;
    height: 0.9em;
    margin: 0 8px;
    vertical-align: middle;
    border-top: 0;
    border-left: 1px solid #999;
  }
  .wowjoy-divider-horizontal.wowjoy-divider-with-text {
    display: flex;
    margin: 16px 0;
    color: #333;
    font-weight: 500;
    font-size: 16px;
    white-space: nowrap;
    text-align: center;
    border-top: 0;
    &::before,
    &::after {
      position: relative;
      top: 50%;
      width: 50%;
      border-top: 1px solid #999;
      transform: translateY(50%);
      content: '';
    }
  }
  .wowjoy-divider-horizontal.wowjoy-divider-with-text-left {
    &::before {
      top: 50%;
      width: 5%;
    }
    &::after {
      top: 50%;
      width: 95%;
    }
  }
  .wowjoy-divider-horizontal.wowjoy-divider-with-text-right {
    &::before {
      top: 50%;
      width: 95%;
    }
    &::after {
      top: 50%;
      width: 5%;
    }
  }
  .wowjoy-divider-inner-text {
    display: inline-block;
    padding: 0 1em;
  }
  .wowjoy-divider-dashed {
    background: none;
    border-color: #999;
    border-style: dashed;
    border-width: 1px 0 0;
  }
  .wowjoy-divider-vertical.wowjoy-divider-dashed {
    border-width: 0 0 0 1px;
  }
  
`

export interface Props extends React.HTMLAttributes<HTMLElement> {
  dashed?: boolean;
  type?: string;
  text?: React.ReactNode;
  orientation?: 'left' | 'right' | 'center';
  className?: string;
}

const Divider = React.forwardRef<any, Props>(
  ({ dashed = false, type = 'horizontal',orientation = 'center', className, text, ...restProps }, ref) => {
    const prefixCls = 'wowjoy-divider';
    const orientationPrefix = orientation.length > 0 ? `-${orientation}` : orientation;
    const hasChildren = !!text;
    const classString = classNames(
      `${prefixCls}-${type === 'vertical' ? 'vertical' : 'horizontal'}`,
      {
        [`${prefixCls}-with-text`]: hasChildren,
        [`${prefixCls}-with-text${orientationPrefix}`]: hasChildren,
        [`${prefixCls}-dashed`]: !!dashed,
      },
      className
    )

    return (
      <Line type = {type}>
        <div className={classString} {...restProps}>
        {text && <span className={`${prefixCls}-inner-text`}>{text}</span>}
      </div>

      </Line>
      
    );
  },
);

export default Divider;
