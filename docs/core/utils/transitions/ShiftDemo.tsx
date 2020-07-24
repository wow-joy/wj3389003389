/**
 * title: 基本使用
 */

import React, { useState } from 'react';
import { Shift, Button } from '@wowjoy/core';
import { useToggle } from '@wowjoy/hooks';
import Radio from './Radio';

export default () => {
  const [open, toggle] = useToggle(true);
  const [direction, setDirection] = useState('top');

  return (
    <>
      <Button onClick={() => toggle()} style={{ marginBottom: 10 }}>
        toggle
      </Button>
      <br />
      <b>Direction</b>
      <Radio
        options={['left', 'right', 'top', 'bottom']}
        value={direction}
        onChange={setDirection}
      />
      <Shift direction={direction as any} movement="100px" in={open} timeout={1000}>
        <div style={{ height: 100, width: 100, background: 'red' }} />
      </Shift>
    </>
  );
};
