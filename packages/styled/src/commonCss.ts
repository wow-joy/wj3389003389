import { css } from 'styled-components';

export const scrollbarCss = css`
  /* 滚动条整体部分，可以设置宽度啥的 */
  ::-webkit-scrollbar {
    width: 12px;
    border: 1px solid #dcdcdc;
    border-top: none;
    border-bottom: none;
  }

  ::-webkit-scrollbar:horizontal {
    height: 12px;
    border: 1px solid #dcdcdc;
    border-left: none;
    border-right: none;
  }
  /* 滚动条两端的按钮 */
  ::-webkit-scrollbar-button {
  }

  /* 外层轨道 */
  ::-webkit-scrollbar-track {
  }
  /* 内层滚动槽 */
  ::-webkit-scrollbar-track-piece {
  }

  /* 滚动的滑块 */
  ::-webkit-scrollbar-thumb {
    width: 10px;
    background-color: #c1c1c1;
    border-radius: 20px;
    border-width: 3px;
    border-style: dashed;
    border-color: transparent;
    background-clip: padding-box;
    &:hover {
      background-clip: border-box;
      background-color: #999;
    }
  }
  /* 边角 */
  ::-webkit-scrollbar-corner {
    border: 1px solid #dcdcdc;
    border-left: none;
    border-top: none;
  }
`;

export const borderCss = css`
  border-radius: ${p => p.theme.shape.borderRadius}px;
  border: 1px solid ${p => p.theme.palette.grey.borderColor};
  transition: box-shadow ${p => p.theme.transitions.duration.short}ms
      ${p => p.theme.transitions.easing.easeInOut} 0ms,
    border ${p => p.theme.transitions.duration.short}ms ${p => p.theme.transitions.easing.easeInOut}
      0ms;
  &:not(.Wow-disabled) {
    &:hover {
      border: 1px solid ${p => p.theme.palette.primary.main};
    }
    &:focus-within {
      border: 1px solid ${p => p.theme.palette.primary.main};
      box-shadow: 0px 0px 0px 1px rgba(83, 189, 231, 0.5);
    }
  }
`;
