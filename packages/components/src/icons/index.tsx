import styled, { withWowTheme, css } from '@wowjoy/styled';
import { CloseFillCircle } from '@wowjoy/icons';

export const Clear = withWowTheme<HTMLOrSVGElement, React.SVGAttributes<HTMLOrSVGElement>>(
  styled(CloseFillCircle)`
    color: rgba(0, 0, 0, 0.3);
    cursor: text;
    opacity: 0;
    transition: opacity ${p => p.theme.transitions.duration.short}ms
      ${p => p.theme.transitions.easing.easeInOut} 0ms;
  `,
  'Wow-icon-clear',
);
