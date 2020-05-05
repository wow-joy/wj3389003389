import React, { useState, useImperativeHandle, useRef } from 'react';
import styled from 'styled-components';
import { animated, useTransition } from 'react-spring';

const Wrap = styled.span`
  border-radius: inherit;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  pointer-events: none;
  overflow: hidden;
`;
const Ripple = styled(animated.span)`
  position: absolute;
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 50%;
`;

let id = 0;

const TouchRipple: React.FC<any> = (props, ref) => {
  const wrapRef = useRef();
  const [items, setItems] = useState([]);
  const transitions = useTransition(items, item => item.key, {
    from: item => {
      const width = Math.sqrt(Math.pow(wrapRef.current.offsetWidth, 2) * 2);
      return {
        width: width * 2,
        height: width * 2,
        opacity: 0,
        transform: 'scale(0)',
        top: `${item.y - width}px`,
        left: `${item.x - width}px`,
      };
    },
    enter: item => ({
      opacity: 1,
      transform: 'scale(1)',
    }),
    onRest: item => setItems(state => state.filter(i => i.key !== item.key)),
    config: { duration: 1000 },
  });

  useImperativeHandle(ref, () => ({
    start: ({ x, y }: { x: number; y: number }) => {
      setItems(state => [...state, { key: ++id, x, y }]);
    },
  }));

  return (
    <Wrap {...props} ref={wrapRef}>
      {transitions.map(({ item, key, props }) => (
        <Ripple key={key} style={props} />
      ))}
    </Wrap>
  );
};

export default React.forwardRef(TouchRipple);
