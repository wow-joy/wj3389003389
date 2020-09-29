export function validProgress(progress: number | undefined) {
  if (!progress || progress < 0) {
    return 0;
  }
  if (progress > 100) {
    return 100;
  }
  return progress;
}

export function getPathStyles(
  offset,
  percent,
  strokeColor,
  strokeWidth,
  gapDegree = 0,
  gapPosition = undefined,
) {
  const radius = 50 - strokeWidth / 2;
  let beginPositionX = 0;
  let beginPositionY = -radius;
  let endPositionX = 0;
  let endPositionY = -2 * radius;

  switch (gapPosition) {
    case 'left':
      beginPositionX = -radius;
      beginPositionY = 0;
      endPositionX = 2 * radius;
      endPositionY = 0;
      break;

    case 'right':
      beginPositionX = radius;
      beginPositionY = 0;
      endPositionX = -2 * radius;
      endPositionY = 0;
      break;

    case 'bottom':
      beginPositionY = radius;
      endPositionY = 2 * radius;
      break;

    default:
  }

  let pathString = `M 50,50 m ${beginPositionX},${beginPositionY} \n   a ${radius},${radius} 0 1 1 ${endPositionX}, ${-endPositionY}\n   a ${radius}, ${radius} 0 1 1 ${-endPositionX} ${endPositionY}`;
  let len = Math.PI * 2 * radius;
  let pathStyle = {
    stroke: strokeColor,
    strokeDasharray: `${(percent / 100) * (len - gapDegree)}px ${len}px`,
    strokeDashoffset: `-${gapDegree / 2 + (offset / 100) * (len - gapDegree)}px`,
  };
  return {
    pathString: pathString,
    pathStyle: pathStyle,
  };
}

export function stripPercentToNumber(percent) {
  return +percent.replace('%', '');
}
