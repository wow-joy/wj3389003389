/**
 * title: 基本使用
 */

import React, { useState } from 'react';
import { CollapseSlide, Button } from '@wowjoy/core';
import { useToggle } from '@wowjoy/hooks';
import { HuatuoLogo } from '@wowjoy/icons';

export default () => {
  const [open, toggle] = useToggle(true);

  return (
    <>
      <Button onClick={() => toggle()} style={{ marginBottom: 10 }}>
        toggle
      </Button>
      <div style={{ display: 'flex' }}>
        <CollapseSlide
          in={open}
          unmountOnExit
          timeout={{
            appear: 300,
            enter: 0,
            exit: 0,
          }}
        >
          <div
            style={{
              display: 'inline-flex',
              background: 'rgba(0,0,0,.1)',
              overflow: 'hidden',
            }}
          >
            <HuatuoLogo style={{ fontSize: 100 }} />
          </div>
        </CollapseSlide>
      </div>
    </>
  );
};
