import { CheckCircle, Close, CloseCircle, QuestionCircle, WarningCircle } from '@wowjoy/icons';
import styled, { useWowTheme } from '@wowjoy/styled';
import clsx from 'clsx';
import React from 'react';
import ReactDOM from 'react-dom';
import Button from '../Button';
import Modal, { Props as ModalProps } from '../Modal';
import { Collapse } from '../transitions/Collapse';

const DialogWrap = styled.div`
  padding: 24px 55px 18px 55px;
  position: relative;
  background: #fff;
  box-shadow: ${p => p.theme.shadows[2]};
  border-radius: ${p => p.theme.shape.borderRadius}px;
  .WowConfirm-close {
    cursor: pointer;
    position: absolute;
    color: #ccc;
    right: 10px;
    top: 10px;
  }
`;

const DialogTitleWrap = styled.div<any>`
  position: relative;
  margin-top: ${p => (p.hasDesc ? 0 : 6)}px;
  margin-bottom: ${p => (p.hasDesc ? 4 : 27)}px;
  .WowConfirm-icon {
    font-size: 20px;
    position: absolute;
    left: -30px;
  }
`;
const DialogTitle = styled.div`
  font-size: 14px;
  color: ${p => p.theme.palette.text.primary};
  font-weight: 600;
`;
const DialogDesc = styled.div`
  width: 190px;
  font-size: 12px;
  color: ${p => p.theme.palette.text.secondary};
  font-weight: 400;
`;
const DialogFooter = styled.div`
  margin-top: 15px;
  text-align: center;
  .WowButton-root {
    width: 90px;
    &:first-child:not(:last-child) {
      margin-right: 10px;
    }
    &:first-child:last-child {
      width: 100px;
    }
  }
  .WowConfirm-cancel {
  }
`;

export interface Props extends ModalProps {
  type?: 'question' | 'warn' | 'success' | 'error';
  title?: React.ReactElement;
  desc?: React.ReactElement;
  className?: string;
  style?: React.CSSProperties;
  equal?: boolean;
  onOk?: (e: React.MouseEvent<HTMLElement, MouseEvent>) => any;
  loading?: boolean;
}

const WarnIcon = styled(WarningCircle)`
  color: ${p => p.theme.palette.warn.main};
`;
const QuestionIcon = styled(QuestionCircle)`
  color: ${p => p.theme.palette.question.main};
`;
const SuccessIcon = styled(CheckCircle)`
  color: ${p => p.theme.palette.success.main};
`;
const ErrorIcon = styled(CloseCircle)`
  color: ${p => p.theme.palette.error.main};
`;

const Icons = {
  question: QuestionIcon,
  warn: WarnIcon,
  success: SuccessIcon,
  error: ErrorIcon,
};

const Confirm = React.forwardRef<any, Props>(
  (
    {
      loading,
      children,
      title,
      desc,
      className,
      equal = true,
      type = 'question',
      onOk,
      style,
      ...props
    },
    ref,
  ) => {
    const { open, onClose } = props;
    const theme = useWowTheme();
    const Icon = Icons[type];
    return (
      <Modal {...props} ref={ref}>
        <Collapse in={open}>
          <DialogWrap theme={theme} className={clsx('WowConfirm-root', className)} style={style}>
            <Close className="WowConfirm-close" onClick={onClose} />
            <DialogTitleWrap
              hasDesc={Boolean(desc)}
              theme={theme}
              className="WowConfirm-title-wrap"
            >
              <Icon className="WowConfirm-icon" theme={theme} />
              <DialogTitle theme={theme} className="WowConfirm-title">
                {title}
              </DialogTitle>
            </DialogTitleWrap>
            <DialogDesc theme={theme} className="WowConfirm-desc">
              {desc}
            </DialogDesc>
            <DialogFooter>
              {type === 'question' || type === 'warn' ? (
                <>
                  {' '}
                  <Button
                    loading={loading}
                    variant={equal ? 'outlined' : 'contained'}
                    onClick={onOk}
                  >
                    确认
                  </Button>
                  <Button
                    className={clsx({ 'WowConfirm-cancel-btn': !equal })}
                    variant={equal ? 'outlined' : 'contained'}
                    color={equal ? 'primary' : 'secondary'}
                    onClick={onClose as any}
                  >
                    取消
                  </Button>
                </>
              ) : (
                <Button onClick={onClose as any}>我知道了</Button>
              )}
            </DialogFooter>
          </DialogWrap>
        </Collapse>
      </Modal>
    );
  },
);

export const confirm = (props: Props) => {
  const container = document.createElement('div');
  document.body.appendChild(container);

  const currentProps = {
    ...props,
    onClose: handleClose,
    onOk: handleOk,
    TransitionProps: { onExited: handleExited },
    container: container,
  };

  function handleClose(e) {
    props.onClose?.(e);
    ReactDOM.render(<Confirm {...currentProps} open={false} />, container);
  }
  function handleOk(e) {
    let p = props.onOk?.(e);
    if (p instanceof Promise) {
      ReactDOM.render(<Confirm {...currentProps} open loading={true} />, container);
      p.then(() => {
        ReactDOM.render(<Confirm {...currentProps} open={false} loading={false} />, container);
      });
    } else {
      ReactDOM.render(<Confirm {...currentProps} open={false} />, container);
    }
  }
  function handleExited() {
    ReactDOM.unmountComponentAtNode(container);
    container.parentNode.removeChild(container);
  }
  ReactDOM.render(<Confirm {...currentProps} open />, container);
};

export default Confirm;
