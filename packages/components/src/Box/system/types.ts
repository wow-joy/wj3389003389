export type StyleFunction<Props> = (props: Props) => any;

export type SimpleStyleFunction<
  PropKey extends keyof any,
  Theme extends object = object
> = StyleFunction<Partial<Record<PropKey, any>> & { theme: Theme }>;

export type PropsFor<SomeStyleFunction> = SomeStyleFunction extends StyleFunction<infer Props>
  ? Props
  : never;
