export type Maybe<T> = T | null;

export type Immutable<T extends any[]> = {
  +readonly [P in keyof T]: T[P];
};
export type Mutable<T extends any[]> = {
  -readonly [P in keyof T]: T[P];
};
export type Optional<T extends any[]> = {
  [P in keyof T]+?: T[P];
};

export type Unpacked<T> = T extends (infer U)[]
  ? U
  : T extends (...args: any[]) => infer U
  ? U
  : T extends Promise<infer U>
  ? U
  : T;

export type PartialSome<T, P extends keyof T> = Omit<T, P> & Partial<Pick<T, P>>;

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends Array<infer U>
    ? Array<DeepPartial<U>>
    : T[P] extends ReadonlyArray<infer U>
    ? ReadonlyArray<DeepPartial<U>>
    : T[P] extends {
        [key: string]: unknown;
      }
    ? DeepPartial<T[P]>
    : T[P];
};

// 只处理对象的值
export type DeepNonNullable<T, K extends keyof T = keyof T> = T extends object
  ? { [key in K]-?: DeepNonNullable<NonNullable<T[key]>> }
  : NonNullable<T>;

// 对象的值是数组对象就把数组内的对象也处理掉
export type DeepNonNullableIncludeArray<T, K extends keyof T = keyof T> = T extends Array<infer U>
  ? Array<DeepNonNullableIncludeArray<NonNullable<U>>>
  : T extends object
  ? { [key in K]-?: DeepNonNullableIncludeArray<NonNullable<T[key]>> }
  : NonNullable<T>;

export type Exist<T> = { [P in keyof T]: NonNullable<T[P]> };

export type DeepRequired<T extends object, K extends keyof T = keyof T> = {
  [key in K]-?: Required<T>[key] extends object ? DeepRequired<Required<T>[key]> : T[key];
};

export type Override<T, P> = Omit<T, keyof P> & P;

export type PromiseOrNot<T> = Promise<T> | T;

export type Factory<T> = (...args: any[]) => T;
export type FactoryOrNot<T> = T | Factory<T>;
