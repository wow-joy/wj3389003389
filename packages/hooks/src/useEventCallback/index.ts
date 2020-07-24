import React, { useRef, useCallback, useEffect } from 'react';

export default function useEventCallback<T extends (...args: any[]) => any>(handler: T): T {
  const holder = useRef<T>(handler);
  useEffect(() => {
    holder.current = handler;
  });
  return useCallback<T>(((...args: any[]) => holder.current(...args)) as T, []);
}
