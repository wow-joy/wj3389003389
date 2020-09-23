// 可能导致触发页面渲染,导致固钉变化的事件
export const TRIGGER_EVENTS = [
  'resize',
  'scroll',
  'touchstart',
  'touchmove',
  'touchend',
  'pageshow',
  'load',
];

export type Rect = ClientRect | DOMRect;
export type BindElement = HTMLElement | Window | null | undefined;

export default function getScroll(target: BindElement, top: boolean): number {
  if (typeof window === 'undefined') {
    return 0;
  }

  const prop = top ? 'pageYOffset' : 'pageXOffset';
  const method = top ? 'scrollTop' : 'scrollLeft';
  const isWindow = target === window;
  let ret = isWindow ? target[prop] : target[method];
  // 兼容 IE 8
  if (isWindow && typeof ret !== 'number') {
    ret = window.document.documentElement[method];
  }

  return ret;
}

export function getDefaultTarget() {
  return typeof window !== 'undefined' ? window : null;
}

export function getTargetRect(target: BindElement): ClientRect {
  return target !== window
    ? (target as HTMLElement).getBoundingClientRect()
    : ({ top: 0, right: 0, bottom: window.innerHeight, left: 0 } as ClientRect);
}

export function getOffset(element: HTMLElement, target: BindElement) {
  const elemRect = element.getBoundingClientRect();
  const targetRect = getTargetRect(target);

  const scrollTop = getScroll(target, true);
  const scrollLeft = getScroll(target, false);

  const docElem = window.document.body;
  const clientTop = docElem.clientTop || 0;
  const clientLeft = docElem.clientLeft || 0;

  return {
    top: elemRect.top - targetRect.top + scrollTop - clientTop,
    left: elemRect.left - targetRect.left + scrollLeft - clientLeft,
    width: elemRect.width,
    height: elemRect.height,
  };
}
