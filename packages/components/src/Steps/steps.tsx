
import React, { FC, useEffect, useState, ReactDOM } from 'react';
import styled, { useWowTheme, withWowTheme } from '@wowjoy/styled';
import { CheckCircle } from '@wowjoy/icons';
import { initial } from 'lodash';

const StepsBox = styled.div<any>`
  height: ${p => (p.size === 'small' ? '18px' : '24px')};
  width: 100%;
  display: flex;
  justify-content: space-between;
`;
const LastStepIcon = styled(CheckCircle)<any>`
  width: 24px;
  height: 24px;
  margin-bottom: 10px;
  color: ${p =>
    p.status === 'future' ? p.theme.palette.grey.borderColor : p.theme.palette.primary.main};
`;
const StepBox = styled.div<any>`
  display: flex;
  width: ${p =>
    p.idx === 0 ? (p.size === 'small' ? '18px' : '24px') : 100 / (p.length - 1) + '%'};

  .StepLine {
    display: inline-block;
    height: 2px;
    flex: 1;
    background: ${p =>
      p.status === 'future' ? p.theme.palette.grey.borderColor : p.theme.palette.primary.main};
    margin: 0 10px;
    transform: ${p => (p.size === 'small' ? 'translateY(12px)' : 'translateY(8px)')};
  }
`;
const StepCircle = styled.div<any>`
  width: ${p => (p.size === 'small' ? '18px' : '24px')};
  position: relative;
  cursor: ${p => p.haveOnChange ?(p.status === 'now' ? 'initial' : 'pointer') : initial};
  .Step {
    width: ${p => (p.size === 'small' ? '18px' : '24px')};
    height: ${p => (p.size === 'small' ? '18px' : '24px')};
    background: ${p =>
      p.status === 'future' ? p.theme.palette.background.default : p.theme.palette.primary.main};
    border-radius: 50%;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${p =>
      p.status === 'future'
        ? p.theme.palette.grey.borderColor
        : p.theme.palette.primary.contrastText};
    margin-bottom: 10px;
    border: ${p => (p.status === 'future' ? '1px solid' + p.theme.palette.grey.borderColor : 0)};
   
  }
  .StepText {
    display: block;
    white-space: nowrap;
    font-weight: 400;
    font-size: ${p => (p.size === 'small' ? p.theme.typography.body2.fontSize :   p.theme.typography.body1.fontSize) + 'px'};
    text-align: center;
    color: ${p => (p.status === 'now' ? p.theme.palette.primary.main : p.theme.palette.text.hint)};
    line-height: ${p => p.theme.typography.body2.fontSize + 'px'};
    letter-spacing: 1px;
    position: absolute;
    top: ${p => (p.size === 'small' ? '28px' : '34px')};
    left: ${p =>
      -(p.text.length * p.theme.typography.body2.fontSize + p.text.length) / 2 +
      (p.size === 'small' ? 9 : 12) +
      'px'};
  }
  
`;

interface sourceDatasType {
  name: string;
  status: 'past' | 'now' | 'future';
}

export interface Props extends React.HTMLAttributes<HTMLDivElement> {
  // 步骤数据
  sourceDatas: sourceDatasType[];
  // 最后一个节点是否展示对号 默认展示
  lastNodeShowRightIcon?: boolean;
  type?: 'node' | 'line';
  className?: string;
  size?: string;
  // 点击切换步骤时触发
  onChange?: (item: any) => void;
}

const Steps: FC<Props> = ({
  sourceDatas,
  lastNodeShowRightIcon = true,
  type = 'node',
  className = 'steps',
  size = 'default',
  onChange,
  ...props
}) => {
  const theme = useWowTheme();

  const [StepChild, setStepChild] = useState([]);

  const stepCircleClickFun = item => {
    if(onChange) {
      onChange(item);
    }
  };

  useEffect(() => {
    let children = [];
    switch (type) {
      case 'node':
        sourceDatas.map((item, index) => {
          children.push({
            step: (
              <StepCircle
                size={size}
                theme={theme}
                length={sourceDatas.length}
                status={item.status}
                text={item.name}
                className={'StepCircle'}
                haveOnChange={!!onChange}
                onClick={() => stepCircleClickFun(item)}
              >
                {lastNodeShowRightIcon && index === sourceDatas.length - 1 ? (
                  <LastStepIcon theme={theme} status={item.status} className={'LastStepIcon'} />
                ) : (
                  <div key={index + 1} className={'Step'}>
                    {index + 1}
                  </div>
                )}

                <div className={'StepText'}>{item.name}</div>
              </StepCircle>
            ),
            line: index !== 0,
            status: item.status,
          });
        });
        break;
      //
      case 'line':
        break;
      default:
        break;
    }
    setStepChild(children);
  }, [sourceDatas]);

  return (
    <StepsBox theme={theme} className={className} size={size}>
      {StepChild.map((s, idx) => {
        return (
          <StepBox theme={theme} length={sourceDatas.length} idx={idx} className={'StepBox'}>
            {s.line ? <div className={'StepLine'} /> : null}
            {s.step}
          </StepBox>
        );
      })}
    </StepsBox>
  );
};

export default withWowTheme(Steps, 'WowSteps-root');
