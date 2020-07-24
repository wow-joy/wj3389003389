import deepmerge, { isPlainObect } from '../deepmerge';

describe('deepmerge.ts', () => {
  it('isPlainObject test', () => {
    expect(isPlainObect({})).toBe(true);
    expect(isPlainObect(new Array())).toBe(false);
  });

  it('deepmerge test', () => {
    expect(deepmerge({ name: 1 }, { name: 2 })).toEqual({ name: 2 });
    expect(deepmerge({ name: 1 }, { age: 2 })).toEqual({ name: 1, age: 2 });
    expect(deepmerge({ name: 1, age: { n: 1 } }, { name: 2, age: { n: 2, m: 3 } })).toEqual({
      name: 2,
      age: { n: 2, m: 3 },
    });
  });
});
