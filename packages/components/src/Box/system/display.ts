import style from './style';
import compose from './compose';

export const displayRaw = style({
  prop: 'display',
});

export const overflow = style({
  prop: 'overflow',
});

export const textOverflow = style({
  prop: 'textOverflow',
});

export const visibility = style({
  prop: 'visibility',
});

export const whiteSpace = style({
  prop: 'whiteSpace',
});

export default compose(displayRaw, overflow, textOverflow, visibility, whiteSpace);
