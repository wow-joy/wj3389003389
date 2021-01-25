import * as React from 'react';
import CSSMotion from 'rc-motion';
import addEventListener from 'rc-util/lib/Dom/addEventListener';
import useMergedState from 'rc-util/lib/hooks/useMergedState';
import classNames from 'classnames';
import omit from 'omit.js';
import styled, { useWowTheme } from '@wowjoy/styled';
import { throttleByAnimationFrame } from './utils/throttleByAnimationFrame';
import { cloneElement } from './utils/reactNode';
import getScroll from './utils/getScroll';
import scrollTo from './utils/scrollTo';
import { BackTop as BackTopIcon } from '@wowjoy/icons';
const Wrap = styled.div`
  position: fixed;
  right: 100px;
  bottom: 50px;
  z-index: 99999;
  width: 40px;
  height: 40px;
  cursor: pointer;

  &:empty {
    display: none;
  }
  .Wowbacktop {
    &-content {
      width: 40px;
      height: 40px;
      overflow: hidden;
      color: ${p => p.theme.palette.primary.contrastText};
      text-align: center;
      background-color: ${p => p.theme.palette.primary.main};
      border-radius: 20px;
      transition: all 0.3s;

      &:hover {
        background-color: ${p => p.theme.palette.primary.light};
        transition: all 0.3s;
      }
    }

    &-icon {
      font-size: 24px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
`;
export interface BackTopProps {
  visibilityHeight?: number;
  onClick?: React.MouseEventHandler<HTMLElement>;
  target?: () => HTMLElement | Window | Document;
  prefixCls?: string;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  duration?: number;
  visible?: boolean; // Only for test. Don't use it.
}

const BackTop: React.FC<BackTopProps> = props => {
  const theme = useWowTheme();
  const [visible, setVisible] = useMergedState(false, {
    value: props.visible,
  });

  const ref = React.createRef<HTMLDivElement>();
  const scrollEvent = React.useRef<any>();

  const getDefaultTarget = () =>
    ref.current && ref.current.ownerDocument ? ref.current.ownerDocument : window;

  const handleScroll = throttleByAnimationFrame(
    (e: React.UIEvent<HTMLElement> | { target: any }) => {
      const { visibilityHeight } = props;
      const scrollTop = getScroll(e.target, true);
      setVisible(scrollTop > visibilityHeight!);
    },
  );

  const bindScrollEvent = () => {
    const { target } = props;
    const getTarget = target || getDefaultTarget;
    const container = getTarget();
    scrollEvent.current = addEventListener(container, 'scroll', (e: React.UIEvent<HTMLElement>) => {
      handleScroll(e);
    });
    handleScroll({
      target: container,
    });
  };

  React.useEffect(() => {
    bindScrollEvent();
    return () => {
      if (scrollEvent.current) {
        scrollEvent.current.remove();
      }
      (handleScroll as any).cancel();
    };
  }, [props.target]);

  const scrollToTop = (e: React.MouseEvent<HTMLDivElement>) => {
    const { onClick, target, duration = 450 } = props;
    scrollTo(0, {
      getContainer: target || getDefaultTarget,
      duration,
    });
    if (typeof onClick === 'function') {
      onClick(e);
    }
  };

  const renderChildren = ({ prefixCls }: { prefixCls: string }) => {
    const { children } = props;
    const defaultElement = (
      <div className={`${prefixCls}-content`}>
        <div className={`${prefixCls}-icon`}>
          <BackTopIcon />
        </div>
      </div>
    );
    return (
      <CSSMotion visible={visible} motionName="fade" removeOnLeave>
        {({ className: motionClassName }) => {
          const childNode = children || defaultElement;
          return (
            <div>
              {cloneElement(childNode, ({ className }) => ({
                className: classNames(motionClassName, className),
              }))}
            </div>
          );
        }}
      </CSSMotion>
    );
  };

  const { prefixCls: customizePrefixCls, className = '' } = props;
  const prefixCls = `Wowbacktop`;
  const classString = classNames(prefixCls, className);

  // fix https://fb.me/react-unknown-prop
  const divProps = omit(props, [
    'prefixCls',
    'className',
    'children',
    'visibilityHeight',
    'target',
    'visible',
  ]);

  return (
    <Wrap {...divProps} theme={theme} className={classString} onClick={scrollToTop} ref={ref}>
      {renderChildren({ prefixCls })}
    </Wrap>
  );
};

BackTop.defaultProps = {
  visibilityHeight: 400,
};

export default React.memo(BackTop);
