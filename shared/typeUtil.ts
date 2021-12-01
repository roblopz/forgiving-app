type Prev = [never, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

type Join<K, P> = K extends string | number ?
  P extends string | number ?
  `${K}${"" extends P ? "" : "."}${P}`
  : never : never;

export type Paths<T, D extends number = 3> = [D] extends [never] ? never : T extends object ?
  { [K in keyof T]-?: K extends string | number ?
    `${K}` | Join<K, Paths<T[K], Prev[D]>>
    : never
  }[keyof T] : ""

export type NestedValueOf<Obj, Key extends string> =
  Obj extends object ?
    Key extends `${infer Parent}.${infer Leaf}` ?
      Parent extends keyof Obj ?
        NestedValueOf<Obj[Parent], Leaf>
      : never
    : Key extends keyof Obj ? Obj[Key] : never
  : never;