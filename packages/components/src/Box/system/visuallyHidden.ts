import style from './style';

export default style({
  prop: 'visuallyHidden',
  cssProperty: false,
  transform: flexCenter =>
    flexCenter
      ? {
          border: 0,
          clip: 'rect(0 0 0 0)',
          height: 1,
          margin: -1,
          overflow: 'hidden',
          padding: 0,
          position: 'absolute',
          whiteSpace: 'nowrap',
          width: 1,
        }
      : {},
});
