import React from 'react';
import { Loading } from '@wowjoy/icons';
import styled from '@wowjoy/styled';
import clsx from 'clsx';
import TimelineItem, { TimeLineItemProps } from './TimelineItem';

const TimelineBox = styled.ul`
  box-sizing: border-box;
  color: rgba(0, 0, 0, 0.85);
  font-size: 14px;
  line-height: 1.57;
  margin: 0;
  padding: 0;
  list-style: none;
  li:last-child {
    .timeline-item-tail {
      display: none;
    }
  }
  &&.wowjoy-timeline-right {
    .timeline-item-tail {
      left: 100%;
    }
    .timeline-item-head {
      left: 100%;
      margin-left: -4px;
    }
    .timeline-item-content {
      width: calc(100% - 12px);
      margin: 0;
      text-align: right;
    }
  }
  &&.wowjoy-timeline-hasLabel,
  &&.wowjoy-timeline-alternate {
    .wowjoy-timeline-item-left {
      .timeline-item-babel {
        position: absolute;
        top: -7px;
        width: calc(50% - 12px);
        text-align: right;
      }
      .timeline-item-tail {
        left: 50%;
      }
      .timeline-item-head {
        left: 50%;
        margin-left: -4px;
      }
      .timeline-item-content {
        left: calc(50% - 4px);
        width: calc(50% - 14px);
        text-align: left;
      }
    }
    .wowjoy-timeline-item-right {
      .timeline-item-babel {
        position: absolute;
        top: -7px;
        left: calc(50% + 14px);
        width: calc(50% - 14px);
        text-align: left;
      }
      .timeline-item-tail {
        left: 50%;
      }
      .timeline-item-head {
        left: 50%;
        margin-left: -4px;
      }
      .timeline-item-content {
        width: calc(50% - 12px);
        margin: 0;
        text-align: right;
      }
    }
  }
`;

export interface TimelineProps {
  className?: string;
  pending?: React.ReactNode;
  pendingDot?: React.ReactNode;
  style?: React.CSSProperties;
  reverse?: boolean;
  mode?: 'left' | 'alternate' | 'right';
}
interface TimelineType extends React.FC<TimelineProps> {
  Item: React.FC<TimeLineItemProps>;
}

const Timeline: TimelineType = ({
  children,
  className,
  pending = null,
  pendingDot,
  reverse,
  mode,
  ...restProps
}) => {
  const pendingNode = typeof pending === 'boolean' ? null : pending;
  const getPositionCls = (ele: React.ReactElement<any>, idx: number) => {
    //  自身的设置position,优先级更高
    if (ele.props.position === 'right') return `right`;
    if (ele.props.position === 'left') return `left`;
    if (mode === 'alternate') {
      return idx % 2 === 0 ? `left` : `right`;
    }
    if (mode === 'left') return `left`;
    if (mode === 'right') return `right`;
    return '';
  };
  const pendingItem = pending ? (
    <TimelineItem
      pending={!!pending}
      dot={pendingDot || <Loading color={'#53BDE7'} className={'loadingPending'} />}
    >
      {pendingNode}
    </TimelineItem>
  ) : null;
  const timeLineItems = reverse
    ? [pendingItem, ...React.Children.toArray(children).reverse()]
    : [...React.Children.toArray(children), pendingItem];
  const truthyItems = timeLineItems.filter(item => !!item);
  const hasLabelItem = truthyItems.some((item: React.ReactElement<any>) => !!item?.props?.label);

  const items = React.Children.map(truthyItems, (ele: React.ReactElement<any>, idx) => {
    return React.cloneElement(ele, {
      className: clsx(ele.props.className, 'wowjoy-timeline-item-' + getPositionCls(ele, idx)),
      position: getPositionCls(ele, idx),
    });
  });

  return (
    <TimelineBox
      {...restProps}
      className={clsx(
        className,
        hasLabelItem && 'wowjoy-timeline-hasLabel',
        !hasLabelItem && !!mode && `wowjoy-timeline-${mode}`,
      )}
    >
      {items}
    </TimelineBox>
  );
};

Timeline.Item = TimelineItem;

export default Timeline;
