import React from 'react';
import Line from './Line';
import Circle from './Circle';
type Gradient = { from?: string; to?: string; direction?: string };

export const StatusColor = {
  success: '#4ACFB1',
  exception: '#F36969',
  normal: '#53BDE7',
  active: '#53BDE7',
};
export const TrailColor = '#f5f5f5';

export interface ProgressProps {
  type?: 'line' | 'circle' | 'dashboard';
  percent: number;
  color?: string | Gradient | any;
  strokeWidth?: number;
  showInfo?: boolean;
  // showInnerInfo 信息展示在线条之上,线条较宽时可以使用
  showInnerInfo?: boolean;
  format?: (percent?: number) => React.ReactNode;
  status?: 'success' | 'exception' | 'normal' | 'active';
  size?: 'small' | 'default' | 'large';
  gapDegree?: number;
  gapPosition?: 'top' | 'bottom' | 'left' | 'right';
}
const Progress: React.FC<ProgressProps> = ({ type = 'line', format, ...restProps }) => {
  const textFormatter = format || (percent => `${percent}%`);
  if (type === 'line') {
    return <Line {...restProps} textFormatter={textFormatter}></Line>;
  } else if (type === 'circle' || type === 'dashboard') {
    return <Circle {...restProps} textFormatter={textFormatter} type={type}></Circle>;
  } else {
    return <></>;
  }
};

export default Progress;
