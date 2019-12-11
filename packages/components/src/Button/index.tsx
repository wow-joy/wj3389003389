import React from 'react';

export default function({ children, ...props }) {
  return <button {...props}>{children}</button>;
}
