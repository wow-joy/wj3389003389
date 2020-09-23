import React from 'react';
import ReactDOM from 'react-dom';
import shallowequal from 'shallowequal';
import clsx from 'clsx';
import omit from 'omit.js';
import styled from '@wowjoy/styled';
import addEventListener from 'rc-util/lib/Dom/addEventListener';
import getScroll, { getOffset, getTargetRect, getDefaultTarget, TRIGGER_EVENTS } from './utils';

const StyleAffix = styled.div`
  .wowjoy-affix {
    z-index: 99999;
  }
`;

export interface AffixProps {
  offsetTop?: number;
  offsetBottom?: number;
  style?: React.CSSProperties;
  onChange?: (affixed?: boolean) => void;
  /** 设置 Affix 需要监听其滚动事件的元素,值为一个返回对应 DOM 元素的函数,默认为 window */
  target?: () => Window | HTMLElement | null;
  className?: string;
  children: React.ReactNode;
}

export interface AffixState {
  affixStyle?: React.CSSProperties;
  placeholderStyle?: React.CSSProperties;
}

class Affix extends React.Component<AffixProps, AffixState> {
  private timeout: any;
  refs: {
    fixedNode: HTMLElement;
  };
  eventHandlers = {};

  state: AffixState = {
    affixStyle: null,
    placeholderStyle: null,
  };
  componentDidMount() {
    const target = this.props.target || getDefaultTarget;
    this.timeout = setTimeout(() => {
      this.setTargetEventListeners(target);
    });
  }
  componentWillReceiveProps(nextProps) {
    // props改变时,检查target是否变化,变化需要重新绑定事件
    if (this.props.target !== nextProps.target) {
      this.clearEventListeners();
      this.setTargetEventListeners(nextProps.target);
      this.updatePosition({}); // 手动触发一次事件
    }
  }
  componentWillUnmount() {
    this.clearEventListeners();
    clearTimeout(this.timeout);
  }
  setTargetEventListeners = getTarget => {
    const target = getTarget();
    if (!target) {
      return;
    }
    this.clearEventListeners();
    TRIGGER_EVENTS.forEach(eventName => {
      this.eventHandlers[eventName] = addEventListener(target, eventName, this.updatePosition);
    });
  };
  clearEventListeners() {
    TRIGGER_EVENTS.forEach(eventName => {
      const handler = this.eventHandlers[eventName];
      if (handler && handler.remove) {
        handler.remove();
      }
    });
  }
  updatePosition = event => {
    const { affixStyle } = this.state;
    let { offsetTop, offsetBottom, target = getDefaultTarget } = this.props;
    const targetNode = target();
    if (!targetNode) {
      return;
    }
    const scrollTop = getScroll(targetNode, true);
    const affixNode = ReactDOM.findDOMNode(this) as HTMLElement;
    const elemOffset = getOffset(affixNode, targetNode);
    const elemSize = {
      width: this.refs.fixedNode.offsetWidth,
      height: this.refs.fixedNode.offsetHeight,
    };
    const offsetMode = {
      top: false,
      bottom: false,
    };

    if (typeof offsetTop !== 'number' && typeof offsetBottom !== 'number') {
      offsetMode.top = true;
      offsetTop = 0;
    } else {
      offsetMode.top = typeof offsetTop === 'number';
      offsetMode.bottom = typeof offsetBottom === 'number';
    }
    const targetRect = getTargetRect(targetNode);
    const targetInnerHeight =
      (targetNode as Window).innerHeight || (targetNode as HTMLElement).clientHeight;
    const width = elemOffset.width;

    if (scrollTop > elemOffset.top - (offsetTop as number) && offsetMode.top) {
      // fixed top
      this.setAffixStyle(event, {
        position: 'fixed',
        top: targetRect.top + (offsetTop as number),
        left: targetRect.left + elemOffset.left,
        width,
      });
      this.setPlaceholderStyle({
        width,
        height: elemSize.height,
      });
    } else if (
      scrollTop < elemOffset.top + elemSize.height + (offsetBottom as number) - targetInnerHeight &&
      offsetMode.bottom
    ) {
      // fixed bottom
      const targetBottomOffet = targetNode === window ? 0 : window.innerHeight - targetRect.bottom;
      this.setAffixStyle(event, {
        position: 'fixed',
        bottom: targetBottomOffet + (offsetBottom as number),
        left: targetRect.left + elemOffset.left,
        width,
      });
      this.setPlaceholderStyle({
        width,
        height: elemOffset.height,
      });
    } else {
      // 窗口resize,重新定位
      if (
        event.type === 'resize' &&
        affixStyle &&
        affixStyle.position === 'fixed' &&
        affixNode.offsetWidth
      ) {
        this.setAffixStyle(event, { ...affixStyle, width: affixNode.offsetWidth });
      } else {
        this.setAffixStyle(event, null);
      }
      this.setPlaceholderStyle(null);
    }
  };
  setAffixStyle = (event, affixStyle: React.CSSProperties) => {
    const { onChange = () => {}, target = getDefaultTarget } = this.props;
    const { affixStyle: originalAffixStyle } = this.state;
    const isWindow = target() === window;
    // scroll 时, 已经fixed,不需要再次改变状态
    if (event.type === 'scroll' && originalAffixStyle && affixStyle && isWindow) {
      return;
    }
    // 前后位置相同,也不需要再次改变状态
    if (shallowequal(affixStyle, originalAffixStyle)) {
      return;
    }
    this.setState({ affixStyle }, () => {
      const affixed = !!this.state.affixStyle;
      if ((affixStyle && !originalAffixStyle) || (!affixStyle && originalAffixStyle)) {
        onChange(affixed);
      }
    });
  };
  setPlaceholderStyle = (placeholderStyle: React.CSSProperties) => {
    const { placeholderStyle: originalPlaceholderStyle } = this.state;
    if (shallowequal(placeholderStyle, originalPlaceholderStyle)) {
      return;
    }
    this.setState({ placeholderStyle });
  };
  render() {
    const { affixStyle, placeholderStyle } = this.state;
    const { style, className } = this.props;
    const styleAffixStyle = { placeholderStyle, ...style };
    const props = omit(this.props, ['offsetTop', 'offsetBottom', 'target', 'onChange']);
    return (
      <StyleAffix style={styleAffixStyle} className={className} {...props}>
        <div
          className={clsx(affixStyle && 'wowjoy-affix')}
          ref="fixedNode"
          style={affixStyle}
        >
          {this.props.children}
        </div>
      </StyleAffix>
    );
  }
}

export default Affix;
