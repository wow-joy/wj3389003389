import React, { useState } from 'react';

export default function useList<T>(data: Array<T>) {
  const [list, set] = useState(data || []);
  const clear = () => set([]);
  const filter = (callback: (item: T, index: number) => Boolean) => set(list.filter(callback));
  const push = (item: T) => {
    list.push(item);
    set([...list]);
  };
  const remove = (index: number) => {
    list.splice(index, 1);
    set([...list]);
  };
  const sort = (callback: (a: T, b: T) => number) => set([...list.sort(callback)]);
  const updateAt = (index: number, item: T) => {
    list.splice(index, 1, item);
    set([...list]);
  };
  const reset = () => set(data || []);
  return [list, { clear, filter, push, remove, set, sort, updateAt, reset }];
}
