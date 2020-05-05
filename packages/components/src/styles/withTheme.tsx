import React from 'react';
import { ThemeConsumer } from 'styled-components';
import createTheme from './createTheme';
import clsx from 'clsx';

const withTheme = (Component: React.FC, className?: string) => {
  return (props, ref) => {
    return (
      <ThemeConsumer>
        {theme => (
          <Component
            {...props}
            theme={createTheme(theme)}
            className={clsx(className, props.className)}
            ref={ref}
          />
        )}
      </ThemeConsumer>
    );
  };
};

export default withTheme;
