
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
 * Model RefundRequest
 * 
 */
export type RefundRequest = $Result.DefaultSelection<Prisma.$RefundRequestPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const RefundReason: {
  DAMAGED_ITEM: 'DAMAGED_ITEM',
  WRONG_ITEM: 'WRONG_ITEM',
  NOT_DELIVERED: 'NOT_DELIVERED',
  BUYER_CHANGED_MIND: 'BUYER_CHANGED_MIND',
  OTHER: 'OTHER'
};

export type RefundReason = (typeof RefundReason)[keyof typeof RefundReason]


export const RefundStatus: {
  REQUESTED: 'REQUESTED',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
  REFUNDED: 'REFUNDED',
  CANCELLED: 'CANCELLED'
};

export type RefundStatus = (typeof RefundStatus)[keyof typeof RefundStatus]

}

export type RefundReason = $Enums.RefundReason

export const RefundReason: typeof $Enums.RefundReason

export type RefundStatus = $Enums.RefundStatus

export const RefundStatus: typeof $Enums.RefundStatus

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more RefundRequests
 * const refundRequests = await prisma.refundRequest.findMany()
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
   * // Fetch zero or more RefundRequests
   * const refundRequests = await prisma.refundRequest.findMany()
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
   * `prisma.refundRequest`: Exposes CRUD operations for the **RefundRequest** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RefundRequests
    * const refundRequests = await prisma.refundRequest.findMany()
    * ```
    */
  get refundRequest(): Prisma.RefundRequestDelegate<ExtArgs, ClientOptions>;
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
    RefundRequest: 'RefundRequest'
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
      modelProps: "refundRequest"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      RefundRequest: {
        payload: Prisma.$RefundRequestPayload<ExtArgs>
        fields: Prisma.RefundRequestFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RefundRequestFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefundRequestPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RefundRequestFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefundRequestPayload>
          }
          findFirst: {
            args: Prisma.RefundRequestFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefundRequestPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RefundRequestFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefundRequestPayload>
          }
          findMany: {
            args: Prisma.RefundRequestFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefundRequestPayload>[]
          }
          create: {
            args: Prisma.RefundRequestCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefundRequestPayload>
          }
          createMany: {
            args: Prisma.RefundRequestCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RefundRequestCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefundRequestPayload>[]
          }
          delete: {
            args: Prisma.RefundRequestDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefundRequestPayload>
          }
          update: {
            args: Prisma.RefundRequestUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefundRequestPayload>
          }
          deleteMany: {
            args: Prisma.RefundRequestDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RefundRequestUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RefundRequestUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefundRequestPayload>[]
          }
          upsert: {
            args: Prisma.RefundRequestUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefundRequestPayload>
          }
          aggregate: {
            args: Prisma.RefundRequestAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRefundRequest>
          }
          groupBy: {
            args: Prisma.RefundRequestGroupByArgs<ExtArgs>
            result: $Utils.Optional<RefundRequestGroupByOutputType>[]
          }
          count: {
            args: Prisma.RefundRequestCountArgs<ExtArgs>
            result: $Utils.Optional<RefundRequestCountAggregateOutputType> | number
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
    refundRequest?: RefundRequestOmit
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
   * Models
   */

  /**
   * Model RefundRequest
   */

  export type AggregateRefundRequest = {
    _count: RefundRequestCountAggregateOutputType | null
    _min: RefundRequestMinAggregateOutputType | null
    _max: RefundRequestMaxAggregateOutputType | null
  }

  export type RefundRequestMinAggregateOutputType = {
    id: string | null
    orderItemId: string | null
    userId: string | null
    sellerId: string | null
    reason: $Enums.RefundReason | null
    status: $Enums.RefundStatus | null
    comment: string | null
    attachmentUrl: string | null
    createdAt: Date | null
    updatedAt: Date | null
    resolvedAt: Date | null
  }

  export type RefundRequestMaxAggregateOutputType = {
    id: string | null
    orderItemId: string | null
    userId: string | null
    sellerId: string | null
    reason: $Enums.RefundReason | null
    status: $Enums.RefundStatus | null
    comment: string | null
    attachmentUrl: string | null
    createdAt: Date | null
    updatedAt: Date | null
    resolvedAt: Date | null
  }

  export type RefundRequestCountAggregateOutputType = {
    id: number
    orderItemId: number
    userId: number
    sellerId: number
    reason: number
    status: number
    comment: number
    attachmentUrl: number
    createdAt: number
    updatedAt: number
    resolvedAt: number
    _all: number
  }


  export type RefundRequestMinAggregateInputType = {
    id?: true
    orderItemId?: true
    userId?: true
    sellerId?: true
    reason?: true
    status?: true
    comment?: true
    attachmentUrl?: true
    createdAt?: true
    updatedAt?: true
    resolvedAt?: true
  }

  export type RefundRequestMaxAggregateInputType = {
    id?: true
    orderItemId?: true
    userId?: true
    sellerId?: true
    reason?: true
    status?: true
    comment?: true
    attachmentUrl?: true
    createdAt?: true
    updatedAt?: true
    resolvedAt?: true
  }

  export type RefundRequestCountAggregateInputType = {
    id?: true
    orderItemId?: true
    userId?: true
    sellerId?: true
    reason?: true
    status?: true
    comment?: true
    attachmentUrl?: true
    createdAt?: true
    updatedAt?: true
    resolvedAt?: true
    _all?: true
  }

  export type RefundRequestAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RefundRequest to aggregate.
     */
    where?: RefundRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RefundRequests to fetch.
     */
    orderBy?: RefundRequestOrderByWithRelationInput | RefundRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RefundRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RefundRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RefundRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RefundRequests
    **/
    _count?: true | RefundRequestCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RefundRequestMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RefundRequestMaxAggregateInputType
  }

  export type GetRefundRequestAggregateType<T extends RefundRequestAggregateArgs> = {
        [P in keyof T & keyof AggregateRefundRequest]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRefundRequest[P]>
      : GetScalarType<T[P], AggregateRefundRequest[P]>
  }




  export type RefundRequestGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RefundRequestWhereInput
    orderBy?: RefundRequestOrderByWithAggregationInput | RefundRequestOrderByWithAggregationInput[]
    by: RefundRequestScalarFieldEnum[] | RefundRequestScalarFieldEnum
    having?: RefundRequestScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RefundRequestCountAggregateInputType | true
    _min?: RefundRequestMinAggregateInputType
    _max?: RefundRequestMaxAggregateInputType
  }

  export type RefundRequestGroupByOutputType = {
    id: string
    orderItemId: string
    userId: string
    sellerId: string
    reason: $Enums.RefundReason
    status: $Enums.RefundStatus
    comment: string | null
    attachmentUrl: string | null
    createdAt: Date
    updatedAt: Date
    resolvedAt: Date | null
    _count: RefundRequestCountAggregateOutputType | null
    _min: RefundRequestMinAggregateOutputType | null
    _max: RefundRequestMaxAggregateOutputType | null
  }

  type GetRefundRequestGroupByPayload<T extends RefundRequestGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RefundRequestGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RefundRequestGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RefundRequestGroupByOutputType[P]>
            : GetScalarType<T[P], RefundRequestGroupByOutputType[P]>
        }
      >
    >


  export type RefundRequestSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orderItemId?: boolean
    userId?: boolean
    sellerId?: boolean
    reason?: boolean
    status?: boolean
    comment?: boolean
    attachmentUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    resolvedAt?: boolean
  }, ExtArgs["result"]["refundRequest"]>

  export type RefundRequestSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orderItemId?: boolean
    userId?: boolean
    sellerId?: boolean
    reason?: boolean
    status?: boolean
    comment?: boolean
    attachmentUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    resolvedAt?: boolean
  }, ExtArgs["result"]["refundRequest"]>

  export type RefundRequestSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orderItemId?: boolean
    userId?: boolean
    sellerId?: boolean
    reason?: boolean
    status?: boolean
    comment?: boolean
    attachmentUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    resolvedAt?: boolean
  }, ExtArgs["result"]["refundRequest"]>

  export type RefundRequestSelectScalar = {
    id?: boolean
    orderItemId?: boolean
    userId?: boolean
    sellerId?: boolean
    reason?: boolean
    status?: boolean
    comment?: boolean
    attachmentUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    resolvedAt?: boolean
  }

  export type RefundRequestOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "orderItemId" | "userId" | "sellerId" | "reason" | "status" | "comment" | "attachmentUrl" | "createdAt" | "updatedAt" | "resolvedAt", ExtArgs["result"]["refundRequest"]>

  export type $RefundRequestPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RefundRequest"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      orderItemId: string
      userId: string
      sellerId: string
      reason: $Enums.RefundReason
      status: $Enums.RefundStatus
      comment: string | null
      attachmentUrl: string | null
      createdAt: Date
      updatedAt: Date
      resolvedAt: Date | null
    }, ExtArgs["result"]["refundRequest"]>
    composites: {}
  }

  type RefundRequestGetPayload<S extends boolean | null | undefined | RefundRequestDefaultArgs> = $Result.GetResult<Prisma.$RefundRequestPayload, S>

  type RefundRequestCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RefundRequestFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RefundRequestCountAggregateInputType | true
    }

  export interface RefundRequestDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RefundRequest'], meta: { name: 'RefundRequest' } }
    /**
     * Find zero or one RefundRequest that matches the filter.
     * @param {RefundRequestFindUniqueArgs} args - Arguments to find a RefundRequest
     * @example
     * // Get one RefundRequest
     * const refundRequest = await prisma.refundRequest.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RefundRequestFindUniqueArgs>(args: SelectSubset<T, RefundRequestFindUniqueArgs<ExtArgs>>): Prisma__RefundRequestClient<$Result.GetResult<Prisma.$RefundRequestPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one RefundRequest that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RefundRequestFindUniqueOrThrowArgs} args - Arguments to find a RefundRequest
     * @example
     * // Get one RefundRequest
     * const refundRequest = await prisma.refundRequest.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RefundRequestFindUniqueOrThrowArgs>(args: SelectSubset<T, RefundRequestFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RefundRequestClient<$Result.GetResult<Prisma.$RefundRequestPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RefundRequest that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefundRequestFindFirstArgs} args - Arguments to find a RefundRequest
     * @example
     * // Get one RefundRequest
     * const refundRequest = await prisma.refundRequest.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RefundRequestFindFirstArgs>(args?: SelectSubset<T, RefundRequestFindFirstArgs<ExtArgs>>): Prisma__RefundRequestClient<$Result.GetResult<Prisma.$RefundRequestPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RefundRequest that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefundRequestFindFirstOrThrowArgs} args - Arguments to find a RefundRequest
     * @example
     * // Get one RefundRequest
     * const refundRequest = await prisma.refundRequest.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RefundRequestFindFirstOrThrowArgs>(args?: SelectSubset<T, RefundRequestFindFirstOrThrowArgs<ExtArgs>>): Prisma__RefundRequestClient<$Result.GetResult<Prisma.$RefundRequestPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more RefundRequests that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefundRequestFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RefundRequests
     * const refundRequests = await prisma.refundRequest.findMany()
     * 
     * // Get first 10 RefundRequests
     * const refundRequests = await prisma.refundRequest.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const refundRequestWithIdOnly = await prisma.refundRequest.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RefundRequestFindManyArgs>(args?: SelectSubset<T, RefundRequestFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RefundRequestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a RefundRequest.
     * @param {RefundRequestCreateArgs} args - Arguments to create a RefundRequest.
     * @example
     * // Create one RefundRequest
     * const RefundRequest = await prisma.refundRequest.create({
     *   data: {
     *     // ... data to create a RefundRequest
     *   }
     * })
     * 
     */
    create<T extends RefundRequestCreateArgs>(args: SelectSubset<T, RefundRequestCreateArgs<ExtArgs>>): Prisma__RefundRequestClient<$Result.GetResult<Prisma.$RefundRequestPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many RefundRequests.
     * @param {RefundRequestCreateManyArgs} args - Arguments to create many RefundRequests.
     * @example
     * // Create many RefundRequests
     * const refundRequest = await prisma.refundRequest.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RefundRequestCreateManyArgs>(args?: SelectSubset<T, RefundRequestCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many RefundRequests and returns the data saved in the database.
     * @param {RefundRequestCreateManyAndReturnArgs} args - Arguments to create many RefundRequests.
     * @example
     * // Create many RefundRequests
     * const refundRequest = await prisma.refundRequest.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many RefundRequests and only return the `id`
     * const refundRequestWithIdOnly = await prisma.refundRequest.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RefundRequestCreateManyAndReturnArgs>(args?: SelectSubset<T, RefundRequestCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RefundRequestPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a RefundRequest.
     * @param {RefundRequestDeleteArgs} args - Arguments to delete one RefundRequest.
     * @example
     * // Delete one RefundRequest
     * const RefundRequest = await prisma.refundRequest.delete({
     *   where: {
     *     // ... filter to delete one RefundRequest
     *   }
     * })
     * 
     */
    delete<T extends RefundRequestDeleteArgs>(args: SelectSubset<T, RefundRequestDeleteArgs<ExtArgs>>): Prisma__RefundRequestClient<$Result.GetResult<Prisma.$RefundRequestPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one RefundRequest.
     * @param {RefundRequestUpdateArgs} args - Arguments to update one RefundRequest.
     * @example
     * // Update one RefundRequest
     * const refundRequest = await prisma.refundRequest.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RefundRequestUpdateArgs>(args: SelectSubset<T, RefundRequestUpdateArgs<ExtArgs>>): Prisma__RefundRequestClient<$Result.GetResult<Prisma.$RefundRequestPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more RefundRequests.
     * @param {RefundRequestDeleteManyArgs} args - Arguments to filter RefundRequests to delete.
     * @example
     * // Delete a few RefundRequests
     * const { count } = await prisma.refundRequest.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RefundRequestDeleteManyArgs>(args?: SelectSubset<T, RefundRequestDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RefundRequests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefundRequestUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RefundRequests
     * const refundRequest = await prisma.refundRequest.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RefundRequestUpdateManyArgs>(args: SelectSubset<T, RefundRequestUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RefundRequests and returns the data updated in the database.
     * @param {RefundRequestUpdateManyAndReturnArgs} args - Arguments to update many RefundRequests.
     * @example
     * // Update many RefundRequests
     * const refundRequest = await prisma.refundRequest.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more RefundRequests and only return the `id`
     * const refundRequestWithIdOnly = await prisma.refundRequest.updateManyAndReturn({
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
    updateManyAndReturn<T extends RefundRequestUpdateManyAndReturnArgs>(args: SelectSubset<T, RefundRequestUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RefundRequestPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one RefundRequest.
     * @param {RefundRequestUpsertArgs} args - Arguments to update or create a RefundRequest.
     * @example
     * // Update or create a RefundRequest
     * const refundRequest = await prisma.refundRequest.upsert({
     *   create: {
     *     // ... data to create a RefundRequest
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RefundRequest we want to update
     *   }
     * })
     */
    upsert<T extends RefundRequestUpsertArgs>(args: SelectSubset<T, RefundRequestUpsertArgs<ExtArgs>>): Prisma__RefundRequestClient<$Result.GetResult<Prisma.$RefundRequestPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of RefundRequests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefundRequestCountArgs} args - Arguments to filter RefundRequests to count.
     * @example
     * // Count the number of RefundRequests
     * const count = await prisma.refundRequest.count({
     *   where: {
     *     // ... the filter for the RefundRequests we want to count
     *   }
     * })
    **/
    count<T extends RefundRequestCountArgs>(
      args?: Subset<T, RefundRequestCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RefundRequestCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RefundRequest.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefundRequestAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends RefundRequestAggregateArgs>(args: Subset<T, RefundRequestAggregateArgs>): Prisma.PrismaPromise<GetRefundRequestAggregateType<T>>

    /**
     * Group by RefundRequest.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefundRequestGroupByArgs} args - Group by arguments.
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
      T extends RefundRequestGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RefundRequestGroupByArgs['orderBy'] }
        : { orderBy?: RefundRequestGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, RefundRequestGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRefundRequestGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RefundRequest model
   */
  readonly fields: RefundRequestFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RefundRequest.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RefundRequestClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
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
   * Fields of the RefundRequest model
   */
  interface RefundRequestFieldRefs {
    readonly id: FieldRef<"RefundRequest", 'String'>
    readonly orderItemId: FieldRef<"RefundRequest", 'String'>
    readonly userId: FieldRef<"RefundRequest", 'String'>
    readonly sellerId: FieldRef<"RefundRequest", 'String'>
    readonly reason: FieldRef<"RefundRequest", 'RefundReason'>
    readonly status: FieldRef<"RefundRequest", 'RefundStatus'>
    readonly comment: FieldRef<"RefundRequest", 'String'>
    readonly attachmentUrl: FieldRef<"RefundRequest", 'String'>
    readonly createdAt: FieldRef<"RefundRequest", 'DateTime'>
    readonly updatedAt: FieldRef<"RefundRequest", 'DateTime'>
    readonly resolvedAt: FieldRef<"RefundRequest", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * RefundRequest findUnique
   */
  export type RefundRequestFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefundRequest
     */
    select?: RefundRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefundRequest
     */
    omit?: RefundRequestOmit<ExtArgs> | null
    /**
     * Filter, which RefundRequest to fetch.
     */
    where: RefundRequestWhereUniqueInput
  }

  /**
   * RefundRequest findUniqueOrThrow
   */
  export type RefundRequestFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefundRequest
     */
    select?: RefundRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefundRequest
     */
    omit?: RefundRequestOmit<ExtArgs> | null
    /**
     * Filter, which RefundRequest to fetch.
     */
    where: RefundRequestWhereUniqueInput
  }

  /**
   * RefundRequest findFirst
   */
  export type RefundRequestFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefundRequest
     */
    select?: RefundRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefundRequest
     */
    omit?: RefundRequestOmit<ExtArgs> | null
    /**
     * Filter, which RefundRequest to fetch.
     */
    where?: RefundRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RefundRequests to fetch.
     */
    orderBy?: RefundRequestOrderByWithRelationInput | RefundRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RefundRequests.
     */
    cursor?: RefundRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RefundRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RefundRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RefundRequests.
     */
    distinct?: RefundRequestScalarFieldEnum | RefundRequestScalarFieldEnum[]
  }

  /**
   * RefundRequest findFirstOrThrow
   */
  export type RefundRequestFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefundRequest
     */
    select?: RefundRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefundRequest
     */
    omit?: RefundRequestOmit<ExtArgs> | null
    /**
     * Filter, which RefundRequest to fetch.
     */
    where?: RefundRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RefundRequests to fetch.
     */
    orderBy?: RefundRequestOrderByWithRelationInput | RefundRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RefundRequests.
     */
    cursor?: RefundRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RefundRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RefundRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RefundRequests.
     */
    distinct?: RefundRequestScalarFieldEnum | RefundRequestScalarFieldEnum[]
  }

  /**
   * RefundRequest findMany
   */
  export type RefundRequestFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefundRequest
     */
    select?: RefundRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefundRequest
     */
    omit?: RefundRequestOmit<ExtArgs> | null
    /**
     * Filter, which RefundRequests to fetch.
     */
    where?: RefundRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RefundRequests to fetch.
     */
    orderBy?: RefundRequestOrderByWithRelationInput | RefundRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RefundRequests.
     */
    cursor?: RefundRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RefundRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RefundRequests.
     */
    skip?: number
    distinct?: RefundRequestScalarFieldEnum | RefundRequestScalarFieldEnum[]
  }

  /**
   * RefundRequest create
   */
  export type RefundRequestCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefundRequest
     */
    select?: RefundRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefundRequest
     */
    omit?: RefundRequestOmit<ExtArgs> | null
    /**
     * The data needed to create a RefundRequest.
     */
    data: XOR<RefundRequestCreateInput, RefundRequestUncheckedCreateInput>
  }

  /**
   * RefundRequest createMany
   */
  export type RefundRequestCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RefundRequests.
     */
    data: RefundRequestCreateManyInput | RefundRequestCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RefundRequest createManyAndReturn
   */
  export type RefundRequestCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefundRequest
     */
    select?: RefundRequestSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RefundRequest
     */
    omit?: RefundRequestOmit<ExtArgs> | null
    /**
     * The data used to create many RefundRequests.
     */
    data: RefundRequestCreateManyInput | RefundRequestCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RefundRequest update
   */
  export type RefundRequestUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefundRequest
     */
    select?: RefundRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefundRequest
     */
    omit?: RefundRequestOmit<ExtArgs> | null
    /**
     * The data needed to update a RefundRequest.
     */
    data: XOR<RefundRequestUpdateInput, RefundRequestUncheckedUpdateInput>
    /**
     * Choose, which RefundRequest to update.
     */
    where: RefundRequestWhereUniqueInput
  }

  /**
   * RefundRequest updateMany
   */
  export type RefundRequestUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RefundRequests.
     */
    data: XOR<RefundRequestUpdateManyMutationInput, RefundRequestUncheckedUpdateManyInput>
    /**
     * Filter which RefundRequests to update
     */
    where?: RefundRequestWhereInput
    /**
     * Limit how many RefundRequests to update.
     */
    limit?: number
  }

  /**
   * RefundRequest updateManyAndReturn
   */
  export type RefundRequestUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefundRequest
     */
    select?: RefundRequestSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RefundRequest
     */
    omit?: RefundRequestOmit<ExtArgs> | null
    /**
     * The data used to update RefundRequests.
     */
    data: XOR<RefundRequestUpdateManyMutationInput, RefundRequestUncheckedUpdateManyInput>
    /**
     * Filter which RefundRequests to update
     */
    where?: RefundRequestWhereInput
    /**
     * Limit how many RefundRequests to update.
     */
    limit?: number
  }

  /**
   * RefundRequest upsert
   */
  export type RefundRequestUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefundRequest
     */
    select?: RefundRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefundRequest
     */
    omit?: RefundRequestOmit<ExtArgs> | null
    /**
     * The filter to search for the RefundRequest to update in case it exists.
     */
    where: RefundRequestWhereUniqueInput
    /**
     * In case the RefundRequest found by the `where` argument doesn't exist, create a new RefundRequest with this data.
     */
    create: XOR<RefundRequestCreateInput, RefundRequestUncheckedCreateInput>
    /**
     * In case the RefundRequest was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RefundRequestUpdateInput, RefundRequestUncheckedUpdateInput>
  }

  /**
   * RefundRequest delete
   */
  export type RefundRequestDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefundRequest
     */
    select?: RefundRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefundRequest
     */
    omit?: RefundRequestOmit<ExtArgs> | null
    /**
     * Filter which RefundRequest to delete.
     */
    where: RefundRequestWhereUniqueInput
  }

  /**
   * RefundRequest deleteMany
   */
  export type RefundRequestDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RefundRequests to delete
     */
    where?: RefundRequestWhereInput
    /**
     * Limit how many RefundRequests to delete.
     */
    limit?: number
  }

  /**
   * RefundRequest without action
   */
  export type RefundRequestDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefundRequest
     */
    select?: RefundRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefundRequest
     */
    omit?: RefundRequestOmit<ExtArgs> | null
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


  export const RefundRequestScalarFieldEnum: {
    id: 'id',
    orderItemId: 'orderItemId',
    userId: 'userId',
    sellerId: 'sellerId',
    reason: 'reason',
    status: 'status',
    comment: 'comment',
    attachmentUrl: 'attachmentUrl',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    resolvedAt: 'resolvedAt'
  };

  export type RefundRequestScalarFieldEnum = (typeof RefundRequestScalarFieldEnum)[keyof typeof RefundRequestScalarFieldEnum]


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
   * Reference to a field of type 'RefundReason'
   */
  export type EnumRefundReasonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RefundReason'>
    


  /**
   * Reference to a field of type 'RefundReason[]'
   */
  export type ListEnumRefundReasonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RefundReason[]'>
    


  /**
   * Reference to a field of type 'RefundStatus'
   */
  export type EnumRefundStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RefundStatus'>
    


  /**
   * Reference to a field of type 'RefundStatus[]'
   */
  export type ListEnumRefundStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RefundStatus[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    
  /**
   * Deep Input Types
   */


  export type RefundRequestWhereInput = {
    AND?: RefundRequestWhereInput | RefundRequestWhereInput[]
    OR?: RefundRequestWhereInput[]
    NOT?: RefundRequestWhereInput | RefundRequestWhereInput[]
    id?: StringFilter<"RefundRequest"> | string
    orderItemId?: StringFilter<"RefundRequest"> | string
    userId?: StringFilter<"RefundRequest"> | string
    sellerId?: StringFilter<"RefundRequest"> | string
    reason?: EnumRefundReasonFilter<"RefundRequest"> | $Enums.RefundReason
    status?: EnumRefundStatusFilter<"RefundRequest"> | $Enums.RefundStatus
    comment?: StringNullableFilter<"RefundRequest"> | string | null
    attachmentUrl?: StringNullableFilter<"RefundRequest"> | string | null
    createdAt?: DateTimeFilter<"RefundRequest"> | Date | string
    updatedAt?: DateTimeFilter<"RefundRequest"> | Date | string
    resolvedAt?: DateTimeNullableFilter<"RefundRequest"> | Date | string | null
  }

  export type RefundRequestOrderByWithRelationInput = {
    id?: SortOrder
    orderItemId?: SortOrder
    userId?: SortOrder
    sellerId?: SortOrder
    reason?: SortOrder
    status?: SortOrder
    comment?: SortOrderInput | SortOrder
    attachmentUrl?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    resolvedAt?: SortOrderInput | SortOrder
  }

  export type RefundRequestWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: RefundRequestWhereInput | RefundRequestWhereInput[]
    OR?: RefundRequestWhereInput[]
    NOT?: RefundRequestWhereInput | RefundRequestWhereInput[]
    orderItemId?: StringFilter<"RefundRequest"> | string
    userId?: StringFilter<"RefundRequest"> | string
    sellerId?: StringFilter<"RefundRequest"> | string
    reason?: EnumRefundReasonFilter<"RefundRequest"> | $Enums.RefundReason
    status?: EnumRefundStatusFilter<"RefundRequest"> | $Enums.RefundStatus
    comment?: StringNullableFilter<"RefundRequest"> | string | null
    attachmentUrl?: StringNullableFilter<"RefundRequest"> | string | null
    createdAt?: DateTimeFilter<"RefundRequest"> | Date | string
    updatedAt?: DateTimeFilter<"RefundRequest"> | Date | string
    resolvedAt?: DateTimeNullableFilter<"RefundRequest"> | Date | string | null
  }, "id">

  export type RefundRequestOrderByWithAggregationInput = {
    id?: SortOrder
    orderItemId?: SortOrder
    userId?: SortOrder
    sellerId?: SortOrder
    reason?: SortOrder
    status?: SortOrder
    comment?: SortOrderInput | SortOrder
    attachmentUrl?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    resolvedAt?: SortOrderInput | SortOrder
    _count?: RefundRequestCountOrderByAggregateInput
    _max?: RefundRequestMaxOrderByAggregateInput
    _min?: RefundRequestMinOrderByAggregateInput
  }

  export type RefundRequestScalarWhereWithAggregatesInput = {
    AND?: RefundRequestScalarWhereWithAggregatesInput | RefundRequestScalarWhereWithAggregatesInput[]
    OR?: RefundRequestScalarWhereWithAggregatesInput[]
    NOT?: RefundRequestScalarWhereWithAggregatesInput | RefundRequestScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"RefundRequest"> | string
    orderItemId?: StringWithAggregatesFilter<"RefundRequest"> | string
    userId?: StringWithAggregatesFilter<"RefundRequest"> | string
    sellerId?: StringWithAggregatesFilter<"RefundRequest"> | string
    reason?: EnumRefundReasonWithAggregatesFilter<"RefundRequest"> | $Enums.RefundReason
    status?: EnumRefundStatusWithAggregatesFilter<"RefundRequest"> | $Enums.RefundStatus
    comment?: StringNullableWithAggregatesFilter<"RefundRequest"> | string | null
    attachmentUrl?: StringNullableWithAggregatesFilter<"RefundRequest"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"RefundRequest"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"RefundRequest"> | Date | string
    resolvedAt?: DateTimeNullableWithAggregatesFilter<"RefundRequest"> | Date | string | null
  }

  export type RefundRequestCreateInput = {
    id?: string
    orderItemId: string
    userId: string
    sellerId: string
    reason: $Enums.RefundReason
    status?: $Enums.RefundStatus
    comment?: string | null
    attachmentUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    resolvedAt?: Date | string | null
  }

  export type RefundRequestUncheckedCreateInput = {
    id?: string
    orderItemId: string
    userId: string
    sellerId: string
    reason: $Enums.RefundReason
    status?: $Enums.RefundStatus
    comment?: string | null
    attachmentUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    resolvedAt?: Date | string | null
  }

  export type RefundRequestUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderItemId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    sellerId?: StringFieldUpdateOperationsInput | string
    reason?: EnumRefundReasonFieldUpdateOperationsInput | $Enums.RefundReason
    status?: EnumRefundStatusFieldUpdateOperationsInput | $Enums.RefundStatus
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    attachmentUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type RefundRequestUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderItemId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    sellerId?: StringFieldUpdateOperationsInput | string
    reason?: EnumRefundReasonFieldUpdateOperationsInput | $Enums.RefundReason
    status?: EnumRefundStatusFieldUpdateOperationsInput | $Enums.RefundStatus
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    attachmentUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type RefundRequestCreateManyInput = {
    id?: string
    orderItemId: string
    userId: string
    sellerId: string
    reason: $Enums.RefundReason
    status?: $Enums.RefundStatus
    comment?: string | null
    attachmentUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    resolvedAt?: Date | string | null
  }

  export type RefundRequestUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderItemId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    sellerId?: StringFieldUpdateOperationsInput | string
    reason?: EnumRefundReasonFieldUpdateOperationsInput | $Enums.RefundReason
    status?: EnumRefundStatusFieldUpdateOperationsInput | $Enums.RefundStatus
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    attachmentUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type RefundRequestUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderItemId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    sellerId?: StringFieldUpdateOperationsInput | string
    reason?: EnumRefundReasonFieldUpdateOperationsInput | $Enums.RefundReason
    status?: EnumRefundStatusFieldUpdateOperationsInput | $Enums.RefundStatus
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    attachmentUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
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

  export type EnumRefundReasonFilter<$PrismaModel = never> = {
    equals?: $Enums.RefundReason | EnumRefundReasonFieldRefInput<$PrismaModel>
    in?: $Enums.RefundReason[] | ListEnumRefundReasonFieldRefInput<$PrismaModel>
    notIn?: $Enums.RefundReason[] | ListEnumRefundReasonFieldRefInput<$PrismaModel>
    not?: NestedEnumRefundReasonFilter<$PrismaModel> | $Enums.RefundReason
  }

  export type EnumRefundStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.RefundStatus | EnumRefundStatusFieldRefInput<$PrismaModel>
    in?: $Enums.RefundStatus[] | ListEnumRefundStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.RefundStatus[] | ListEnumRefundStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumRefundStatusFilter<$PrismaModel> | $Enums.RefundStatus
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
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

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type RefundRequestCountOrderByAggregateInput = {
    id?: SortOrder
    orderItemId?: SortOrder
    userId?: SortOrder
    sellerId?: SortOrder
    reason?: SortOrder
    status?: SortOrder
    comment?: SortOrder
    attachmentUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    resolvedAt?: SortOrder
  }

  export type RefundRequestMaxOrderByAggregateInput = {
    id?: SortOrder
    orderItemId?: SortOrder
    userId?: SortOrder
    sellerId?: SortOrder
    reason?: SortOrder
    status?: SortOrder
    comment?: SortOrder
    attachmentUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    resolvedAt?: SortOrder
  }

  export type RefundRequestMinOrderByAggregateInput = {
    id?: SortOrder
    orderItemId?: SortOrder
    userId?: SortOrder
    sellerId?: SortOrder
    reason?: SortOrder
    status?: SortOrder
    comment?: SortOrder
    attachmentUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    resolvedAt?: SortOrder
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

  export type EnumRefundReasonWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RefundReason | EnumRefundReasonFieldRefInput<$PrismaModel>
    in?: $Enums.RefundReason[] | ListEnumRefundReasonFieldRefInput<$PrismaModel>
    notIn?: $Enums.RefundReason[] | ListEnumRefundReasonFieldRefInput<$PrismaModel>
    not?: NestedEnumRefundReasonWithAggregatesFilter<$PrismaModel> | $Enums.RefundReason
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRefundReasonFilter<$PrismaModel>
    _max?: NestedEnumRefundReasonFilter<$PrismaModel>
  }

  export type EnumRefundStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RefundStatus | EnumRefundStatusFieldRefInput<$PrismaModel>
    in?: $Enums.RefundStatus[] | ListEnumRefundStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.RefundStatus[] | ListEnumRefundStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumRefundStatusWithAggregatesFilter<$PrismaModel> | $Enums.RefundStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRefundStatusFilter<$PrismaModel>
    _max?: NestedEnumRefundStatusFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
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

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type EnumRefundReasonFieldUpdateOperationsInput = {
    set?: $Enums.RefundReason
  }

  export type EnumRefundStatusFieldUpdateOperationsInput = {
    set?: $Enums.RefundStatus
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
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

  export type NestedEnumRefundReasonFilter<$PrismaModel = never> = {
    equals?: $Enums.RefundReason | EnumRefundReasonFieldRefInput<$PrismaModel>
    in?: $Enums.RefundReason[] | ListEnumRefundReasonFieldRefInput<$PrismaModel>
    notIn?: $Enums.RefundReason[] | ListEnumRefundReasonFieldRefInput<$PrismaModel>
    not?: NestedEnumRefundReasonFilter<$PrismaModel> | $Enums.RefundReason
  }

  export type NestedEnumRefundStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.RefundStatus | EnumRefundStatusFieldRefInput<$PrismaModel>
    in?: $Enums.RefundStatus[] | ListEnumRefundStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.RefundStatus[] | ListEnumRefundStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumRefundStatusFilter<$PrismaModel> | $Enums.RefundStatus
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
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

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
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

  export type NestedEnumRefundReasonWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RefundReason | EnumRefundReasonFieldRefInput<$PrismaModel>
    in?: $Enums.RefundReason[] | ListEnumRefundReasonFieldRefInput<$PrismaModel>
    notIn?: $Enums.RefundReason[] | ListEnumRefundReasonFieldRefInput<$PrismaModel>
    not?: NestedEnumRefundReasonWithAggregatesFilter<$PrismaModel> | $Enums.RefundReason
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRefundReasonFilter<$PrismaModel>
    _max?: NestedEnumRefundReasonFilter<$PrismaModel>
  }

  export type NestedEnumRefundStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RefundStatus | EnumRefundStatusFieldRefInput<$PrismaModel>
    in?: $Enums.RefundStatus[] | ListEnumRefundStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.RefundStatus[] | ListEnumRefundStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumRefundStatusWithAggregatesFilter<$PrismaModel> | $Enums.RefundStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRefundStatusFilter<$PrismaModel>
    _max?: NestedEnumRefundStatusFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
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

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
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