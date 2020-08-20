import React from 'react';
import IconButton from '../IconButton';
import styled, { useWowTheme, DefaultTheme, withWowTheme } from '@wowjoy/styled';
import clsx from 'clsx';
import {
  CheckFillCircle,
  WarningFillCircle,
  QuestionFillCircle,
  CloseFillCircle,
  InfoFillCircle,
  Close,
} from '@wowjoy/icons';

const sizeOpts = {
  small: {
    icon: {
      fontSize: 14,
    },
    message: {
      text: 12,
      padding: 1,
    },
  },
  middle: {
    icon: {
      fontSize: 16,
    },
    message: {
      text: 12,
      padding: 2,
    },
  },
  large: {
    icon: {
      fontSize: 24,
    },
    message: {
      text: 14,
      padding: 6,
    },
  },
};
const Wrap = styled.div<{
  theme: DefaultTheme;
  $type: Props['severity'];
  $size: Props['size'];
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
  }
  background-color: ${p => p.theme.palette[p.$type].light1};
  border: 1px solid ${p => p.theme.palette[p.$type].dark1};
  border-radius: ${p => p.theme.shape.borderRadius}px;
  padding: 7px 10px;
  display: flex;
  .WowAlert-icon {
    display: flex;
    padding: 2px 0;
    font-size: ${p => sizeOpts[p.$size].icon.fontSize}px;
    color: ${p => p.theme.palette[p.$type].main};
    margin-right: 10px;
  }
  .WowAlert-message {
    font-size: ${p => sizeOpts[p.$size].message.text}px;
    padding: ${p => sizeOpts[p.$size].message.padding}px 0;
    color: ${p =>
      p.$type === 'error' ? p.theme.palette.error.main : p.theme.palette.text.secondary};
  }
  .WowAlert-action {
    display: flex;
    align-items: center;
    margin-left: auto;
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
interface Props extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode | boolean;
  variant?: 'filled' | 'outlined' | 'standard';
  severity?: 'success' | 'info' | 'warning' | 'error' | 'question';
  color?: 'success' | 'info' | 'warning' | 'error' | 'question';
  size?: 'small' | 'middle' | 'large';
  iconMapping?: Record<'success' | 'info' | 'warning' | 'error' | 'question', React.ReactNode>;
  action?: React.ReactNode;
  onClose?: (e: React.MouseEvent<any, MouseEvent>) => void;
}
const icons = {
  success: <CheckFillCircle />,
  warning: <WarningFillCircle />,
  question: <QuestionFillCircle />,
  error: <CloseFillCircle />,
  info: <InfoFillCircle />,
};
const Alert = React.forwardRef<any, Props>(
  (
    {
      severity = 'success',
      children,
      icon,
      size = 'middle',
      onClose,
      color,
      iconMapping = icons,
      action,
      variant = 'standard',
      className,
      ...props
    },
    ref,
  ) => {
    const theme = useWowTheme();
    const Icon = icons[severity];
    const IconNode = icon || Icon;

    return (
      <Wrap
        ref={ref}
        theme={theme}
        $type={color || severity}
        $variant={variant}
        $size={size}
        role="alert"
        className={clsx(className, 'WowAlert-root', {
          'WowAlert-outlined': variant === 'outlined',
          'WowAlert-filled': variant === 'filled',
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
