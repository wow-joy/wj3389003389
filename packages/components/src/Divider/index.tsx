import React from 'react';
import styled from '@wowjoy/styled';



const Line = styled.div<{
  dashed: boolean;
  type: string;
}>`
& {
  border-width: 1px;
  border-color: #ccc;
  border-style: ${ p => ( p.dashed ? 'dashed' : 'solid')};
  ${ p => (p.type === "vertical" ? `
    position: relative;
    top: -.06em;
    display: inline-block;
    height: .9em;
    margin: 0 8px;
    vertical-align: middle;
    border-top: 0;
    border-left: 1px solid rgba(0,0,0,.06);
  ` : `
    display: flex;
    clear: both;
    width: 100%;
    min-width: 100%;
    margin: 24px 0;
  `)}
}
  
`

export interface Props extends React.HTMLAttributes<HTMLElement> {
  dashed?: boolean;
  type? :string;
  indicator?: React.ReactNode;
}

const Divider = React.forwardRef<any, Props>(
  ({ dashed = false, type = "horizontal" }, ref) => {
    return (
        <Line dashed={dashed} type={type}></Line>
    );
  },
);

export default Divider;
