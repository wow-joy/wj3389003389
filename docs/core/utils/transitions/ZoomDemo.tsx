/**
 * title: 基本使用
 */

import React, { useState } from 'react';
import { Zoom, Button } from '@wowjoy/core';
import { useToggle } from '@wowjoy/hooks';
import Radio from './Radio';

export default () => {
  const [open, toggle] = useToggle(true);
  const [direction, setDirection] = useState('center');
  const [attr, setAttr] = useState('both');

  return (
    <>
      <Button onClick={() => toggle()} style={{ marginBottom: 10 }}>
        toggle
      </Button>
      <br />
      <b>Direction</b>
      <Radio
        options={[
          'center',
          'left',
          'right',
          'top',
          'bottom',
          'topLeft',
          'topRight',
          'bottomLeft',
          'bottomRight',
        ]}
        value={direction}
        onChange={setDirection}
      />
      <b>Attr</b>
      <Radio options={['both', 'width', 'height']} value={attr} onChange={setAttr} />
      <Zoom
        direction={direction as any}
        attr={attr as any}
        in={open}
        timeout={{
          appear: 300,
          enter: 0,
          exit: 0,
        }}
      >
        <div style={{ height: 100, width: 100, background: 'red' }} />
      </Zoom>
    </>
  );
};
