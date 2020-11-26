import * as React from 'react';
import styled from '@wowjoy/styled';
import clsx from 'clsx';

export const Color = {
  success: '#4ACFB1',
  exception: '#F36969',
  normal: '#53BDE7',
  gray: '#00000040',
};
const Item = styled.li`
  position: relative;
  margin: 0;
  padding-bottom: 20px;
  font-size: 14px;
  list-style: none;
  .pending-dot {
    position: absolute;
    top: 5.5px;
    left: 5px;
    width: auto;
    height: auto;
    margin-top: 0;
    padding: 1px 1px;
    line-height: 1;
    text-align: center;
    border: 0;
    border-radius: 0;
    transform: translate(-50%, -50%);
  }
`;
const ItemLabel = styled.div`
  position: absolute;
  top: -7px;
  width: calc(50% - 12px);
  text-align: right;
`;
const ItemTail = styled.div`
  position: absolute;
  top: 10px;
  left: 4px;
  height: calc(100% - 10px);
  border-left: 2px solid #f0f0f0;
`;
const ItemHead = styled.div<{ color: string }>`
  position: absolute;
  width: 10px;
  height: 10px;
  background-color: #fff;
  border: 2px solid transparent;
  border-radius: 100px;
  ${p =>
    p.color
      ? `color: ${p.color};
    border-color: ${p.color};`
      : ''}
`;
const ItemContent = styled.div`
  position: relative;
  top: -7px;
  margin: 0 0 0 26px;
  word-break: break-word;
`;
const PendingBox = styled.span`
  display: inline-block;
  .loadingPending {
    animation: loadingCircle 1s linear infinite;
    @keyframes loadingCircle {
      100% {
        transform: rotate(360deg);
      }
    }
  }
`;

export interface TimeLineItemProps {
  className?: string;
  color?: string;
  dot?: React.ReactNode;
  pending?: boolean;
  position?: string;
  label?: React.ReactNode;
}

const TimelineItem: React.FC<TimeLineItemProps> = ({
  className,
  color,
  label,
  children,
  dot,
  pending,
  position,
}) => {
  return (
    <Item className={className}>
      {label && <ItemLabel className={clsx('timeline-item-babel')}>{label}</ItemLabel>}
      <ItemTail className={clsx('timeline-item-tail')}></ItemTail>
      <ItemHead
        color={Color[color] ? Color[color] : (color || (pending ? null : Color['normal']))}
        className={clsx('timeline-item-head', pending && 'pending-dot', dot && 'pending-dot')}
      >
        {pending ? <PendingBox>{dot}</PendingBox> : dot}
      </ItemHead>
      <ItemContent className={clsx('timeline-item-content')}>{children}</ItemContent>
    </Item>
  );
};

export default TimelineItem;
