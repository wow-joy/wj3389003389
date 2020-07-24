export type ParamType<T, K extends keyof T = keyof T> = T[K];
export type ExcludeByType<T, Type, K extends keyof T = keyof T> = ParamType<
  {
    [P in K]: T[P] extends Type ? never : P;
  }
>;
export type ExtractByType<T, Type, K extends keyof T = keyof T> = ParamType<
  {
    [P in K]: T[P] extends Type ? P : never;
  }
>;
