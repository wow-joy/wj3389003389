import React from 'react';
import styled from '@wowjoy/styled';
import { validProgress } from './utils';
import { ProgressProps, StatusColor, TrailColor } from './index';
import { CheckCircle, CloseCircle } from '@wowjoy/icons';
import clsx from 'clsx';

const SizeWidth = {
  large: 16,
  default: 8,
  small: 4,
};

export interface LineProps extends ProgressProps {
  textFormatter?: (percent?: number) => React.ReactNode;
}

const ProgressLineWrap = styled.div<{ small?: boolean }>`
  display: inline-block;
  position: relative;
  width: 100%;
  margin-right: 8px;
  margin-bottom: 8px;
  ${p => p.small && 'line-height: 1em;'}
  .no-padding {
    padding-right: 0;
  }
  svg {
    width: 2em;
    margin-left: 8px;
    vertical-align: middle;
  }
`;
const ProgressLineOuter = styled.div`
  position: relative;
  display: inline-block;
  width: 100%;
  margin-right: calc(-2em - 8px);
  padding-right: calc(2em + 8px);
`;
const ProgressLineInner = styled.div`
  display: inline-block;
  width: 100%;
  vertical-align: middle;
  background-color: ${() => TrailColor};
  border-radius: 100px;
  overflow: hidden;
  .wowjoy-progress-active::before {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: #fff;
    border-radius: 10px;
    opacity: 0;
    animation: wowjoy-progress-active-animation 2.4s cubic-bezier(0.23, 1, 0.32, 1) infinite;
    content: '';
  }
  @keyframes wowjoy-progress-active-animation {
    0% {
      width: 0;
      opacity: 0.1;
    }
    20% {
      width: 0;
      opacity: 0.5;
    }
    100% {
      width: 100%;
      opacity: 0;
    }
  }
`;
const ProgressLine = styled.div<{ h?: number; w: number; bg?: string }>`
  position: relative;
  border-radius: 100px;
  height: ${p => p.h}px;
  width: ${p => p.w}%;
  background-color: ${() => StatusColor['normal']};
  ${p => p.bg}
  overflow: hidden;
  line-height: 1;
  .inner-info {
    color: #fff;
    float: right;
    margin-right: 8px;
    height: 100%;
    line-height: 1.1em;
  }
  .full-inner-info {
    margin-right: 18px;
  }
`;
const Value = styled.span`
  display: inline-block;
  width: 2em;
  margin-left: 8px;
  color: rgba(0, 0, 0, 0.45);
  font-size: 1em;
  line-height: 1em;
  white-space: nowrap;
  text-align: left;
  vertical-align: middle;
  word-break: normal;
`;
const SuccessCheckCircle = styled(CheckCircle)`
  color: ${() => StatusColor['success']};
`;
const ExceptionCheckCircle = styled(CloseCircle)`
  color: ${() => StatusColor['exception']};
`;

const Line: React.FC<LineProps> = ({
  percent = 0,
  color,
  strokeWidth,
  showInfo = true,
  textFormatter,
  status = 'normal',
  size = 'default',
  showInnerInfo = false,
}) => {
  const value = validProgress(percent);
  let bg = '';
  if (typeof color === 'string') {
    bg = `background-color:${color};`;
  } else if (typeof color === 'object') {
    bg = `background-image: linear-gradient(${color.direction || 'to right'}, ${color.from ||
      color['0%']}, ${color.to || color['100%']});`;
  } else if (status === 'success') {
    bg = `background-color:${StatusColor['success']};`;
  } else if (status === 'exception') {
    bg = `background-color:${StatusColor['exception']};`;
  } else if (status === 'active') {
    bg = `background-color:${StatusColor['active']};`;
  }

  const height = strokeWidth || SizeWidth[size] || 8;
  // 判断是否需要在线条上展示信息, showInfo 为false 都不展示
  const needInnerShow = showInnerInfo && height >= 16;
  return (
    <ProgressLineWrap small={size === 'small'}>
      <ProgressLineOuter className={clsx(!showInfo && 'no-padding')}>
        <ProgressLineInner>
          <ProgressLine w={value} bg={bg} h={height} className={`wowjoy-progress-${status}`}>
            {showInfo && needInnerShow && (
              <Value className={clsx('inner-info', value === 100 && 'full-inner-info')}>
                {textFormatter(value)}
              </Value>
            )}
          </ProgressLine>
        </ProgressLineInner>
      </ProgressLineOuter>
      {showInfo && !needInnerShow && (status === 'normal' || status === 'active') && (
        <Value>{textFormatter(value)}</Value>
      )}
      {showInfo && !needInnerShow && status === 'success' && <SuccessCheckCircle />}
      {showInfo && !needInnerShow && status === 'exception' && <ExceptionCheckCircle />}
    </ProgressLineWrap>
  );
};

export default Line;
