import React, { useRef, useEffect } from 'react';
import IconList from './IconList';
import { Delete } from '@wowjoy/icons';
import { Button, IconButton, Input, InputGroup, Search } from '@wowjoy/core';
import { ThemeProvider, createTheme } from '@wowjoy/core/es/styled';

export default function() {
  const ref = useRef();
  useEffect(() => {
    // console.log(ref);
  }, []);
  return (
    <ThemeProvider
      theme={createTheme({
        shape: {
          borderRadius: 0,
        },
      })}
    >
      {/* <IconList /> */}
      <Button
        ref={ref}
        variant="contained"
        color="primary"
        size="large"
        startIcon={<Delete />}
        endIcon={<Delete />}
        center={false}
      >
        一级按钮
      </Button>

      <IconButton size="small" variant="text" color="error">
        <Delete />
      </IconButton>
      <Search allowClear />
    </ThemeProvider>
  );
}
