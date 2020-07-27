import {
  Button,
  ButtonBase,
  Backdrop,
  Collapse,
  Shift,
  Fade,
  ClickAwayListener,
  Portal,
  Modal,
  Select,
  Tooltip,
  Popper,
} from '@wowjoy/core';
import { useToggle } from '@wowjoy/hooks';
import styled, {
  createGlobalStyle,
  createTheme,
  scrollbarCss,
  ThemeProvider,
} from '@wowjoy/styled';
import React, { useRef, useEffect } from 'react';
// @ts-ignore
window.theme = createTheme();
const Global = createGlobalStyle`
  ${scrollbarCss}
`;
const Wrap = styled.div`
  padding: 100px;
  display: grid;
  grid-template: repeat(5, 100px) / repeat(5, 100px);
  button {
    align-self: center;
    justify-self: center;
    &:nth-of-type(1) {
      grid-column-start: 2;
    }
    &:nth-of-type(4) {
      grid-row-start: 2;
    }
    &:nth-of-type(5) {
      grid-row-start: 2;
      grid-column-start: 5;
    }
    &:nth-of-type(6) {
      grid-row-start: 3;
      grid-column-start: 1;
    }
    &:nth-of-type(7) {
      grid-row-start: 3;
      grid-column-start: 5;
    }
    &:nth-of-type(8) {
      grid-row-start: 4;
      grid-column-start: 1;
    }
    &:nth-of-type(9) {
      grid-row-start: 4;
      grid-column-start: 5;
    }
    &:nth-of-type(10) {
      grid-row-start: 5;
      grid-column-start: 2;
    }
    &:nth-of-type(11) {
      grid-row-start: 5;
      grid-column-start: 3;
    }
    &:nth-of-type(12) {
      grid-row-start: 5;
      grid-column-start: 4;
    }
  }
`;

export default function() {
  const ref = useRef(null);
  const tipRef = useRef(null);

  // const textInputRef = useRef();

  // const inputRef = useRef();

  useEffect(() => {
    console.log(ref);
  }, []);
  const [flag, toggle] = useToggle(false);
  return (
    <>
      <Global />
      {/* <Wrap>
        <Tooltip
          title="top-start"
          placement={flag ? 'top' : 'top-start'}
          PortalProps={{ disablePortal: true }}
        >
          <Button
            onClick={e => {
              toggle();
            }}
          >
            hover
          </Button>
        </Tooltip>
        <Tooltip title="top" placement="top">
          <Button>o</Button>
        </Tooltip>
        <Tooltip title="top-end" placement="top-end">
          <Button>hover</Button>
        </Tooltip>
        <Tooltip title="left-start" placement="left-start">
          <Button>hover</Button>
        </Tooltip>
        <Tooltip title="right-start" placement="right-start">
          <Button>hover</Button>
        </Tooltip>
        <Tooltip title="left" placement="left">
          <Button>hover</Button>
        </Tooltip>
        <Tooltip title="right" placement="right">
          <Button>hover</Button>
        </Tooltip>
        <Tooltip title="left-end" placement="left-end">
          <Button>hover</Button>
        </Tooltip>
        <Tooltip title="right-end" placement="right-end">
          <Button>hover</Button>
        </Tooltip>
        <Tooltip title="bottom-start" placement="bottom-start">
          <Button>hover</Button>
        </Tooltip>
        <Tooltip title="bottom" placement="bottom">
          <Button>hover</Button>
        </Tooltip>
        <Tooltip title="bottom-end" placement="bottom-end">
          <Button>hover</Button>
        </Tooltip>
      </Wrap>
      <br /> */}
      <Button
        ref={ref}
        onClick={e => {
          toggle();
        }}
      >
        toggle
      </Button>
      {/* <Select></Select> */}
      <Modal
        // disablePortal
        // hideBackdrop
        // BackdropProps={{ timeout: 3000 }}
        open={flag}
        onClose={() => toggle(false)}
      >
        <Collapse in={flag}>
          <Button
            onClick={() => {
              toggle(false);
            }}
          >
            Close
          </Button>
        </Collapse>
      </Modal>
    </>
  );
}
