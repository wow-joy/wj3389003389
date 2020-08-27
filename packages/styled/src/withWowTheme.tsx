import React from 'react';
import { ThemeConsumer, useTheme, StyledComponent, DefaultTheme } from 'styled-components';
import createTheme from './createTheme';
import clsx from 'clsx';

const withWowTheme = <T, P extends {}>(
  Component:
    | React.ForwardRefRenderFunction<T, P>
    | React.FC<P>
    | StyledComponent<keyof JSX.IntrinsicElements | React.ComponentType<any>, DefaultTheme, P>,
  className?: string,
) => {
  let ComponentRef;
  // @ts-ignore
  if (Component.$$typeof === Symbol.for('react.forward_ref')) {
    ComponentRef = Component;
  } else {
    ComponentRef = React.forwardRef(Component as React.ForwardRefRenderFunction<T, P>);
  }
  return React.forwardRef<T, P>((props: Omit<P, 'theme'>, ref) => {
    return (
      <ThemeConsumer>
        {theme => (
          // @ts-ignore
          <ComponentRef
            {...props}
            theme={theme || createTheme(theme)}
            className={clsx((props as any).className, className)}
            ref={ref}
          />
        )}
      </ThemeConsumer>
    );
  });
};

export default withWowTheme;
