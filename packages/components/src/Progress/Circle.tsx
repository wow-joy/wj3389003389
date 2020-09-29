import React from 'react';
import styled from '@wowjoy/styled';
import { validProgress, getPathStyles, stripPercentToNumber } from './utils';
import { ProgressProps, StatusColor, TrailColor } from './index';
import { Check, Close } from '@wowjoy/icons';

var gradientSeed = 0;

const CircleBox = styled.div<{ width?: number }>`
  display: inline-block;
  margin-right: 8px;
  margin-bottom: 8px;
  width: ${p => (p.width ? `${p.width}px` : '128px')};
`;
const CircleWrap = styled.div`
  position: relative;
  overflow: hidden;
  vertical-align: middle;
`;
const CircleSpan = styled.span`
  vertical-align: middle;
  word-break: normal;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  margin: 0;
  padding: 0;
  color: rgba(0, 0, 0, 0.85);
  font-size: 1.6em;
  line-height: 1;
  white-space: normal;
  text-align: center;
  transform: translate(-50%, -50%);
`;
const SuccessCheck = styled(Check)`
  color: ${() => StatusColor['success']};
`;
const ExceptionCheck = styled(Close)`
  color: ${() => StatusColor['exception']};
`;

export interface CircleProps extends ProgressProps {
  textFormatter?: (percent?: number) => React.ReactNode;
  width?: number;
}
function toArray(symArray) {
  return Array.isArray(symArray) ? symArray : [symArray];
}

const Circle: React.FC<CircleProps> = ({
  percent = 0,
  color,
  strokeWidth = 4,
  showInfo = true,
  textFormatter,
  status = 'normal',
  width,
  gapDegree,
  gapPosition,
  type,
}) => {
  const gradientId = React.useMemo(function() {
    gradientSeed += 1;
    return gradientSeed;
  }, []);
  const getGapDegree = () => {
    if (gapDegree || gapDegree === 0) {
      return gapDegree;
    }
    if (type === 'dashboard') {
      return 75;
    }
    return undefined;
  };
  const gapPos = gapPosition || (type === 'dashboard' && 'bottom') || 'top';
  const value = validProgress(percent);

  let gradient = null,
    renderColor = null;

  if (typeof color === 'object') {
    gradient = color;
    renderColor = color;
  } else if (typeof color === 'string') {
    renderColor = color;
  } else if (status === 'success') {
    renderColor = StatusColor['success'];
  } else if (status === 'exception') {
    renderColor = StatusColor['exception'];
  }

  let { pathString, pathStyle } = getPathStyles(
    0,
    100,
    TrailColor,
    strokeWidth,
    getGapDegree(),
    gapPos,
  );
  let { pathString: percentPathString, pathStyle: percentPathStyle } = getPathStyles(
    0,
    percent,
    renderColor || StatusColor['normal'],
    strokeWidth,
    getGapDegree(),
    gapPos,
  );

  const svg = (
    <svg className="className" viewBox="0 0 100 100">
      {gradient && (
        <defs>
          <linearGradient
            id={`wowjoy-progress-gradient-${gradientId}`}
            x1="100%"
            y1="0%"
            x2="0%"
            y2="0%"
          >
            {Object.keys(gradient)
              .sort(function(a, b) {
                return stripPercentToNumber(a) - stripPercentToNumber(b);
              })
              .map((key, index) => {
                return <stop key={index} offset={key} stopColor={gradient[key]}></stop>;
              })}
          </linearGradient>
        </defs>
      )}
      <path
        className="wowjoy-progress-circle-trail"
        d={pathString}
        stroke={TrailColor}
        strokeLinecap="round"
        strokeWidth={strokeWidth}
        fillOpacity="0"
        style={pathStyle}
      ></path>
      <path
        className="wowjoy-progress-circle-path"
        d={percentPathString}
        stroke={gradient ? `url(#wowjoy-progress-gradient-${gradientId})` : ''}
        strokeLinecap="round"
        strokeWidth={strokeWidth}
        fillOpacity="0"
        style={percentPathStyle}
      ></path>
    </svg>
  );

  return (
    <CircleBox className="wowjoy-progress-circle" width={width}>
      <CircleWrap>
        {svg}
        {showInfo && (status === 'normal' || status === 'active') && (
          <CircleSpan>{textFormatter(value)}</CircleSpan>
        )}
        {showInfo && status === 'success' && (
          <CircleSpan>
            <SuccessCheck />
          </CircleSpan>
        )}
        {showInfo && status === 'exception' && (
          <CircleSpan>
            <ExceptionCheck />
          </CircleSpan>
        )}
      </CircleWrap>
    </CircleBox>
  );
};

export default Circle;
