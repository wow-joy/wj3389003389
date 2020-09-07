import React from 'react';
import Loading from '../Loading';
import styled from '@wowjoy/styled';

const Wrap = styled.div`
  position: relative;
  display: inline-block;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
`;
const LoadingWrap = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const BlurWrap = styled.div<{
  spinning: boolean;
}>`
  clear: both;
  overflow: hidden;
  opacity: ${p => (p.spinning ? 0.1 : 1)};
  user-select: none;
  pointer-events: none;
  transition: opacity 0.3s;
`;

export interface Props extends React.HTMLAttributes<HTMLElement> {
  spinning?: boolean;
  indicator?: React.ReactNode;
}

const Spin = React.forwardRef<any, Props>(
  ({ spinning = true, indicator, children, ...props }, ref) => {
    return (
      <Wrap {...props} ref={ref}>
        {spinning && <LoadingWrap>{indicator || <Loading />}</LoadingWrap>}
        <BlurWrap spinning={spinning}>{children}</BlurWrap>
      </Wrap>
    );
  },
);

export default Spin;
