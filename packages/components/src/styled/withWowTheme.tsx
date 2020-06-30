import React from 'react';
import { ThemeConsumer, useTheme } from 'styled-components';
import createTheme from './createTheme';
import clsx from 'clsx';

const withWowTheme = <T, P extends { className?: string }>(
  Component: React.ForwardRefRenderFunction<T, P>,
  className?: string,
) => {
  const ComponentRef = React.forwardRef(Component);
  return React.forwardRef((props: Omit<P, 'theme'>, ref) => {
    return (
      <ThemeConsumer>
        {theme => (
          // @ts-ignore
          <ComponentRef
            {...props}
            theme={createTheme(theme)}
            className={clsx(className, props.className)}
            ref={ref}
          />
        )}
      </ThemeConsumer>
    );
  });
};

export default withWowTheme;
