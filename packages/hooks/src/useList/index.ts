import { useState } from 'react';

export default function useList<T>(
  data: Array<T>,
): [
  Array<T>,
  {
    clear(): void;
    filter(callback: (item: T, index: number) => Boolean): void;
    push(item: T): void;
    unshift(item: T): void;
    remove(index: number): void;
    set(data: Array<T> | ((prev: Array<T>) => Array<T>)): void;
    sort(callback: (a: T, b: T) => number): void;
    updateAt(index: number, item: T): void;
    reset(): void;
  },
] {
  const [list, set] = useState<Array<T>>(data || []);
  const clear = () => set([]);
  const filter = (callback: (item: T, index: number) => Boolean) => {
    set(prev => prev.filter(callback));
  };
  const push = (item: T) => {
    set(prev => [...prev, item]);
  };
  const unshift = (item: T) => {
    set(prev => [item, ...prev]);
  };
  const remove = (index: number) => {
    set(prev => {
      prev.splice(index, 1);
      return [...prev];
    });
  };
  const sort = (callback: (a: T, b: T) => number) => {
    set(prev => [...prev.sort(callback)]);
  };
  const updateAt = (index: number, item: T) => {
    set(prev => {
      prev.splice(index, 1, item);
      return [...prev];
    });
  };
  const reset = () => set(data || []);
  return [list, { clear, filter, push, unshift, remove, set, sort, updateAt, reset }];
}
