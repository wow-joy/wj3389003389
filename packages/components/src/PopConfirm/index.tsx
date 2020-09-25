import React from 'react';
import { useControlState } from '@wowjoy/hooks';
import styled, { useWowTheme } from '@wowjoy/styled';
import { WarningCircle } from '@wowjoy/icons';
import Popper, { Props as PopperProps } from '../Popper';
import Button, { ButtonType, Props as ButtonProps } from '../Button';
import { getRenderPropValue, RenderFunction } from '../utils/getRenderPropValue';
import omit from 'omit.js';

export interface Props extends PopperProps {
  onConfirm?: (e?: React.MouseEvent<HTMLElement>) => void;
  onCancel?: (e?: React.MouseEvent<HTMLElement>) => void;
  okText?: React.ReactNode;
  okType?: ButtonType;
  cancelText?: React.ReactNode;
  okButtonProps?: ButtonProps;
  cancelButtonProps?: ButtonProps;
  icon?: React.ReactNode;
  visible?: boolean;
  content: React.ReactNode | RenderFunction;
  className?: string;
  onVisibleChange?: (
    visible: boolean,
    e?: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLDivElement>,
  ) => void;
}
const PopWarningCircle=styled(WarningCircle)`
  path {
    fill: rgb(6, 174, 166);
  }
`;
// 兼容下 i 标签作为icon情况
const PopIcon = styled.div`
  i:first-child {
    position: absolute;
    top: 0.8em;
    line-height: 1em;   
  }
  svg:first-child {
    position: absolute;
    top: 0.8em;
    line-height: 1em;
  }
`;
const PopBox = styled.div`
  padding: 0.5em 1em;
  background-color: #fff;
`;
const PopMessage = styled.div`
  position: relative;
  padding: 0.5em 0 1em;
`;
const PopTitle = styled.div`
  padding-left: 1.5em;
`;
const PopButtons = styled.div`
  margin-bottom: 0.3em;
  text-align: right;

  button {
    margin-left: 0.5em;
  }
`;

const PopConfirm = React.forwardRef<any, Props>((props, ref) => {
  const [visible, setVisible] = useControlState('visible' in props, props.visible, false);

  React.useEffect(() => {
    if ('visible' in props) {
      setVisible(props.visible);
    }
  }, [props.visible]);

  const onCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    settingVisible(false, e);
    props.onCancel?.call(this, e);
  };
  const onConfirm = (e: React.MouseEvent<HTMLButtonElement>) => {
    settingVisible(false, e);
    props.onConfirm?.call(this, e);
  };
  const settingVisible = (v: boolean, e?: React.MouseEvent<HTMLButtonElement>) => {
    if (!('visible' in props)) {
      setVisible(v);  
    } 
    props.onVisibleChange?.call(this, v, e);
  };

  const {
    okButtonProps,
    cancelButtonProps,
    content,
    cancelText = '取消',
    okText = '确定',
    okType,
    icon = <PopWarningCircle />,
    className,
    ...otherProps
  } = props;
  const renderContent = () => {  
    return (
      <PopBox className={className}>
        <PopMessage>
          <PopIcon>{icon}</PopIcon>
          <PopTitle>{getRenderPropValue(content)}</PopTitle>
        </PopMessage>
        <PopButtons>
          <Button onClick={onCancel} size="small" {...cancelButtonProps}>
            {cancelText}
          </Button>
          <Button color="info" onClick={onConfirm} variant={okType} size="small" {...okButtonProps}>
            {okText}
          </Button>
        </PopButtons>
      </PopBox>
    );
  };

  const popperProps= omit(otherProps, ['onVisibleChange', 'onConfirm', 'onCancel']);
  // popperjs 对于 hover 等操作支持不是很友好,暂时只添加click,其他触发事件未添加
  return (
    <Popper  {...popperProps}  content={renderContent()} open={visible} ref={ref}>
      {React.cloneElement(props.children, {
        onClick: e => {
          settingVisible(!visible,e);
        },
      })}
    </Popper>
  );
});

export default PopConfirm;
