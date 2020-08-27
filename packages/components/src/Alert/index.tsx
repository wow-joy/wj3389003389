import React from 'react';
import IconButton from '../IconButton';
import styled, { useWowTheme, DefaultTheme, withWowTheme } from '@wowjoy/styled';
import clsx from 'clsx';
import {
  CheckFillCircle,
  CheckCircle,
  WarningFillCircle,
  WarningCircle,
  QuestionFillCircle,
  QuestionCircle,
  CloseFillCircle,
  CloseCircle,
  InfoFillCircle,
  InfoCircle,
  Close,
} from '@wowjoy/icons';

const Wrap = styled.div<{
  theme: DefaultTheme;
  $type: Props['severity'];
  $variant: Props['variant'];
}>`
  &.WowAlert-outlined {
    background-color: transparent;
    border: 1px solid ${p => p.theme.palette[p.$type].main};
  }
  &.WowAlert-filled {
    background-color: ${p => p.theme.palette[p.$type].main};
    border: 1px solid ${p => p.theme.palette[p.$type].main};
    .WowAlert-icon,
    .WowAlert-message,
    WowAlert-action,
    .WowAlertTitle-root {
      color: #fff;
    }
    .WowAlert-close-icon {
      color: #fff;
    }
  }
  background-color: ${p => p.theme.palette[p.$type].light1};
  border: 1px solid ${p => p.theme.palette[p.$type].dark1};
  border-radius: ${p => p.theme.shape.borderRadius}px;
  padding: 11px 20px;
  display: flex;

  .WowAlert-icon {
    display: flex;
    font-size: 24px;
    color: ${p => p.theme.palette[p.$type].main};
    margin-right: 10px;
  }
  .WowAlert-message {
    line-height: 1;
    font-size: 14px;
    padding: 5px 0;
    color: ${p =>
      p.$type === 'error' ? p.theme.palette.error.main : p.theme.palette.text.secondary};
  }
  &.WowAlert-sm {
    padding: 9px 10px;
    .WowAlert-icon {
      font-size: 16px;
    }
    .WowAlert-message {
      padding: 2px 0;
    }
  }
  &.WowAlert-lg {
    padding: 15px 30px;
    .WowAlert-icon {
      font-size: 20px;
    }
    .WowAlert-message {
      font-size: 14px;
      padding: 3px 0;
    }
  }
  .WowAlert-action {
    display: flex;
    align-items: center;
    margin-left: auto;
    padding-left: 16px;
    color: ${p => p.theme.palette.disabled};
    .WowAlert-close-icon {
      font-size: 12px;
      padding: 3px;
    }
  }
  .WowAlertTitle-root {
    color: ${p =>
      p.$type === 'error' ? p.theme.palette.error.main : p.theme.palette.text.secondary};
  }
`;
export const AlertTitle = withWowTheme(
  styled.div`
    font-size: 16px;
    margin: -2px 0 10px 0;
  `,
  'WowAlertTitle-root',
);
export interface Props extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode | boolean;
  variant?: 'filled' | 'outlined' | 'standard';
  severity?: 'success' | 'info' | 'warning' | 'error' | 'question';
  color?: 'success' | 'info' | 'warning' | 'error' | 'question';
  size?: 'small' | 'medium' | 'large';
  iconMapping?: Record<'success' | 'info' | 'warning' | 'error' | 'question', React.ReactNode>;
  action?: React.ReactNode;
  onClose?: (e: React.MouseEvent<any, MouseEvent>) => void;
}
const filledIcons = {
  success: <CheckFillCircle />,
  warning: <WarningFillCircle />,
  question: <QuestionFillCircle />,
  error: <CloseFillCircle />,
  info: <InfoFillCircle />,
};
const icons = {
  success: <CheckCircle />,
  warning: <WarningCircle />,
  question: <QuestionCircle />,
  error: <CloseCircle />,
  info: <InfoCircle />,
};
const Alert = React.forwardRef<any, Props>(
  (
    {
      severity = 'success',
      children,
      icon,
      size = 'medium',
      onClose,
      color,
      iconMapping,
      action,
      variant = 'standard',
      className,
      ...props
    },
    ref,
  ) => {
    const theme = useWowTheme();
    iconMapping = iconMapping || (variant === 'filled' ? icons : filledIcons);
    const Icon = iconMapping[severity];
    const IconNode = icon || Icon;
    return (
      <Wrap
        ref={ref}
        theme={theme}
        $type={color || severity}
        $variant={variant}
        role="alert"
        className={clsx(className, 'WowAlert-root', {
          'WowAlert-outlined': variant === 'outlined',
          'WowAlert-filled': variant === 'filled',
          'WowAlert-sm': size === 'small',
          'WowAlert-lg': size === 'large',
        })}
        {...props}
      >
        {icon !== false && <div className="WowAlert-icon">{IconNode}</div>}
        <div className="WowAlert-message">{children}</div>
        {(onClose || action) && (
          <div className="WowAlert-action">
            {action || (
              <IconButton onClick={onClose} className="WowAlert-close-icon" variant="text">
                <Close />
              </IconButton>
            )}
          </div>
        )}
      </Wrap>
    );
  },
);

export default Alert;
