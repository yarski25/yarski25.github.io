// export type DeepPartial<T> = {
//   [P in keyof T]?: DeepPartial<T[P]>;
// };

// export type DeepPartial<T> = T extends Function
//   ? T
//   : T extends object
//   ? T extends unknown[]
//     ? DeepPartial<T[number]>[]
//     : { [P in keyof T]?: DeepPartial<T[P]> }
//   : T;

export type DeepPartial<T> = unknown extends T
  ? T
  : T extends object
  ? {
      [P in keyof T]?: T[P] extends Array<infer U>
        ? Array<DeepPartial<U>>
        : T[P] extends ReadonlyArray<infer U>
        ? ReadonlyArray<DeepPartial<U>>
        : DeepPartial<T[P]>;
    }
  : T;
