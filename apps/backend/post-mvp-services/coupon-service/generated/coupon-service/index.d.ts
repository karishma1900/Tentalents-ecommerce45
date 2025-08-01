
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Coupon
 * 
 */
export type Coupon = $Result.DefaultSelection<Prisma.$CouponPayload>
/**
 * Model CouponRedemption
 * 
 */
export type CouponRedemption = $Result.DefaultSelection<Prisma.$CouponRedemptionPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const CouponType: {
  FLAT: 'FLAT',
  PERCENTAGE: 'PERCENTAGE'
};

export type CouponType = (typeof CouponType)[keyof typeof CouponType]


export const CouponScope: {
  GLOBAL: 'GLOBAL',
  PRODUCT: 'PRODUCT',
  CATEGORY: 'CATEGORY',
  VENDOR: 'VENDOR',
  USER: 'USER'
};

export type CouponScope = (typeof CouponScope)[keyof typeof CouponScope]

}

export type CouponType = $Enums.CouponType

export const CouponType: typeof $Enums.CouponType

export type CouponScope = $Enums.CouponScope

export const CouponScope: typeof $Enums.CouponScope

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Coupons
 * const coupons = await prisma.coupon.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Coupons
   * const coupons = await prisma.coupon.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.coupon`: Exposes CRUD operations for the **Coupon** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Coupons
    * const coupons = await prisma.coupon.findMany()
    * ```
    */
  get coupon(): Prisma.CouponDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.couponRedemption`: Exposes CRUD operations for the **CouponRedemption** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CouponRedemptions
    * const couponRedemptions = await prisma.couponRedemption.findMany()
    * ```
    */
  get couponRedemption(): Prisma.CouponRedemptionDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.13.0
   * Query Engine version: 361e86d0ea4987e9f53a565309b3eed797a6bcbd
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Coupon: 'Coupon',
    CouponRedemption: 'CouponRedemption'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "coupon" | "couponRedemption"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Coupon: {
        payload: Prisma.$CouponPayload<ExtArgs>
        fields: Prisma.CouponFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CouponFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CouponPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CouponFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CouponPayload>
          }
          findFirst: {
            args: Prisma.CouponFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CouponPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CouponFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CouponPayload>
          }
          findMany: {
            args: Prisma.CouponFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CouponPayload>[]
          }
          create: {
            args: Prisma.CouponCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CouponPayload>
          }
          createMany: {
            args: Prisma.CouponCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CouponCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CouponPayload>[]
          }
          delete: {
            args: Prisma.CouponDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CouponPayload>
          }
          update: {
            args: Prisma.CouponUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CouponPayload>
          }
          deleteMany: {
            args: Prisma.CouponDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CouponUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CouponUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CouponPayload>[]
          }
          upsert: {
            args: Prisma.CouponUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CouponPayload>
          }
          aggregate: {
            args: Prisma.CouponAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCoupon>
          }
          groupBy: {
            args: Prisma.CouponGroupByArgs<ExtArgs>
            result: $Utils.Optional<CouponGroupByOutputType>[]
          }
          count: {
            args: Prisma.CouponCountArgs<ExtArgs>
            result: $Utils.Optional<CouponCountAggregateOutputType> | number
          }
        }
      }
      CouponRedemption: {
        payload: Prisma.$CouponRedemptionPayload<ExtArgs>
        fields: Prisma.CouponRedemptionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CouponRedemptionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CouponRedemptionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CouponRedemptionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CouponRedemptionPayload>
          }
          findFirst: {
            args: Prisma.CouponRedemptionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CouponRedemptionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CouponRedemptionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CouponRedemptionPayload>
          }
          findMany: {
            args: Prisma.CouponRedemptionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CouponRedemptionPayload>[]
          }
          create: {
            args: Prisma.CouponRedemptionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CouponRedemptionPayload>
          }
          createMany: {
            args: Prisma.CouponRedemptionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CouponRedemptionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CouponRedemptionPayload>[]
          }
          delete: {
            args: Prisma.CouponRedemptionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CouponRedemptionPayload>
          }
          update: {
            args: Prisma.CouponRedemptionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CouponRedemptionPayload>
          }
          deleteMany: {
            args: Prisma.CouponRedemptionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CouponRedemptionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CouponRedemptionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CouponRedemptionPayload>[]
          }
          upsert: {
            args: Prisma.CouponRedemptionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CouponRedemptionPayload>
          }
          aggregate: {
            args: Prisma.CouponRedemptionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCouponRedemption>
          }
          groupBy: {
            args: Prisma.CouponRedemptionGroupByArgs<ExtArgs>
            result: $Utils.Optional<CouponRedemptionGroupByOutputType>[]
          }
          count: {
            args: Prisma.CouponRedemptionCountArgs<ExtArgs>
            result: $Utils.Optional<CouponRedemptionCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    coupon?: CouponOmit
    couponRedemption?: CouponRedemptionOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type CouponCountOutputType
   */

  export type CouponCountOutputType = {
    redemptions: number
  }

  export type CouponCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    redemptions?: boolean | CouponCountOutputTypeCountRedemptionsArgs
  }

  // Custom InputTypes
  /**
   * CouponCountOutputType without action
   */
  export type CouponCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CouponCountOutputType
     */
    select?: CouponCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CouponCountOutputType without action
   */
  export type CouponCountOutputTypeCountRedemptionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CouponRedemptionWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Coupon
   */

  export type AggregateCoupon = {
    _count: CouponCountAggregateOutputType | null
    _avg: CouponAvgAggregateOutputType | null
    _sum: CouponSumAggregateOutputType | null
    _min: CouponMinAggregateOutputType | null
    _max: CouponMaxAggregateOutputType | null
  }

  export type CouponAvgAggregateOutputType = {
    value: Decimal | null
    maxDiscount: Decimal | null
    minOrderValue: Decimal | null
    usageLimit: number | null
    perUserLimit: number | null
  }

  export type CouponSumAggregateOutputType = {
    value: Decimal | null
    maxDiscount: Decimal | null
    minOrderValue: Decimal | null
    usageLimit: number | null
    perUserLimit: number | null
  }

  export type CouponMinAggregateOutputType = {
    id: string | null
    code: string | null
    type: $Enums.CouponType | null
    scope: $Enums.CouponScope | null
    value: Decimal | null
    maxDiscount: Decimal | null
    minOrderValue: Decimal | null
    usageLimit: number | null
    perUserLimit: number | null
    startDate: Date | null
    endDate: Date | null
    isActive: boolean | null
    createdAt: Date | null
  }

  export type CouponMaxAggregateOutputType = {
    id: string | null
    code: string | null
    type: $Enums.CouponType | null
    scope: $Enums.CouponScope | null
    value: Decimal | null
    maxDiscount: Decimal | null
    minOrderValue: Decimal | null
    usageLimit: number | null
    perUserLimit: number | null
    startDate: Date | null
    endDate: Date | null
    isActive: boolean | null
    createdAt: Date | null
  }

  export type CouponCountAggregateOutputType = {
    id: number
    code: number
    type: number
    scope: number
    value: number
    maxDiscount: number
    minOrderValue: number
    usageLimit: number
    perUserLimit: number
    startDate: number
    endDate: number
    isActive: number
    createdAt: number
    _all: number
  }


  export type CouponAvgAggregateInputType = {
    value?: true
    maxDiscount?: true
    minOrderValue?: true
    usageLimit?: true
    perUserLimit?: true
  }

  export type CouponSumAggregateInputType = {
    value?: true
    maxDiscount?: true
    minOrderValue?: true
    usageLimit?: true
    perUserLimit?: true
  }

  export type CouponMinAggregateInputType = {
    id?: true
    code?: true
    type?: true
    scope?: true
    value?: true
    maxDiscount?: true
    minOrderValue?: true
    usageLimit?: true
    perUserLimit?: true
    startDate?: true
    endDate?: true
    isActive?: true
    createdAt?: true
  }

  export type CouponMaxAggregateInputType = {
    id?: true
    code?: true
    type?: true
    scope?: true
    value?: true
    maxDiscount?: true
    minOrderValue?: true
    usageLimit?: true
    perUserLimit?: true
    startDate?: true
    endDate?: true
    isActive?: true
    createdAt?: true
  }

  export type CouponCountAggregateInputType = {
    id?: true
    code?: true
    type?: true
    scope?: true
    value?: true
    maxDiscount?: true
    minOrderValue?: true
    usageLimit?: true
    perUserLimit?: true
    startDate?: true
    endDate?: true
    isActive?: true
    createdAt?: true
    _all?: true
  }

  export type CouponAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Coupon to aggregate.
     */
    where?: CouponWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Coupons to fetch.
     */
    orderBy?: CouponOrderByWithRelationInput | CouponOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CouponWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Coupons from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Coupons.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Coupons
    **/
    _count?: true | CouponCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CouponAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CouponSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CouponMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CouponMaxAggregateInputType
  }

  export type GetCouponAggregateType<T extends CouponAggregateArgs> = {
        [P in keyof T & keyof AggregateCoupon]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCoupon[P]>
      : GetScalarType<T[P], AggregateCoupon[P]>
  }




  export type CouponGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CouponWhereInput
    orderBy?: CouponOrderByWithAggregationInput | CouponOrderByWithAggregationInput[]
    by: CouponScalarFieldEnum[] | CouponScalarFieldEnum
    having?: CouponScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CouponCountAggregateInputType | true
    _avg?: CouponAvgAggregateInputType
    _sum?: CouponSumAggregateInputType
    _min?: CouponMinAggregateInputType
    _max?: CouponMaxAggregateInputType
  }

  export type CouponGroupByOutputType = {
    id: string
    code: string
    type: $Enums.CouponType
    scope: $Enums.CouponScope
    value: Decimal
    maxDiscount: Decimal | null
    minOrderValue: Decimal | null
    usageLimit: number | null
    perUserLimit: number | null
    startDate: Date
    endDate: Date
    isActive: boolean
    createdAt: Date
    _count: CouponCountAggregateOutputType | null
    _avg: CouponAvgAggregateOutputType | null
    _sum: CouponSumAggregateOutputType | null
    _min: CouponMinAggregateOutputType | null
    _max: CouponMaxAggregateOutputType | null
  }

  type GetCouponGroupByPayload<T extends CouponGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CouponGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CouponGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CouponGroupByOutputType[P]>
            : GetScalarType<T[P], CouponGroupByOutputType[P]>
        }
      >
    >


  export type CouponSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    type?: boolean
    scope?: boolean
    value?: boolean
    maxDiscount?: boolean
    minOrderValue?: boolean
    usageLimit?: boolean
    perUserLimit?: boolean
    startDate?: boolean
    endDate?: boolean
    isActive?: boolean
    createdAt?: boolean
    redemptions?: boolean | Coupon$redemptionsArgs<ExtArgs>
    _count?: boolean | CouponCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["coupon"]>

  export type CouponSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    type?: boolean
    scope?: boolean
    value?: boolean
    maxDiscount?: boolean
    minOrderValue?: boolean
    usageLimit?: boolean
    perUserLimit?: boolean
    startDate?: boolean
    endDate?: boolean
    isActive?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["coupon"]>

  export type CouponSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    type?: boolean
    scope?: boolean
    value?: boolean
    maxDiscount?: boolean
    minOrderValue?: boolean
    usageLimit?: boolean
    perUserLimit?: boolean
    startDate?: boolean
    endDate?: boolean
    isActive?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["coupon"]>

  export type CouponSelectScalar = {
    id?: boolean
    code?: boolean
    type?: boolean
    scope?: boolean
    value?: boolean
    maxDiscount?: boolean
    minOrderValue?: boolean
    usageLimit?: boolean
    perUserLimit?: boolean
    startDate?: boolean
    endDate?: boolean
    isActive?: boolean
    createdAt?: boolean
  }

  export type CouponOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "code" | "type" | "scope" | "value" | "maxDiscount" | "minOrderValue" | "usageLimit" | "perUserLimit" | "startDate" | "endDate" | "isActive" | "createdAt", ExtArgs["result"]["coupon"]>
  export type CouponInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    redemptions?: boolean | Coupon$redemptionsArgs<ExtArgs>
    _count?: boolean | CouponCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CouponIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type CouponIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $CouponPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Coupon"
    objects: {
      redemptions: Prisma.$CouponRedemptionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      code: string
      type: $Enums.CouponType
      scope: $Enums.CouponScope
      value: Prisma.Decimal
      maxDiscount: Prisma.Decimal | null
      minOrderValue: Prisma.Decimal | null
      usageLimit: number | null
      perUserLimit: number | null
      startDate: Date
      endDate: Date
      isActive: boolean
      createdAt: Date
    }, ExtArgs["result"]["coupon"]>
    composites: {}
  }

  type CouponGetPayload<S extends boolean | null | undefined | CouponDefaultArgs> = $Result.GetResult<Prisma.$CouponPayload, S>

  type CouponCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CouponFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CouponCountAggregateInputType | true
    }

  export interface CouponDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Coupon'], meta: { name: 'Coupon' } }
    /**
     * Find zero or one Coupon that matches the filter.
     * @param {CouponFindUniqueArgs} args - Arguments to find a Coupon
     * @example
     * // Get one Coupon
     * const coupon = await prisma.coupon.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CouponFindUniqueArgs>(args: SelectSubset<T, CouponFindUniqueArgs<ExtArgs>>): Prisma__CouponClient<$Result.GetResult<Prisma.$CouponPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Coupon that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CouponFindUniqueOrThrowArgs} args - Arguments to find a Coupon
     * @example
     * // Get one Coupon
     * const coupon = await prisma.coupon.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CouponFindUniqueOrThrowArgs>(args: SelectSubset<T, CouponFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CouponClient<$Result.GetResult<Prisma.$CouponPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Coupon that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CouponFindFirstArgs} args - Arguments to find a Coupon
     * @example
     * // Get one Coupon
     * const coupon = await prisma.coupon.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CouponFindFirstArgs>(args?: SelectSubset<T, CouponFindFirstArgs<ExtArgs>>): Prisma__CouponClient<$Result.GetResult<Prisma.$CouponPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Coupon that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CouponFindFirstOrThrowArgs} args - Arguments to find a Coupon
     * @example
     * // Get one Coupon
     * const coupon = await prisma.coupon.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CouponFindFirstOrThrowArgs>(args?: SelectSubset<T, CouponFindFirstOrThrowArgs<ExtArgs>>): Prisma__CouponClient<$Result.GetResult<Prisma.$CouponPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Coupons that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CouponFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Coupons
     * const coupons = await prisma.coupon.findMany()
     * 
     * // Get first 10 Coupons
     * const coupons = await prisma.coupon.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const couponWithIdOnly = await prisma.coupon.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CouponFindManyArgs>(args?: SelectSubset<T, CouponFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CouponPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Coupon.
     * @param {CouponCreateArgs} args - Arguments to create a Coupon.
     * @example
     * // Create one Coupon
     * const Coupon = await prisma.coupon.create({
     *   data: {
     *     // ... data to create a Coupon
     *   }
     * })
     * 
     */
    create<T extends CouponCreateArgs>(args: SelectSubset<T, CouponCreateArgs<ExtArgs>>): Prisma__CouponClient<$Result.GetResult<Prisma.$CouponPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Coupons.
     * @param {CouponCreateManyArgs} args - Arguments to create many Coupons.
     * @example
     * // Create many Coupons
     * const coupon = await prisma.coupon.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CouponCreateManyArgs>(args?: SelectSubset<T, CouponCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Coupons and returns the data saved in the database.
     * @param {CouponCreateManyAndReturnArgs} args - Arguments to create many Coupons.
     * @example
     * // Create many Coupons
     * const coupon = await prisma.coupon.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Coupons and only return the `id`
     * const couponWithIdOnly = await prisma.coupon.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CouponCreateManyAndReturnArgs>(args?: SelectSubset<T, CouponCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CouponPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Coupon.
     * @param {CouponDeleteArgs} args - Arguments to delete one Coupon.
     * @example
     * // Delete one Coupon
     * const Coupon = await prisma.coupon.delete({
     *   where: {
     *     // ... filter to delete one Coupon
     *   }
     * })
     * 
     */
    delete<T extends CouponDeleteArgs>(args: SelectSubset<T, CouponDeleteArgs<ExtArgs>>): Prisma__CouponClient<$Result.GetResult<Prisma.$CouponPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Coupon.
     * @param {CouponUpdateArgs} args - Arguments to update one Coupon.
     * @example
     * // Update one Coupon
     * const coupon = await prisma.coupon.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CouponUpdateArgs>(args: SelectSubset<T, CouponUpdateArgs<ExtArgs>>): Prisma__CouponClient<$Result.GetResult<Prisma.$CouponPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Coupons.
     * @param {CouponDeleteManyArgs} args - Arguments to filter Coupons to delete.
     * @example
     * // Delete a few Coupons
     * const { count } = await prisma.coupon.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CouponDeleteManyArgs>(args?: SelectSubset<T, CouponDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Coupons.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CouponUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Coupons
     * const coupon = await prisma.coupon.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CouponUpdateManyArgs>(args: SelectSubset<T, CouponUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Coupons and returns the data updated in the database.
     * @param {CouponUpdateManyAndReturnArgs} args - Arguments to update many Coupons.
     * @example
     * // Update many Coupons
     * const coupon = await prisma.coupon.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Coupons and only return the `id`
     * const couponWithIdOnly = await prisma.coupon.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CouponUpdateManyAndReturnArgs>(args: SelectSubset<T, CouponUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CouponPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Coupon.
     * @param {CouponUpsertArgs} args - Arguments to update or create a Coupon.
     * @example
     * // Update or create a Coupon
     * const coupon = await prisma.coupon.upsert({
     *   create: {
     *     // ... data to create a Coupon
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Coupon we want to update
     *   }
     * })
     */
    upsert<T extends CouponUpsertArgs>(args: SelectSubset<T, CouponUpsertArgs<ExtArgs>>): Prisma__CouponClient<$Result.GetResult<Prisma.$CouponPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Coupons.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CouponCountArgs} args - Arguments to filter Coupons to count.
     * @example
     * // Count the number of Coupons
     * const count = await prisma.coupon.count({
     *   where: {
     *     // ... the filter for the Coupons we want to count
     *   }
     * })
    **/
    count<T extends CouponCountArgs>(
      args?: Subset<T, CouponCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CouponCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Coupon.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CouponAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CouponAggregateArgs>(args: Subset<T, CouponAggregateArgs>): Prisma.PrismaPromise<GetCouponAggregateType<T>>

    /**
     * Group by Coupon.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CouponGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CouponGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CouponGroupByArgs['orderBy'] }
        : { orderBy?: CouponGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CouponGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCouponGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Coupon model
   */
  readonly fields: CouponFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Coupon.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CouponClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    redemptions<T extends Coupon$redemptionsArgs<ExtArgs> = {}>(args?: Subset<T, Coupon$redemptionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CouponRedemptionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Coupon model
   */
  interface CouponFieldRefs {
    readonly id: FieldRef<"Coupon", 'String'>
    readonly code: FieldRef<"Coupon", 'String'>
    readonly type: FieldRef<"Coupon", 'CouponType'>
    readonly scope: FieldRef<"Coupon", 'CouponScope'>
    readonly value: FieldRef<"Coupon", 'Decimal'>
    readonly maxDiscount: FieldRef<"Coupon", 'Decimal'>
    readonly minOrderValue: FieldRef<"Coupon", 'Decimal'>
    readonly usageLimit: FieldRef<"Coupon", 'Int'>
    readonly perUserLimit: FieldRef<"Coupon", 'Int'>
    readonly startDate: FieldRef<"Coupon", 'DateTime'>
    readonly endDate: FieldRef<"Coupon", 'DateTime'>
    readonly isActive: FieldRef<"Coupon", 'Boolean'>
    readonly createdAt: FieldRef<"Coupon", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Coupon findUnique
   */
  export type CouponFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Coupon
     */
    select?: CouponSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Coupon
     */
    omit?: CouponOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CouponInclude<ExtArgs> | null
    /**
     * Filter, which Coupon to fetch.
     */
    where: CouponWhereUniqueInput
  }

  /**
   * Coupon findUniqueOrThrow
   */
  export type CouponFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Coupon
     */
    select?: CouponSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Coupon
     */
    omit?: CouponOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CouponInclude<ExtArgs> | null
    /**
     * Filter, which Coupon to fetch.
     */
    where: CouponWhereUniqueInput
  }

  /**
   * Coupon findFirst
   */
  export type CouponFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Coupon
     */
    select?: CouponSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Coupon
     */
    omit?: CouponOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CouponInclude<ExtArgs> | null
    /**
     * Filter, which Coupon to fetch.
     */
    where?: CouponWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Coupons to fetch.
     */
    orderBy?: CouponOrderByWithRelationInput | CouponOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Coupons.
     */
    cursor?: CouponWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Coupons from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Coupons.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Coupons.
     */
    distinct?: CouponScalarFieldEnum | CouponScalarFieldEnum[]
  }

  /**
   * Coupon findFirstOrThrow
   */
  export type CouponFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Coupon
     */
    select?: CouponSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Coupon
     */
    omit?: CouponOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CouponInclude<ExtArgs> | null
    /**
     * Filter, which Coupon to fetch.
     */
    where?: CouponWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Coupons to fetch.
     */
    orderBy?: CouponOrderByWithRelationInput | CouponOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Coupons.
     */
    cursor?: CouponWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Coupons from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Coupons.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Coupons.
     */
    distinct?: CouponScalarFieldEnum | CouponScalarFieldEnum[]
  }

  /**
   * Coupon findMany
   */
  export type CouponFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Coupon
     */
    select?: CouponSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Coupon
     */
    omit?: CouponOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CouponInclude<ExtArgs> | null
    /**
     * Filter, which Coupons to fetch.
     */
    where?: CouponWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Coupons to fetch.
     */
    orderBy?: CouponOrderByWithRelationInput | CouponOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Coupons.
     */
    cursor?: CouponWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Coupons from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Coupons.
     */
    skip?: number
    distinct?: CouponScalarFieldEnum | CouponScalarFieldEnum[]
  }

  /**
   * Coupon create
   */
  export type CouponCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Coupon
     */
    select?: CouponSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Coupon
     */
    omit?: CouponOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CouponInclude<ExtArgs> | null
    /**
     * The data needed to create a Coupon.
     */
    data: XOR<CouponCreateInput, CouponUncheckedCreateInput>
  }

  /**
   * Coupon createMany
   */
  export type CouponCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Coupons.
     */
    data: CouponCreateManyInput | CouponCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Coupon createManyAndReturn
   */
  export type CouponCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Coupon
     */
    select?: CouponSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Coupon
     */
    omit?: CouponOmit<ExtArgs> | null
    /**
     * The data used to create many Coupons.
     */
    data: CouponCreateManyInput | CouponCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Coupon update
   */
  export type CouponUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Coupon
     */
    select?: CouponSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Coupon
     */
    omit?: CouponOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CouponInclude<ExtArgs> | null
    /**
     * The data needed to update a Coupon.
     */
    data: XOR<CouponUpdateInput, CouponUncheckedUpdateInput>
    /**
     * Choose, which Coupon to update.
     */
    where: CouponWhereUniqueInput
  }

  /**
   * Coupon updateMany
   */
  export type CouponUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Coupons.
     */
    data: XOR<CouponUpdateManyMutationInput, CouponUncheckedUpdateManyInput>
    /**
     * Filter which Coupons to update
     */
    where?: CouponWhereInput
    /**
     * Limit how many Coupons to update.
     */
    limit?: number
  }

  /**
   * Coupon updateManyAndReturn
   */
  export type CouponUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Coupon
     */
    select?: CouponSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Coupon
     */
    omit?: CouponOmit<ExtArgs> | null
    /**
     * The data used to update Coupons.
     */
    data: XOR<CouponUpdateManyMutationInput, CouponUncheckedUpdateManyInput>
    /**
     * Filter which Coupons to update
     */
    where?: CouponWhereInput
    /**
     * Limit how many Coupons to update.
     */
    limit?: number
  }

  /**
   * Coupon upsert
   */
  export type CouponUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Coupon
     */
    select?: CouponSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Coupon
     */
    omit?: CouponOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CouponInclude<ExtArgs> | null
    /**
     * The filter to search for the Coupon to update in case it exists.
     */
    where: CouponWhereUniqueInput
    /**
     * In case the Coupon found by the `where` argument doesn't exist, create a new Coupon with this data.
     */
    create: XOR<CouponCreateInput, CouponUncheckedCreateInput>
    /**
     * In case the Coupon was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CouponUpdateInput, CouponUncheckedUpdateInput>
  }

  /**
   * Coupon delete
   */
  export type CouponDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Coupon
     */
    select?: CouponSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Coupon
     */
    omit?: CouponOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CouponInclude<ExtArgs> | null
    /**
     * Filter which Coupon to delete.
     */
    where: CouponWhereUniqueInput
  }

  /**
   * Coupon deleteMany
   */
  export type CouponDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Coupons to delete
     */
    where?: CouponWhereInput
    /**
     * Limit how many Coupons to delete.
     */
    limit?: number
  }

  /**
   * Coupon.redemptions
   */
  export type Coupon$redemptionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CouponRedemption
     */
    select?: CouponRedemptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CouponRedemption
     */
    omit?: CouponRedemptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CouponRedemptionInclude<ExtArgs> | null
    where?: CouponRedemptionWhereInput
    orderBy?: CouponRedemptionOrderByWithRelationInput | CouponRedemptionOrderByWithRelationInput[]
    cursor?: CouponRedemptionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CouponRedemptionScalarFieldEnum | CouponRedemptionScalarFieldEnum[]
  }

  /**
   * Coupon without action
   */
  export type CouponDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Coupon
     */
    select?: CouponSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Coupon
     */
    omit?: CouponOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CouponInclude<ExtArgs> | null
  }


  /**
   * Model CouponRedemption
   */

  export type AggregateCouponRedemption = {
    _count: CouponRedemptionCountAggregateOutputType | null
    _min: CouponRedemptionMinAggregateOutputType | null
    _max: CouponRedemptionMaxAggregateOutputType | null
  }

  export type CouponRedemptionMinAggregateOutputType = {
    id: string | null
    couponId: string | null
    userId: string | null
    orderId: string | null
    redeemedAt: Date | null
  }

  export type CouponRedemptionMaxAggregateOutputType = {
    id: string | null
    couponId: string | null
    userId: string | null
    orderId: string | null
    redeemedAt: Date | null
  }

  export type CouponRedemptionCountAggregateOutputType = {
    id: number
    couponId: number
    userId: number
    orderId: number
    redeemedAt: number
    _all: number
  }


  export type CouponRedemptionMinAggregateInputType = {
    id?: true
    couponId?: true
    userId?: true
    orderId?: true
    redeemedAt?: true
  }

  export type CouponRedemptionMaxAggregateInputType = {
    id?: true
    couponId?: true
    userId?: true
    orderId?: true
    redeemedAt?: true
  }

  export type CouponRedemptionCountAggregateInputType = {
    id?: true
    couponId?: true
    userId?: true
    orderId?: true
    redeemedAt?: true
    _all?: true
  }

  export type CouponRedemptionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CouponRedemption to aggregate.
     */
    where?: CouponRedemptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CouponRedemptions to fetch.
     */
    orderBy?: CouponRedemptionOrderByWithRelationInput | CouponRedemptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CouponRedemptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CouponRedemptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CouponRedemptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CouponRedemptions
    **/
    _count?: true | CouponRedemptionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CouponRedemptionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CouponRedemptionMaxAggregateInputType
  }

  export type GetCouponRedemptionAggregateType<T extends CouponRedemptionAggregateArgs> = {
        [P in keyof T & keyof AggregateCouponRedemption]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCouponRedemption[P]>
      : GetScalarType<T[P], AggregateCouponRedemption[P]>
  }




  export type CouponRedemptionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CouponRedemptionWhereInput
    orderBy?: CouponRedemptionOrderByWithAggregationInput | CouponRedemptionOrderByWithAggregationInput[]
    by: CouponRedemptionScalarFieldEnum[] | CouponRedemptionScalarFieldEnum
    having?: CouponRedemptionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CouponRedemptionCountAggregateInputType | true
    _min?: CouponRedemptionMinAggregateInputType
    _max?: CouponRedemptionMaxAggregateInputType
  }

  export type CouponRedemptionGroupByOutputType = {
    id: string
    couponId: string
    userId: string
    orderId: string
    redeemedAt: Date
    _count: CouponRedemptionCountAggregateOutputType | null
    _min: CouponRedemptionMinAggregateOutputType | null
    _max: CouponRedemptionMaxAggregateOutputType | null
  }

  type GetCouponRedemptionGroupByPayload<T extends CouponRedemptionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CouponRedemptionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CouponRedemptionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CouponRedemptionGroupByOutputType[P]>
            : GetScalarType<T[P], CouponRedemptionGroupByOutputType[P]>
        }
      >
    >


  export type CouponRedemptionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    couponId?: boolean
    userId?: boolean
    orderId?: boolean
    redeemedAt?: boolean
    coupon?: boolean | CouponDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["couponRedemption"]>

  export type CouponRedemptionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    couponId?: boolean
    userId?: boolean
    orderId?: boolean
    redeemedAt?: boolean
    coupon?: boolean | CouponDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["couponRedemption"]>

  export type CouponRedemptionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    couponId?: boolean
    userId?: boolean
    orderId?: boolean
    redeemedAt?: boolean
    coupon?: boolean | CouponDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["couponRedemption"]>

  export type CouponRedemptionSelectScalar = {
    id?: boolean
    couponId?: boolean
    userId?: boolean
    orderId?: boolean
    redeemedAt?: boolean
  }

  export type CouponRedemptionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "couponId" | "userId" | "orderId" | "redeemedAt", ExtArgs["result"]["couponRedemption"]>
  export type CouponRedemptionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    coupon?: boolean | CouponDefaultArgs<ExtArgs>
  }
  export type CouponRedemptionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    coupon?: boolean | CouponDefaultArgs<ExtArgs>
  }
  export type CouponRedemptionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    coupon?: boolean | CouponDefaultArgs<ExtArgs>
  }

  export type $CouponRedemptionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CouponRedemption"
    objects: {
      coupon: Prisma.$CouponPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      couponId: string
      userId: string
      orderId: string
      redeemedAt: Date
    }, ExtArgs["result"]["couponRedemption"]>
    composites: {}
  }

  type CouponRedemptionGetPayload<S extends boolean | null | undefined | CouponRedemptionDefaultArgs> = $Result.GetResult<Prisma.$CouponRedemptionPayload, S>

  type CouponRedemptionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CouponRedemptionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CouponRedemptionCountAggregateInputType | true
    }

  export interface CouponRedemptionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CouponRedemption'], meta: { name: 'CouponRedemption' } }
    /**
     * Find zero or one CouponRedemption that matches the filter.
     * @param {CouponRedemptionFindUniqueArgs} args - Arguments to find a CouponRedemption
     * @example
     * // Get one CouponRedemption
     * const couponRedemption = await prisma.couponRedemption.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CouponRedemptionFindUniqueArgs>(args: SelectSubset<T, CouponRedemptionFindUniqueArgs<ExtArgs>>): Prisma__CouponRedemptionClient<$Result.GetResult<Prisma.$CouponRedemptionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CouponRedemption that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CouponRedemptionFindUniqueOrThrowArgs} args - Arguments to find a CouponRedemption
     * @example
     * // Get one CouponRedemption
     * const couponRedemption = await prisma.couponRedemption.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CouponRedemptionFindUniqueOrThrowArgs>(args: SelectSubset<T, CouponRedemptionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CouponRedemptionClient<$Result.GetResult<Prisma.$CouponRedemptionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CouponRedemption that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CouponRedemptionFindFirstArgs} args - Arguments to find a CouponRedemption
     * @example
     * // Get one CouponRedemption
     * const couponRedemption = await prisma.couponRedemption.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CouponRedemptionFindFirstArgs>(args?: SelectSubset<T, CouponRedemptionFindFirstArgs<ExtArgs>>): Prisma__CouponRedemptionClient<$Result.GetResult<Prisma.$CouponRedemptionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CouponRedemption that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CouponRedemptionFindFirstOrThrowArgs} args - Arguments to find a CouponRedemption
     * @example
     * // Get one CouponRedemption
     * const couponRedemption = await prisma.couponRedemption.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CouponRedemptionFindFirstOrThrowArgs>(args?: SelectSubset<T, CouponRedemptionFindFirstOrThrowArgs<ExtArgs>>): Prisma__CouponRedemptionClient<$Result.GetResult<Prisma.$CouponRedemptionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CouponRedemptions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CouponRedemptionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CouponRedemptions
     * const couponRedemptions = await prisma.couponRedemption.findMany()
     * 
     * // Get first 10 CouponRedemptions
     * const couponRedemptions = await prisma.couponRedemption.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const couponRedemptionWithIdOnly = await prisma.couponRedemption.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CouponRedemptionFindManyArgs>(args?: SelectSubset<T, CouponRedemptionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CouponRedemptionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CouponRedemption.
     * @param {CouponRedemptionCreateArgs} args - Arguments to create a CouponRedemption.
     * @example
     * // Create one CouponRedemption
     * const CouponRedemption = await prisma.couponRedemption.create({
     *   data: {
     *     // ... data to create a CouponRedemption
     *   }
     * })
     * 
     */
    create<T extends CouponRedemptionCreateArgs>(args: SelectSubset<T, CouponRedemptionCreateArgs<ExtArgs>>): Prisma__CouponRedemptionClient<$Result.GetResult<Prisma.$CouponRedemptionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CouponRedemptions.
     * @param {CouponRedemptionCreateManyArgs} args - Arguments to create many CouponRedemptions.
     * @example
     * // Create many CouponRedemptions
     * const couponRedemption = await prisma.couponRedemption.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CouponRedemptionCreateManyArgs>(args?: SelectSubset<T, CouponRedemptionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CouponRedemptions and returns the data saved in the database.
     * @param {CouponRedemptionCreateManyAndReturnArgs} args - Arguments to create many CouponRedemptions.
     * @example
     * // Create many CouponRedemptions
     * const couponRedemption = await prisma.couponRedemption.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CouponRedemptions and only return the `id`
     * const couponRedemptionWithIdOnly = await prisma.couponRedemption.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CouponRedemptionCreateManyAndReturnArgs>(args?: SelectSubset<T, CouponRedemptionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CouponRedemptionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a CouponRedemption.
     * @param {CouponRedemptionDeleteArgs} args - Arguments to delete one CouponRedemption.
     * @example
     * // Delete one CouponRedemption
     * const CouponRedemption = await prisma.couponRedemption.delete({
     *   where: {
     *     // ... filter to delete one CouponRedemption
     *   }
     * })
     * 
     */
    delete<T extends CouponRedemptionDeleteArgs>(args: SelectSubset<T, CouponRedemptionDeleteArgs<ExtArgs>>): Prisma__CouponRedemptionClient<$Result.GetResult<Prisma.$CouponRedemptionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CouponRedemption.
     * @param {CouponRedemptionUpdateArgs} args - Arguments to update one CouponRedemption.
     * @example
     * // Update one CouponRedemption
     * const couponRedemption = await prisma.couponRedemption.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CouponRedemptionUpdateArgs>(args: SelectSubset<T, CouponRedemptionUpdateArgs<ExtArgs>>): Prisma__CouponRedemptionClient<$Result.GetResult<Prisma.$CouponRedemptionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CouponRedemptions.
     * @param {CouponRedemptionDeleteManyArgs} args - Arguments to filter CouponRedemptions to delete.
     * @example
     * // Delete a few CouponRedemptions
     * const { count } = await prisma.couponRedemption.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CouponRedemptionDeleteManyArgs>(args?: SelectSubset<T, CouponRedemptionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CouponRedemptions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CouponRedemptionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CouponRedemptions
     * const couponRedemption = await prisma.couponRedemption.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CouponRedemptionUpdateManyArgs>(args: SelectSubset<T, CouponRedemptionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CouponRedemptions and returns the data updated in the database.
     * @param {CouponRedemptionUpdateManyAndReturnArgs} args - Arguments to update many CouponRedemptions.
     * @example
     * // Update many CouponRedemptions
     * const couponRedemption = await prisma.couponRedemption.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more CouponRedemptions and only return the `id`
     * const couponRedemptionWithIdOnly = await prisma.couponRedemption.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CouponRedemptionUpdateManyAndReturnArgs>(args: SelectSubset<T, CouponRedemptionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CouponRedemptionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one CouponRedemption.
     * @param {CouponRedemptionUpsertArgs} args - Arguments to update or create a CouponRedemption.
     * @example
     * // Update or create a CouponRedemption
     * const couponRedemption = await prisma.couponRedemption.upsert({
     *   create: {
     *     // ... data to create a CouponRedemption
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CouponRedemption we want to update
     *   }
     * })
     */
    upsert<T extends CouponRedemptionUpsertArgs>(args: SelectSubset<T, CouponRedemptionUpsertArgs<ExtArgs>>): Prisma__CouponRedemptionClient<$Result.GetResult<Prisma.$CouponRedemptionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of CouponRedemptions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CouponRedemptionCountArgs} args - Arguments to filter CouponRedemptions to count.
     * @example
     * // Count the number of CouponRedemptions
     * const count = await prisma.couponRedemption.count({
     *   where: {
     *     // ... the filter for the CouponRedemptions we want to count
     *   }
     * })
    **/
    count<T extends CouponRedemptionCountArgs>(
      args?: Subset<T, CouponRedemptionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CouponRedemptionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CouponRedemption.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CouponRedemptionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CouponRedemptionAggregateArgs>(args: Subset<T, CouponRedemptionAggregateArgs>): Prisma.PrismaPromise<GetCouponRedemptionAggregateType<T>>

    /**
     * Group by CouponRedemption.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CouponRedemptionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CouponRedemptionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CouponRedemptionGroupByArgs['orderBy'] }
        : { orderBy?: CouponRedemptionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CouponRedemptionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCouponRedemptionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CouponRedemption model
   */
  readonly fields: CouponRedemptionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CouponRedemption.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CouponRedemptionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    coupon<T extends CouponDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CouponDefaultArgs<ExtArgs>>): Prisma__CouponClient<$Result.GetResult<Prisma.$CouponPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CouponRedemption model
   */
  interface CouponRedemptionFieldRefs {
    readonly id: FieldRef<"CouponRedemption", 'String'>
    readonly couponId: FieldRef<"CouponRedemption", 'String'>
    readonly userId: FieldRef<"CouponRedemption", 'String'>
    readonly orderId: FieldRef<"CouponRedemption", 'String'>
    readonly redeemedAt: FieldRef<"CouponRedemption", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * CouponRedemption findUnique
   */
  export type CouponRedemptionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CouponRedemption
     */
    select?: CouponRedemptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CouponRedemption
     */
    omit?: CouponRedemptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CouponRedemptionInclude<ExtArgs> | null
    /**
     * Filter, which CouponRedemption to fetch.
     */
    where: CouponRedemptionWhereUniqueInput
  }

  /**
   * CouponRedemption findUniqueOrThrow
   */
  export type CouponRedemptionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CouponRedemption
     */
    select?: CouponRedemptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CouponRedemption
     */
    omit?: CouponRedemptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CouponRedemptionInclude<ExtArgs> | null
    /**
     * Filter, which CouponRedemption to fetch.
     */
    where: CouponRedemptionWhereUniqueInput
  }

  /**
   * CouponRedemption findFirst
   */
  export type CouponRedemptionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CouponRedemption
     */
    select?: CouponRedemptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CouponRedemption
     */
    omit?: CouponRedemptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CouponRedemptionInclude<ExtArgs> | null
    /**
     * Filter, which CouponRedemption to fetch.
     */
    where?: CouponRedemptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CouponRedemptions to fetch.
     */
    orderBy?: CouponRedemptionOrderByWithRelationInput | CouponRedemptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CouponRedemptions.
     */
    cursor?: CouponRedemptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CouponRedemptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CouponRedemptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CouponRedemptions.
     */
    distinct?: CouponRedemptionScalarFieldEnum | CouponRedemptionScalarFieldEnum[]
  }

  /**
   * CouponRedemption findFirstOrThrow
   */
  export type CouponRedemptionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CouponRedemption
     */
    select?: CouponRedemptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CouponRedemption
     */
    omit?: CouponRedemptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CouponRedemptionInclude<ExtArgs> | null
    /**
     * Filter, which CouponRedemption to fetch.
     */
    where?: CouponRedemptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CouponRedemptions to fetch.
     */
    orderBy?: CouponRedemptionOrderByWithRelationInput | CouponRedemptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CouponRedemptions.
     */
    cursor?: CouponRedemptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CouponRedemptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CouponRedemptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CouponRedemptions.
     */
    distinct?: CouponRedemptionScalarFieldEnum | CouponRedemptionScalarFieldEnum[]
  }

  /**
   * CouponRedemption findMany
   */
  export type CouponRedemptionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CouponRedemption
     */
    select?: CouponRedemptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CouponRedemption
     */
    omit?: CouponRedemptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CouponRedemptionInclude<ExtArgs> | null
    /**
     * Filter, which CouponRedemptions to fetch.
     */
    where?: CouponRedemptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CouponRedemptions to fetch.
     */
    orderBy?: CouponRedemptionOrderByWithRelationInput | CouponRedemptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CouponRedemptions.
     */
    cursor?: CouponRedemptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CouponRedemptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CouponRedemptions.
     */
    skip?: number
    distinct?: CouponRedemptionScalarFieldEnum | CouponRedemptionScalarFieldEnum[]
  }

  /**
   * CouponRedemption create
   */
  export type CouponRedemptionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CouponRedemption
     */
    select?: CouponRedemptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CouponRedemption
     */
    omit?: CouponRedemptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CouponRedemptionInclude<ExtArgs> | null
    /**
     * The data needed to create a CouponRedemption.
     */
    data: XOR<CouponRedemptionCreateInput, CouponRedemptionUncheckedCreateInput>
  }

  /**
   * CouponRedemption createMany
   */
  export type CouponRedemptionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CouponRedemptions.
     */
    data: CouponRedemptionCreateManyInput | CouponRedemptionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CouponRedemption createManyAndReturn
   */
  export type CouponRedemptionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CouponRedemption
     */
    select?: CouponRedemptionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CouponRedemption
     */
    omit?: CouponRedemptionOmit<ExtArgs> | null
    /**
     * The data used to create many CouponRedemptions.
     */
    data: CouponRedemptionCreateManyInput | CouponRedemptionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CouponRedemptionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * CouponRedemption update
   */
  export type CouponRedemptionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CouponRedemption
     */
    select?: CouponRedemptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CouponRedemption
     */
    omit?: CouponRedemptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CouponRedemptionInclude<ExtArgs> | null
    /**
     * The data needed to update a CouponRedemption.
     */
    data: XOR<CouponRedemptionUpdateInput, CouponRedemptionUncheckedUpdateInput>
    /**
     * Choose, which CouponRedemption to update.
     */
    where: CouponRedemptionWhereUniqueInput
  }

  /**
   * CouponRedemption updateMany
   */
  export type CouponRedemptionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CouponRedemptions.
     */
    data: XOR<CouponRedemptionUpdateManyMutationInput, CouponRedemptionUncheckedUpdateManyInput>
    /**
     * Filter which CouponRedemptions to update
     */
    where?: CouponRedemptionWhereInput
    /**
     * Limit how many CouponRedemptions to update.
     */
    limit?: number
  }

  /**
   * CouponRedemption updateManyAndReturn
   */
  export type CouponRedemptionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CouponRedemption
     */
    select?: CouponRedemptionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CouponRedemption
     */
    omit?: CouponRedemptionOmit<ExtArgs> | null
    /**
     * The data used to update CouponRedemptions.
     */
    data: XOR<CouponRedemptionUpdateManyMutationInput, CouponRedemptionUncheckedUpdateManyInput>
    /**
     * Filter which CouponRedemptions to update
     */
    where?: CouponRedemptionWhereInput
    /**
     * Limit how many CouponRedemptions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CouponRedemptionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * CouponRedemption upsert
   */
  export type CouponRedemptionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CouponRedemption
     */
    select?: CouponRedemptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CouponRedemption
     */
    omit?: CouponRedemptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CouponRedemptionInclude<ExtArgs> | null
    /**
     * The filter to search for the CouponRedemption to update in case it exists.
     */
    where: CouponRedemptionWhereUniqueInput
    /**
     * In case the CouponRedemption found by the `where` argument doesn't exist, create a new CouponRedemption with this data.
     */
    create: XOR<CouponRedemptionCreateInput, CouponRedemptionUncheckedCreateInput>
    /**
     * In case the CouponRedemption was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CouponRedemptionUpdateInput, CouponRedemptionUncheckedUpdateInput>
  }

  /**
   * CouponRedemption delete
   */
  export type CouponRedemptionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CouponRedemption
     */
    select?: CouponRedemptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CouponRedemption
     */
    omit?: CouponRedemptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CouponRedemptionInclude<ExtArgs> | null
    /**
     * Filter which CouponRedemption to delete.
     */
    where: CouponRedemptionWhereUniqueInput
  }

  /**
   * CouponRedemption deleteMany
   */
  export type CouponRedemptionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CouponRedemptions to delete
     */
    where?: CouponRedemptionWhereInput
    /**
     * Limit how many CouponRedemptions to delete.
     */
    limit?: number
  }

  /**
   * CouponRedemption without action
   */
  export type CouponRedemptionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CouponRedemption
     */
    select?: CouponRedemptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CouponRedemption
     */
    omit?: CouponRedemptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CouponRedemptionInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const CouponScalarFieldEnum: {
    id: 'id',
    code: 'code',
    type: 'type',
    scope: 'scope',
    value: 'value',
    maxDiscount: 'maxDiscount',
    minOrderValue: 'minOrderValue',
    usageLimit: 'usageLimit',
    perUserLimit: 'perUserLimit',
    startDate: 'startDate',
    endDate: 'endDate',
    isActive: 'isActive',
    createdAt: 'createdAt'
  };

  export type CouponScalarFieldEnum = (typeof CouponScalarFieldEnum)[keyof typeof CouponScalarFieldEnum]


  export const CouponRedemptionScalarFieldEnum: {
    id: 'id',
    couponId: 'couponId',
    userId: 'userId',
    orderId: 'orderId',
    redeemedAt: 'redeemedAt'
  };

  export type CouponRedemptionScalarFieldEnum = (typeof CouponRedemptionScalarFieldEnum)[keyof typeof CouponRedemptionScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'CouponType'
   */
  export type EnumCouponTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CouponType'>
    


  /**
   * Reference to a field of type 'CouponType[]'
   */
  export type ListEnumCouponTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CouponType[]'>
    


  /**
   * Reference to a field of type 'CouponScope'
   */
  export type EnumCouponScopeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CouponScope'>
    


  /**
   * Reference to a field of type 'CouponScope[]'
   */
  export type ListEnumCouponScopeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CouponScope[]'>
    


  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'Decimal[]'
   */
  export type ListDecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type CouponWhereInput = {
    AND?: CouponWhereInput | CouponWhereInput[]
    OR?: CouponWhereInput[]
    NOT?: CouponWhereInput | CouponWhereInput[]
    id?: StringFilter<"Coupon"> | string
    code?: StringFilter<"Coupon"> | string
    type?: EnumCouponTypeFilter<"Coupon"> | $Enums.CouponType
    scope?: EnumCouponScopeFilter<"Coupon"> | $Enums.CouponScope
    value?: DecimalFilter<"Coupon"> | Decimal | DecimalJsLike | number | string
    maxDiscount?: DecimalNullableFilter<"Coupon"> | Decimal | DecimalJsLike | number | string | null
    minOrderValue?: DecimalNullableFilter<"Coupon"> | Decimal | DecimalJsLike | number | string | null
    usageLimit?: IntNullableFilter<"Coupon"> | number | null
    perUserLimit?: IntNullableFilter<"Coupon"> | number | null
    startDate?: DateTimeFilter<"Coupon"> | Date | string
    endDate?: DateTimeFilter<"Coupon"> | Date | string
    isActive?: BoolFilter<"Coupon"> | boolean
    createdAt?: DateTimeFilter<"Coupon"> | Date | string
    redemptions?: CouponRedemptionListRelationFilter
  }

  export type CouponOrderByWithRelationInput = {
    id?: SortOrder
    code?: SortOrder
    type?: SortOrder
    scope?: SortOrder
    value?: SortOrder
    maxDiscount?: SortOrderInput | SortOrder
    minOrderValue?: SortOrderInput | SortOrder
    usageLimit?: SortOrderInput | SortOrder
    perUserLimit?: SortOrderInput | SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    redemptions?: CouponRedemptionOrderByRelationAggregateInput
  }

  export type CouponWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    code?: string
    AND?: CouponWhereInput | CouponWhereInput[]
    OR?: CouponWhereInput[]
    NOT?: CouponWhereInput | CouponWhereInput[]
    type?: EnumCouponTypeFilter<"Coupon"> | $Enums.CouponType
    scope?: EnumCouponScopeFilter<"Coupon"> | $Enums.CouponScope
    value?: DecimalFilter<"Coupon"> | Decimal | DecimalJsLike | number | string
    maxDiscount?: DecimalNullableFilter<"Coupon"> | Decimal | DecimalJsLike | number | string | null
    minOrderValue?: DecimalNullableFilter<"Coupon"> | Decimal | DecimalJsLike | number | string | null
    usageLimit?: IntNullableFilter<"Coupon"> | number | null
    perUserLimit?: IntNullableFilter<"Coupon"> | number | null
    startDate?: DateTimeFilter<"Coupon"> | Date | string
    endDate?: DateTimeFilter<"Coupon"> | Date | string
    isActive?: BoolFilter<"Coupon"> | boolean
    createdAt?: DateTimeFilter<"Coupon"> | Date | string
    redemptions?: CouponRedemptionListRelationFilter
  }, "id" | "code">

  export type CouponOrderByWithAggregationInput = {
    id?: SortOrder
    code?: SortOrder
    type?: SortOrder
    scope?: SortOrder
    value?: SortOrder
    maxDiscount?: SortOrderInput | SortOrder
    minOrderValue?: SortOrderInput | SortOrder
    usageLimit?: SortOrderInput | SortOrder
    perUserLimit?: SortOrderInput | SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    _count?: CouponCountOrderByAggregateInput
    _avg?: CouponAvgOrderByAggregateInput
    _max?: CouponMaxOrderByAggregateInput
    _min?: CouponMinOrderByAggregateInput
    _sum?: CouponSumOrderByAggregateInput
  }

  export type CouponScalarWhereWithAggregatesInput = {
    AND?: CouponScalarWhereWithAggregatesInput | CouponScalarWhereWithAggregatesInput[]
    OR?: CouponScalarWhereWithAggregatesInput[]
    NOT?: CouponScalarWhereWithAggregatesInput | CouponScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Coupon"> | string
    code?: StringWithAggregatesFilter<"Coupon"> | string
    type?: EnumCouponTypeWithAggregatesFilter<"Coupon"> | $Enums.CouponType
    scope?: EnumCouponScopeWithAggregatesFilter<"Coupon"> | $Enums.CouponScope
    value?: DecimalWithAggregatesFilter<"Coupon"> | Decimal | DecimalJsLike | number | string
    maxDiscount?: DecimalNullableWithAggregatesFilter<"Coupon"> | Decimal | DecimalJsLike | number | string | null
    minOrderValue?: DecimalNullableWithAggregatesFilter<"Coupon"> | Decimal | DecimalJsLike | number | string | null
    usageLimit?: IntNullableWithAggregatesFilter<"Coupon"> | number | null
    perUserLimit?: IntNullableWithAggregatesFilter<"Coupon"> | number | null
    startDate?: DateTimeWithAggregatesFilter<"Coupon"> | Date | string
    endDate?: DateTimeWithAggregatesFilter<"Coupon"> | Date | string
    isActive?: BoolWithAggregatesFilter<"Coupon"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Coupon"> | Date | string
  }

  export type CouponRedemptionWhereInput = {
    AND?: CouponRedemptionWhereInput | CouponRedemptionWhereInput[]
    OR?: CouponRedemptionWhereInput[]
    NOT?: CouponRedemptionWhereInput | CouponRedemptionWhereInput[]
    id?: StringFilter<"CouponRedemption"> | string
    couponId?: StringFilter<"CouponRedemption"> | string
    userId?: StringFilter<"CouponRedemption"> | string
    orderId?: StringFilter<"CouponRedemption"> | string
    redeemedAt?: DateTimeFilter<"CouponRedemption"> | Date | string
    coupon?: XOR<CouponScalarRelationFilter, CouponWhereInput>
  }

  export type CouponRedemptionOrderByWithRelationInput = {
    id?: SortOrder
    couponId?: SortOrder
    userId?: SortOrder
    orderId?: SortOrder
    redeemedAt?: SortOrder
    coupon?: CouponOrderByWithRelationInput
  }

  export type CouponRedemptionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    couponId_userId_orderId?: CouponRedemptionCouponIdUserIdOrderIdCompoundUniqueInput
    AND?: CouponRedemptionWhereInput | CouponRedemptionWhereInput[]
    OR?: CouponRedemptionWhereInput[]
    NOT?: CouponRedemptionWhereInput | CouponRedemptionWhereInput[]
    couponId?: StringFilter<"CouponRedemption"> | string
    userId?: StringFilter<"CouponRedemption"> | string
    orderId?: StringFilter<"CouponRedemption"> | string
    redeemedAt?: DateTimeFilter<"CouponRedemption"> | Date | string
    coupon?: XOR<CouponScalarRelationFilter, CouponWhereInput>
  }, "id" | "couponId_userId_orderId">

  export type CouponRedemptionOrderByWithAggregationInput = {
    id?: SortOrder
    couponId?: SortOrder
    userId?: SortOrder
    orderId?: SortOrder
    redeemedAt?: SortOrder
    _count?: CouponRedemptionCountOrderByAggregateInput
    _max?: CouponRedemptionMaxOrderByAggregateInput
    _min?: CouponRedemptionMinOrderByAggregateInput
  }

  export type CouponRedemptionScalarWhereWithAggregatesInput = {
    AND?: CouponRedemptionScalarWhereWithAggregatesInput | CouponRedemptionScalarWhereWithAggregatesInput[]
    OR?: CouponRedemptionScalarWhereWithAggregatesInput[]
    NOT?: CouponRedemptionScalarWhereWithAggregatesInput | CouponRedemptionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"CouponRedemption"> | string
    couponId?: StringWithAggregatesFilter<"CouponRedemption"> | string
    userId?: StringWithAggregatesFilter<"CouponRedemption"> | string
    orderId?: StringWithAggregatesFilter<"CouponRedemption"> | string
    redeemedAt?: DateTimeWithAggregatesFilter<"CouponRedemption"> | Date | string
  }

  export type CouponCreateInput = {
    id?: string
    code: string
    type: $Enums.CouponType
    scope: $Enums.CouponScope
    value: Decimal | DecimalJsLike | number | string
    maxDiscount?: Decimal | DecimalJsLike | number | string | null
    minOrderValue?: Decimal | DecimalJsLike | number | string | null
    usageLimit?: number | null
    perUserLimit?: number | null
    startDate: Date | string
    endDate: Date | string
    isActive?: boolean
    createdAt?: Date | string
    redemptions?: CouponRedemptionCreateNestedManyWithoutCouponInput
  }

  export type CouponUncheckedCreateInput = {
    id?: string
    code: string
    type: $Enums.CouponType
    scope: $Enums.CouponScope
    value: Decimal | DecimalJsLike | number | string
    maxDiscount?: Decimal | DecimalJsLike | number | string | null
    minOrderValue?: Decimal | DecimalJsLike | number | string | null
    usageLimit?: number | null
    perUserLimit?: number | null
    startDate: Date | string
    endDate: Date | string
    isActive?: boolean
    createdAt?: Date | string
    redemptions?: CouponRedemptionUncheckedCreateNestedManyWithoutCouponInput
  }

  export type CouponUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    type?: EnumCouponTypeFieldUpdateOperationsInput | $Enums.CouponType
    scope?: EnumCouponScopeFieldUpdateOperationsInput | $Enums.CouponScope
    value?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    maxDiscount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    minOrderValue?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    usageLimit?: NullableIntFieldUpdateOperationsInput | number | null
    perUserLimit?: NullableIntFieldUpdateOperationsInput | number | null
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    redemptions?: CouponRedemptionUpdateManyWithoutCouponNestedInput
  }

  export type CouponUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    type?: EnumCouponTypeFieldUpdateOperationsInput | $Enums.CouponType
    scope?: EnumCouponScopeFieldUpdateOperationsInput | $Enums.CouponScope
    value?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    maxDiscount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    minOrderValue?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    usageLimit?: NullableIntFieldUpdateOperationsInput | number | null
    perUserLimit?: NullableIntFieldUpdateOperationsInput | number | null
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    redemptions?: CouponRedemptionUncheckedUpdateManyWithoutCouponNestedInput
  }

  export type CouponCreateManyInput = {
    id?: string
    code: string
    type: $Enums.CouponType
    scope: $Enums.CouponScope
    value: Decimal | DecimalJsLike | number | string
    maxDiscount?: Decimal | DecimalJsLike | number | string | null
    minOrderValue?: Decimal | DecimalJsLike | number | string | null
    usageLimit?: number | null
    perUserLimit?: number | null
    startDate: Date | string
    endDate: Date | string
    isActive?: boolean
    createdAt?: Date | string
  }

  export type CouponUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    type?: EnumCouponTypeFieldUpdateOperationsInput | $Enums.CouponType
    scope?: EnumCouponScopeFieldUpdateOperationsInput | $Enums.CouponScope
    value?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    maxDiscount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    minOrderValue?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    usageLimit?: NullableIntFieldUpdateOperationsInput | number | null
    perUserLimit?: NullableIntFieldUpdateOperationsInput | number | null
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CouponUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    type?: EnumCouponTypeFieldUpdateOperationsInput | $Enums.CouponType
    scope?: EnumCouponScopeFieldUpdateOperationsInput | $Enums.CouponScope
    value?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    maxDiscount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    minOrderValue?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    usageLimit?: NullableIntFieldUpdateOperationsInput | number | null
    perUserLimit?: NullableIntFieldUpdateOperationsInput | number | null
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CouponRedemptionCreateInput = {
    id?: string
    userId: string
    orderId: string
    redeemedAt?: Date | string
    coupon: CouponCreateNestedOneWithoutRedemptionsInput
  }

  export type CouponRedemptionUncheckedCreateInput = {
    id?: string
    couponId: string
    userId: string
    orderId: string
    redeemedAt?: Date | string
  }

  export type CouponRedemptionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    orderId?: StringFieldUpdateOperationsInput | string
    redeemedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    coupon?: CouponUpdateOneRequiredWithoutRedemptionsNestedInput
  }

  export type CouponRedemptionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    couponId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    orderId?: StringFieldUpdateOperationsInput | string
    redeemedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CouponRedemptionCreateManyInput = {
    id?: string
    couponId: string
    userId: string
    orderId: string
    redeemedAt?: Date | string
  }

  export type CouponRedemptionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    orderId?: StringFieldUpdateOperationsInput | string
    redeemedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CouponRedemptionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    couponId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    orderId?: StringFieldUpdateOperationsInput | string
    redeemedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type EnumCouponTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.CouponType | EnumCouponTypeFieldRefInput<$PrismaModel>
    in?: $Enums.CouponType[] | ListEnumCouponTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.CouponType[] | ListEnumCouponTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumCouponTypeFilter<$PrismaModel> | $Enums.CouponType
  }

  export type EnumCouponScopeFilter<$PrismaModel = never> = {
    equals?: $Enums.CouponScope | EnumCouponScopeFieldRefInput<$PrismaModel>
    in?: $Enums.CouponScope[] | ListEnumCouponScopeFieldRefInput<$PrismaModel>
    notIn?: $Enums.CouponScope[] | ListEnumCouponScopeFieldRefInput<$PrismaModel>
    not?: NestedEnumCouponScopeFilter<$PrismaModel> | $Enums.CouponScope
  }

  export type DecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type DecimalNullableFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type CouponRedemptionListRelationFilter = {
    every?: CouponRedemptionWhereInput
    some?: CouponRedemptionWhereInput
    none?: CouponRedemptionWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type CouponRedemptionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CouponCountOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    type?: SortOrder
    scope?: SortOrder
    value?: SortOrder
    maxDiscount?: SortOrder
    minOrderValue?: SortOrder
    usageLimit?: SortOrder
    perUserLimit?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
  }

  export type CouponAvgOrderByAggregateInput = {
    value?: SortOrder
    maxDiscount?: SortOrder
    minOrderValue?: SortOrder
    usageLimit?: SortOrder
    perUserLimit?: SortOrder
  }

  export type CouponMaxOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    type?: SortOrder
    scope?: SortOrder
    value?: SortOrder
    maxDiscount?: SortOrder
    minOrderValue?: SortOrder
    usageLimit?: SortOrder
    perUserLimit?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
  }

  export type CouponMinOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    type?: SortOrder
    scope?: SortOrder
    value?: SortOrder
    maxDiscount?: SortOrder
    minOrderValue?: SortOrder
    usageLimit?: SortOrder
    perUserLimit?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
  }

  export type CouponSumOrderByAggregateInput = {
    value?: SortOrder
    maxDiscount?: SortOrder
    minOrderValue?: SortOrder
    usageLimit?: SortOrder
    perUserLimit?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type EnumCouponTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CouponType | EnumCouponTypeFieldRefInput<$PrismaModel>
    in?: $Enums.CouponType[] | ListEnumCouponTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.CouponType[] | ListEnumCouponTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumCouponTypeWithAggregatesFilter<$PrismaModel> | $Enums.CouponType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCouponTypeFilter<$PrismaModel>
    _max?: NestedEnumCouponTypeFilter<$PrismaModel>
  }

  export type EnumCouponScopeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CouponScope | EnumCouponScopeFieldRefInput<$PrismaModel>
    in?: $Enums.CouponScope[] | ListEnumCouponScopeFieldRefInput<$PrismaModel>
    notIn?: $Enums.CouponScope[] | ListEnumCouponScopeFieldRefInput<$PrismaModel>
    not?: NestedEnumCouponScopeWithAggregatesFilter<$PrismaModel> | $Enums.CouponScope
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCouponScopeFilter<$PrismaModel>
    _max?: NestedEnumCouponScopeFilter<$PrismaModel>
  }

  export type DecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type DecimalNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedDecimalNullableFilter<$PrismaModel>
    _sum?: NestedDecimalNullableFilter<$PrismaModel>
    _min?: NestedDecimalNullableFilter<$PrismaModel>
    _max?: NestedDecimalNullableFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type CouponScalarRelationFilter = {
    is?: CouponWhereInput
    isNot?: CouponWhereInput
  }

  export type CouponRedemptionCouponIdUserIdOrderIdCompoundUniqueInput = {
    couponId: string
    userId: string
    orderId: string
  }

  export type CouponRedemptionCountOrderByAggregateInput = {
    id?: SortOrder
    couponId?: SortOrder
    userId?: SortOrder
    orderId?: SortOrder
    redeemedAt?: SortOrder
  }

  export type CouponRedemptionMaxOrderByAggregateInput = {
    id?: SortOrder
    couponId?: SortOrder
    userId?: SortOrder
    orderId?: SortOrder
    redeemedAt?: SortOrder
  }

  export type CouponRedemptionMinOrderByAggregateInput = {
    id?: SortOrder
    couponId?: SortOrder
    userId?: SortOrder
    orderId?: SortOrder
    redeemedAt?: SortOrder
  }

  export type CouponRedemptionCreateNestedManyWithoutCouponInput = {
    create?: XOR<CouponRedemptionCreateWithoutCouponInput, CouponRedemptionUncheckedCreateWithoutCouponInput> | CouponRedemptionCreateWithoutCouponInput[] | CouponRedemptionUncheckedCreateWithoutCouponInput[]
    connectOrCreate?: CouponRedemptionCreateOrConnectWithoutCouponInput | CouponRedemptionCreateOrConnectWithoutCouponInput[]
    createMany?: CouponRedemptionCreateManyCouponInputEnvelope
    connect?: CouponRedemptionWhereUniqueInput | CouponRedemptionWhereUniqueInput[]
  }

  export type CouponRedemptionUncheckedCreateNestedManyWithoutCouponInput = {
    create?: XOR<CouponRedemptionCreateWithoutCouponInput, CouponRedemptionUncheckedCreateWithoutCouponInput> | CouponRedemptionCreateWithoutCouponInput[] | CouponRedemptionUncheckedCreateWithoutCouponInput[]
    connectOrCreate?: CouponRedemptionCreateOrConnectWithoutCouponInput | CouponRedemptionCreateOrConnectWithoutCouponInput[]
    createMany?: CouponRedemptionCreateManyCouponInputEnvelope
    connect?: CouponRedemptionWhereUniqueInput | CouponRedemptionWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type EnumCouponTypeFieldUpdateOperationsInput = {
    set?: $Enums.CouponType
  }

  export type EnumCouponScopeFieldUpdateOperationsInput = {
    set?: $Enums.CouponScope
  }

  export type DecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type NullableDecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string | null
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type CouponRedemptionUpdateManyWithoutCouponNestedInput = {
    create?: XOR<CouponRedemptionCreateWithoutCouponInput, CouponRedemptionUncheckedCreateWithoutCouponInput> | CouponRedemptionCreateWithoutCouponInput[] | CouponRedemptionUncheckedCreateWithoutCouponInput[]
    connectOrCreate?: CouponRedemptionCreateOrConnectWithoutCouponInput | CouponRedemptionCreateOrConnectWithoutCouponInput[]
    upsert?: CouponRedemptionUpsertWithWhereUniqueWithoutCouponInput | CouponRedemptionUpsertWithWhereUniqueWithoutCouponInput[]
    createMany?: CouponRedemptionCreateManyCouponInputEnvelope
    set?: CouponRedemptionWhereUniqueInput | CouponRedemptionWhereUniqueInput[]
    disconnect?: CouponRedemptionWhereUniqueInput | CouponRedemptionWhereUniqueInput[]
    delete?: CouponRedemptionWhereUniqueInput | CouponRedemptionWhereUniqueInput[]
    connect?: CouponRedemptionWhereUniqueInput | CouponRedemptionWhereUniqueInput[]
    update?: CouponRedemptionUpdateWithWhereUniqueWithoutCouponInput | CouponRedemptionUpdateWithWhereUniqueWithoutCouponInput[]
    updateMany?: CouponRedemptionUpdateManyWithWhereWithoutCouponInput | CouponRedemptionUpdateManyWithWhereWithoutCouponInput[]
    deleteMany?: CouponRedemptionScalarWhereInput | CouponRedemptionScalarWhereInput[]
  }

  export type CouponRedemptionUncheckedUpdateManyWithoutCouponNestedInput = {
    create?: XOR<CouponRedemptionCreateWithoutCouponInput, CouponRedemptionUncheckedCreateWithoutCouponInput> | CouponRedemptionCreateWithoutCouponInput[] | CouponRedemptionUncheckedCreateWithoutCouponInput[]
    connectOrCreate?: CouponRedemptionCreateOrConnectWithoutCouponInput | CouponRedemptionCreateOrConnectWithoutCouponInput[]
    upsert?: CouponRedemptionUpsertWithWhereUniqueWithoutCouponInput | CouponRedemptionUpsertWithWhereUniqueWithoutCouponInput[]
    createMany?: CouponRedemptionCreateManyCouponInputEnvelope
    set?: CouponRedemptionWhereUniqueInput | CouponRedemptionWhereUniqueInput[]
    disconnect?: CouponRedemptionWhereUniqueInput | CouponRedemptionWhereUniqueInput[]
    delete?: CouponRedemptionWhereUniqueInput | CouponRedemptionWhereUniqueInput[]
    connect?: CouponRedemptionWhereUniqueInput | CouponRedemptionWhereUniqueInput[]
    update?: CouponRedemptionUpdateWithWhereUniqueWithoutCouponInput | CouponRedemptionUpdateWithWhereUniqueWithoutCouponInput[]
    updateMany?: CouponRedemptionUpdateManyWithWhereWithoutCouponInput | CouponRedemptionUpdateManyWithWhereWithoutCouponInput[]
    deleteMany?: CouponRedemptionScalarWhereInput | CouponRedemptionScalarWhereInput[]
  }

  export type CouponCreateNestedOneWithoutRedemptionsInput = {
    create?: XOR<CouponCreateWithoutRedemptionsInput, CouponUncheckedCreateWithoutRedemptionsInput>
    connectOrCreate?: CouponCreateOrConnectWithoutRedemptionsInput
    connect?: CouponWhereUniqueInput
  }

  export type CouponUpdateOneRequiredWithoutRedemptionsNestedInput = {
    create?: XOR<CouponCreateWithoutRedemptionsInput, CouponUncheckedCreateWithoutRedemptionsInput>
    connectOrCreate?: CouponCreateOrConnectWithoutRedemptionsInput
    upsert?: CouponUpsertWithoutRedemptionsInput
    connect?: CouponWhereUniqueInput
    update?: XOR<XOR<CouponUpdateToOneWithWhereWithoutRedemptionsInput, CouponUpdateWithoutRedemptionsInput>, CouponUncheckedUpdateWithoutRedemptionsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedEnumCouponTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.CouponType | EnumCouponTypeFieldRefInput<$PrismaModel>
    in?: $Enums.CouponType[] | ListEnumCouponTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.CouponType[] | ListEnumCouponTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumCouponTypeFilter<$PrismaModel> | $Enums.CouponType
  }

  export type NestedEnumCouponScopeFilter<$PrismaModel = never> = {
    equals?: $Enums.CouponScope | EnumCouponScopeFieldRefInput<$PrismaModel>
    in?: $Enums.CouponScope[] | ListEnumCouponScopeFieldRefInput<$PrismaModel>
    notIn?: $Enums.CouponScope[] | ListEnumCouponScopeFieldRefInput<$PrismaModel>
    not?: NestedEnumCouponScopeFilter<$PrismaModel> | $Enums.CouponScope
  }

  export type NestedDecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type NestedDecimalNullableFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedEnumCouponTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CouponType | EnumCouponTypeFieldRefInput<$PrismaModel>
    in?: $Enums.CouponType[] | ListEnumCouponTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.CouponType[] | ListEnumCouponTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumCouponTypeWithAggregatesFilter<$PrismaModel> | $Enums.CouponType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCouponTypeFilter<$PrismaModel>
    _max?: NestedEnumCouponTypeFilter<$PrismaModel>
  }

  export type NestedEnumCouponScopeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CouponScope | EnumCouponScopeFieldRefInput<$PrismaModel>
    in?: $Enums.CouponScope[] | ListEnumCouponScopeFieldRefInput<$PrismaModel>
    notIn?: $Enums.CouponScope[] | ListEnumCouponScopeFieldRefInput<$PrismaModel>
    not?: NestedEnumCouponScopeWithAggregatesFilter<$PrismaModel> | $Enums.CouponScope
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCouponScopeFilter<$PrismaModel>
    _max?: NestedEnumCouponScopeFilter<$PrismaModel>
  }

  export type NestedDecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type NestedDecimalNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedDecimalNullableFilter<$PrismaModel>
    _sum?: NestedDecimalNullableFilter<$PrismaModel>
    _min?: NestedDecimalNullableFilter<$PrismaModel>
    _max?: NestedDecimalNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type CouponRedemptionCreateWithoutCouponInput = {
    id?: string
    userId: string
    orderId: string
    redeemedAt?: Date | string
  }

  export type CouponRedemptionUncheckedCreateWithoutCouponInput = {
    id?: string
    userId: string
    orderId: string
    redeemedAt?: Date | string
  }

  export type CouponRedemptionCreateOrConnectWithoutCouponInput = {
    where: CouponRedemptionWhereUniqueInput
    create: XOR<CouponRedemptionCreateWithoutCouponInput, CouponRedemptionUncheckedCreateWithoutCouponInput>
  }

  export type CouponRedemptionCreateManyCouponInputEnvelope = {
    data: CouponRedemptionCreateManyCouponInput | CouponRedemptionCreateManyCouponInput[]
    skipDuplicates?: boolean
  }

  export type CouponRedemptionUpsertWithWhereUniqueWithoutCouponInput = {
    where: CouponRedemptionWhereUniqueInput
    update: XOR<CouponRedemptionUpdateWithoutCouponInput, CouponRedemptionUncheckedUpdateWithoutCouponInput>
    create: XOR<CouponRedemptionCreateWithoutCouponInput, CouponRedemptionUncheckedCreateWithoutCouponInput>
  }

  export type CouponRedemptionUpdateWithWhereUniqueWithoutCouponInput = {
    where: CouponRedemptionWhereUniqueInput
    data: XOR<CouponRedemptionUpdateWithoutCouponInput, CouponRedemptionUncheckedUpdateWithoutCouponInput>
  }

  export type CouponRedemptionUpdateManyWithWhereWithoutCouponInput = {
    where: CouponRedemptionScalarWhereInput
    data: XOR<CouponRedemptionUpdateManyMutationInput, CouponRedemptionUncheckedUpdateManyWithoutCouponInput>
  }

  export type CouponRedemptionScalarWhereInput = {
    AND?: CouponRedemptionScalarWhereInput | CouponRedemptionScalarWhereInput[]
    OR?: CouponRedemptionScalarWhereInput[]
    NOT?: CouponRedemptionScalarWhereInput | CouponRedemptionScalarWhereInput[]
    id?: StringFilter<"CouponRedemption"> | string
    couponId?: StringFilter<"CouponRedemption"> | string
    userId?: StringFilter<"CouponRedemption"> | string
    orderId?: StringFilter<"CouponRedemption"> | string
    redeemedAt?: DateTimeFilter<"CouponRedemption"> | Date | string
  }

  export type CouponCreateWithoutRedemptionsInput = {
    id?: string
    code: string
    type: $Enums.CouponType
    scope: $Enums.CouponScope
    value: Decimal | DecimalJsLike | number | string
    maxDiscount?: Decimal | DecimalJsLike | number | string | null
    minOrderValue?: Decimal | DecimalJsLike | number | string | null
    usageLimit?: number | null
    perUserLimit?: number | null
    startDate: Date | string
    endDate: Date | string
    isActive?: boolean
    createdAt?: Date | string
  }

  export type CouponUncheckedCreateWithoutRedemptionsInput = {
    id?: string
    code: string
    type: $Enums.CouponType
    scope: $Enums.CouponScope
    value: Decimal | DecimalJsLike | number | string
    maxDiscount?: Decimal | DecimalJsLike | number | string | null
    minOrderValue?: Decimal | DecimalJsLike | number | string | null
    usageLimit?: number | null
    perUserLimit?: number | null
    startDate: Date | string
    endDate: Date | string
    isActive?: boolean
    createdAt?: Date | string
  }

  export type CouponCreateOrConnectWithoutRedemptionsInput = {
    where: CouponWhereUniqueInput
    create: XOR<CouponCreateWithoutRedemptionsInput, CouponUncheckedCreateWithoutRedemptionsInput>
  }

  export type CouponUpsertWithoutRedemptionsInput = {
    update: XOR<CouponUpdateWithoutRedemptionsInput, CouponUncheckedUpdateWithoutRedemptionsInput>
    create: XOR<CouponCreateWithoutRedemptionsInput, CouponUncheckedCreateWithoutRedemptionsInput>
    where?: CouponWhereInput
  }

  export type CouponUpdateToOneWithWhereWithoutRedemptionsInput = {
    where?: CouponWhereInput
    data: XOR<CouponUpdateWithoutRedemptionsInput, CouponUncheckedUpdateWithoutRedemptionsInput>
  }

  export type CouponUpdateWithoutRedemptionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    type?: EnumCouponTypeFieldUpdateOperationsInput | $Enums.CouponType
    scope?: EnumCouponScopeFieldUpdateOperationsInput | $Enums.CouponScope
    value?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    maxDiscount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    minOrderValue?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    usageLimit?: NullableIntFieldUpdateOperationsInput | number | null
    perUserLimit?: NullableIntFieldUpdateOperationsInput | number | null
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CouponUncheckedUpdateWithoutRedemptionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    type?: EnumCouponTypeFieldUpdateOperationsInput | $Enums.CouponType
    scope?: EnumCouponScopeFieldUpdateOperationsInput | $Enums.CouponScope
    value?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    maxDiscount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    minOrderValue?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    usageLimit?: NullableIntFieldUpdateOperationsInput | number | null
    perUserLimit?: NullableIntFieldUpdateOperationsInput | number | null
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CouponRedemptionCreateManyCouponInput = {
    id?: string
    userId: string
    orderId: string
    redeemedAt?: Date | string
  }

  export type CouponRedemptionUpdateWithoutCouponInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    orderId?: StringFieldUpdateOperationsInput | string
    redeemedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CouponRedemptionUncheckedUpdateWithoutCouponInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    orderId?: StringFieldUpdateOperationsInput | string
    redeemedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CouponRedemptionUncheckedUpdateManyWithoutCouponInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    orderId?: StringFieldUpdateOperationsInput | string
    redeemedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}