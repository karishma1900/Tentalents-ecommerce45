
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
 * Model SearchLog
 * Logs every keyword searched by users (logged-in or anonymous)
 */
export type SearchLog = $Result.DefaultSelection<Prisma.$SearchLogPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more SearchLogs
 * const searchLogs = await prisma.searchLog.findMany()
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
   * // Fetch zero or more SearchLogs
   * const searchLogs = await prisma.searchLog.findMany()
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
   * `prisma.searchLog`: Exposes CRUD operations for the **SearchLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SearchLogs
    * const searchLogs = await prisma.searchLog.findMany()
    * ```
    */
  get searchLog(): Prisma.SearchLogDelegate<ExtArgs, ClientOptions>;
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
    SearchLog: 'SearchLog'
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
      modelProps: "searchLog"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      SearchLog: {
        payload: Prisma.$SearchLogPayload<ExtArgs>
        fields: Prisma.SearchLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SearchLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SearchLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SearchLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SearchLogPayload>
          }
          findFirst: {
            args: Prisma.SearchLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SearchLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SearchLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SearchLogPayload>
          }
          findMany: {
            args: Prisma.SearchLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SearchLogPayload>[]
          }
          create: {
            args: Prisma.SearchLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SearchLogPayload>
          }
          createMany: {
            args: Prisma.SearchLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SearchLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SearchLogPayload>[]
          }
          delete: {
            args: Prisma.SearchLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SearchLogPayload>
          }
          update: {
            args: Prisma.SearchLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SearchLogPayload>
          }
          deleteMany: {
            args: Prisma.SearchLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SearchLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SearchLogUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SearchLogPayload>[]
          }
          upsert: {
            args: Prisma.SearchLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SearchLogPayload>
          }
          aggregate: {
            args: Prisma.SearchLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSearchLog>
          }
          groupBy: {
            args: Prisma.SearchLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<SearchLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.SearchLogCountArgs<ExtArgs>
            result: $Utils.Optional<SearchLogCountAggregateOutputType> | number
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
    searchLog?: SearchLogOmit
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
   * Model SearchLog
   */

  export type AggregateSearchLog = {
    _count: SearchLogCountAggregateOutputType | null
    _avg: SearchLogAvgAggregateOutputType | null
    _sum: SearchLogSumAggregateOutputType | null
    _min: SearchLogMinAggregateOutputType | null
    _max: SearchLogMaxAggregateOutputType | null
  }

  export type SearchLogAvgAggregateOutputType = {
    resultCount: number | null
  }

  export type SearchLogSumAggregateOutputType = {
    resultCount: number | null
  }

  export type SearchLogMinAggregateOutputType = {
    id: string | null
    keyword: string | null
    userId: string | null
    sessionId: string | null
    sourceIp: string | null
    deviceType: string | null
    resultCount: number | null
    createdAt: Date | null
  }

  export type SearchLogMaxAggregateOutputType = {
    id: string | null
    keyword: string | null
    userId: string | null
    sessionId: string | null
    sourceIp: string | null
    deviceType: string | null
    resultCount: number | null
    createdAt: Date | null
  }

  export type SearchLogCountAggregateOutputType = {
    id: number
    keyword: number
    userId: number
    sessionId: number
    sourceIp: number
    deviceType: number
    resultCount: number
    createdAt: number
    _all: number
  }


  export type SearchLogAvgAggregateInputType = {
    resultCount?: true
  }

  export type SearchLogSumAggregateInputType = {
    resultCount?: true
  }

  export type SearchLogMinAggregateInputType = {
    id?: true
    keyword?: true
    userId?: true
    sessionId?: true
    sourceIp?: true
    deviceType?: true
    resultCount?: true
    createdAt?: true
  }

  export type SearchLogMaxAggregateInputType = {
    id?: true
    keyword?: true
    userId?: true
    sessionId?: true
    sourceIp?: true
    deviceType?: true
    resultCount?: true
    createdAt?: true
  }

  export type SearchLogCountAggregateInputType = {
    id?: true
    keyword?: true
    userId?: true
    sessionId?: true
    sourceIp?: true
    deviceType?: true
    resultCount?: true
    createdAt?: true
    _all?: true
  }

  export type SearchLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SearchLog to aggregate.
     */
    where?: SearchLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SearchLogs to fetch.
     */
    orderBy?: SearchLogOrderByWithRelationInput | SearchLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SearchLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SearchLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SearchLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SearchLogs
    **/
    _count?: true | SearchLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SearchLogAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SearchLogSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SearchLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SearchLogMaxAggregateInputType
  }

  export type GetSearchLogAggregateType<T extends SearchLogAggregateArgs> = {
        [P in keyof T & keyof AggregateSearchLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSearchLog[P]>
      : GetScalarType<T[P], AggregateSearchLog[P]>
  }




  export type SearchLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SearchLogWhereInput
    orderBy?: SearchLogOrderByWithAggregationInput | SearchLogOrderByWithAggregationInput[]
    by: SearchLogScalarFieldEnum[] | SearchLogScalarFieldEnum
    having?: SearchLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SearchLogCountAggregateInputType | true
    _avg?: SearchLogAvgAggregateInputType
    _sum?: SearchLogSumAggregateInputType
    _min?: SearchLogMinAggregateInputType
    _max?: SearchLogMaxAggregateInputType
  }

  export type SearchLogGroupByOutputType = {
    id: string
    keyword: string
    userId: string | null
    sessionId: string | null
    sourceIp: string | null
    deviceType: string | null
    resultCount: number | null
    createdAt: Date
    _count: SearchLogCountAggregateOutputType | null
    _avg: SearchLogAvgAggregateOutputType | null
    _sum: SearchLogSumAggregateOutputType | null
    _min: SearchLogMinAggregateOutputType | null
    _max: SearchLogMaxAggregateOutputType | null
  }

  type GetSearchLogGroupByPayload<T extends SearchLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SearchLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SearchLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SearchLogGroupByOutputType[P]>
            : GetScalarType<T[P], SearchLogGroupByOutputType[P]>
        }
      >
    >


  export type SearchLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    keyword?: boolean
    userId?: boolean
    sessionId?: boolean
    sourceIp?: boolean
    deviceType?: boolean
    resultCount?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["searchLog"]>

  export type SearchLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    keyword?: boolean
    userId?: boolean
    sessionId?: boolean
    sourceIp?: boolean
    deviceType?: boolean
    resultCount?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["searchLog"]>

  export type SearchLogSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    keyword?: boolean
    userId?: boolean
    sessionId?: boolean
    sourceIp?: boolean
    deviceType?: boolean
    resultCount?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["searchLog"]>

  export type SearchLogSelectScalar = {
    id?: boolean
    keyword?: boolean
    userId?: boolean
    sessionId?: boolean
    sourceIp?: boolean
    deviceType?: boolean
    resultCount?: boolean
    createdAt?: boolean
  }

  export type SearchLogOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "keyword" | "userId" | "sessionId" | "sourceIp" | "deviceType" | "resultCount" | "createdAt", ExtArgs["result"]["searchLog"]>

  export type $SearchLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SearchLog"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      keyword: string
      userId: string | null
      sessionId: string | null
      sourceIp: string | null
      deviceType: string | null
      resultCount: number | null
      createdAt: Date
    }, ExtArgs["result"]["searchLog"]>
    composites: {}
  }

  type SearchLogGetPayload<S extends boolean | null | undefined | SearchLogDefaultArgs> = $Result.GetResult<Prisma.$SearchLogPayload, S>

  type SearchLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SearchLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SearchLogCountAggregateInputType | true
    }

  export interface SearchLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SearchLog'], meta: { name: 'SearchLog' } }
    /**
     * Find zero or one SearchLog that matches the filter.
     * @param {SearchLogFindUniqueArgs} args - Arguments to find a SearchLog
     * @example
     * // Get one SearchLog
     * const searchLog = await prisma.searchLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SearchLogFindUniqueArgs>(args: SelectSubset<T, SearchLogFindUniqueArgs<ExtArgs>>): Prisma__SearchLogClient<$Result.GetResult<Prisma.$SearchLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one SearchLog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SearchLogFindUniqueOrThrowArgs} args - Arguments to find a SearchLog
     * @example
     * // Get one SearchLog
     * const searchLog = await prisma.searchLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SearchLogFindUniqueOrThrowArgs>(args: SelectSubset<T, SearchLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SearchLogClient<$Result.GetResult<Prisma.$SearchLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SearchLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SearchLogFindFirstArgs} args - Arguments to find a SearchLog
     * @example
     * // Get one SearchLog
     * const searchLog = await prisma.searchLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SearchLogFindFirstArgs>(args?: SelectSubset<T, SearchLogFindFirstArgs<ExtArgs>>): Prisma__SearchLogClient<$Result.GetResult<Prisma.$SearchLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SearchLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SearchLogFindFirstOrThrowArgs} args - Arguments to find a SearchLog
     * @example
     * // Get one SearchLog
     * const searchLog = await prisma.searchLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SearchLogFindFirstOrThrowArgs>(args?: SelectSubset<T, SearchLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__SearchLogClient<$Result.GetResult<Prisma.$SearchLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SearchLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SearchLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SearchLogs
     * const searchLogs = await prisma.searchLog.findMany()
     * 
     * // Get first 10 SearchLogs
     * const searchLogs = await prisma.searchLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const searchLogWithIdOnly = await prisma.searchLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SearchLogFindManyArgs>(args?: SelectSubset<T, SearchLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SearchLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a SearchLog.
     * @param {SearchLogCreateArgs} args - Arguments to create a SearchLog.
     * @example
     * // Create one SearchLog
     * const SearchLog = await prisma.searchLog.create({
     *   data: {
     *     // ... data to create a SearchLog
     *   }
     * })
     * 
     */
    create<T extends SearchLogCreateArgs>(args: SelectSubset<T, SearchLogCreateArgs<ExtArgs>>): Prisma__SearchLogClient<$Result.GetResult<Prisma.$SearchLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many SearchLogs.
     * @param {SearchLogCreateManyArgs} args - Arguments to create many SearchLogs.
     * @example
     * // Create many SearchLogs
     * const searchLog = await prisma.searchLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SearchLogCreateManyArgs>(args?: SelectSubset<T, SearchLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SearchLogs and returns the data saved in the database.
     * @param {SearchLogCreateManyAndReturnArgs} args - Arguments to create many SearchLogs.
     * @example
     * // Create many SearchLogs
     * const searchLog = await prisma.searchLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SearchLogs and only return the `id`
     * const searchLogWithIdOnly = await prisma.searchLog.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SearchLogCreateManyAndReturnArgs>(args?: SelectSubset<T, SearchLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SearchLogPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a SearchLog.
     * @param {SearchLogDeleteArgs} args - Arguments to delete one SearchLog.
     * @example
     * // Delete one SearchLog
     * const SearchLog = await prisma.searchLog.delete({
     *   where: {
     *     // ... filter to delete one SearchLog
     *   }
     * })
     * 
     */
    delete<T extends SearchLogDeleteArgs>(args: SelectSubset<T, SearchLogDeleteArgs<ExtArgs>>): Prisma__SearchLogClient<$Result.GetResult<Prisma.$SearchLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one SearchLog.
     * @param {SearchLogUpdateArgs} args - Arguments to update one SearchLog.
     * @example
     * // Update one SearchLog
     * const searchLog = await prisma.searchLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SearchLogUpdateArgs>(args: SelectSubset<T, SearchLogUpdateArgs<ExtArgs>>): Prisma__SearchLogClient<$Result.GetResult<Prisma.$SearchLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more SearchLogs.
     * @param {SearchLogDeleteManyArgs} args - Arguments to filter SearchLogs to delete.
     * @example
     * // Delete a few SearchLogs
     * const { count } = await prisma.searchLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SearchLogDeleteManyArgs>(args?: SelectSubset<T, SearchLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SearchLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SearchLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SearchLogs
     * const searchLog = await prisma.searchLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SearchLogUpdateManyArgs>(args: SelectSubset<T, SearchLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SearchLogs and returns the data updated in the database.
     * @param {SearchLogUpdateManyAndReturnArgs} args - Arguments to update many SearchLogs.
     * @example
     * // Update many SearchLogs
     * const searchLog = await prisma.searchLog.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more SearchLogs and only return the `id`
     * const searchLogWithIdOnly = await prisma.searchLog.updateManyAndReturn({
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
    updateManyAndReturn<T extends SearchLogUpdateManyAndReturnArgs>(args: SelectSubset<T, SearchLogUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SearchLogPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one SearchLog.
     * @param {SearchLogUpsertArgs} args - Arguments to update or create a SearchLog.
     * @example
     * // Update or create a SearchLog
     * const searchLog = await prisma.searchLog.upsert({
     *   create: {
     *     // ... data to create a SearchLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SearchLog we want to update
     *   }
     * })
     */
    upsert<T extends SearchLogUpsertArgs>(args: SelectSubset<T, SearchLogUpsertArgs<ExtArgs>>): Prisma__SearchLogClient<$Result.GetResult<Prisma.$SearchLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of SearchLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SearchLogCountArgs} args - Arguments to filter SearchLogs to count.
     * @example
     * // Count the number of SearchLogs
     * const count = await prisma.searchLog.count({
     *   where: {
     *     // ... the filter for the SearchLogs we want to count
     *   }
     * })
    **/
    count<T extends SearchLogCountArgs>(
      args?: Subset<T, SearchLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SearchLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SearchLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SearchLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends SearchLogAggregateArgs>(args: Subset<T, SearchLogAggregateArgs>): Prisma.PrismaPromise<GetSearchLogAggregateType<T>>

    /**
     * Group by SearchLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SearchLogGroupByArgs} args - Group by arguments.
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
      T extends SearchLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SearchLogGroupByArgs['orderBy'] }
        : { orderBy?: SearchLogGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, SearchLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSearchLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SearchLog model
   */
  readonly fields: SearchLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SearchLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SearchLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the SearchLog model
   */
  interface SearchLogFieldRefs {
    readonly id: FieldRef<"SearchLog", 'String'>
    readonly keyword: FieldRef<"SearchLog", 'String'>
    readonly userId: FieldRef<"SearchLog", 'String'>
    readonly sessionId: FieldRef<"SearchLog", 'String'>
    readonly sourceIp: FieldRef<"SearchLog", 'String'>
    readonly deviceType: FieldRef<"SearchLog", 'String'>
    readonly resultCount: FieldRef<"SearchLog", 'Int'>
    readonly createdAt: FieldRef<"SearchLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * SearchLog findUnique
   */
  export type SearchLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SearchLog
     */
    select?: SearchLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SearchLog
     */
    omit?: SearchLogOmit<ExtArgs> | null
    /**
     * Filter, which SearchLog to fetch.
     */
    where: SearchLogWhereUniqueInput
  }

  /**
   * SearchLog findUniqueOrThrow
   */
  export type SearchLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SearchLog
     */
    select?: SearchLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SearchLog
     */
    omit?: SearchLogOmit<ExtArgs> | null
    /**
     * Filter, which SearchLog to fetch.
     */
    where: SearchLogWhereUniqueInput
  }

  /**
   * SearchLog findFirst
   */
  export type SearchLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SearchLog
     */
    select?: SearchLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SearchLog
     */
    omit?: SearchLogOmit<ExtArgs> | null
    /**
     * Filter, which SearchLog to fetch.
     */
    where?: SearchLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SearchLogs to fetch.
     */
    orderBy?: SearchLogOrderByWithRelationInput | SearchLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SearchLogs.
     */
    cursor?: SearchLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SearchLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SearchLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SearchLogs.
     */
    distinct?: SearchLogScalarFieldEnum | SearchLogScalarFieldEnum[]
  }

  /**
   * SearchLog findFirstOrThrow
   */
  export type SearchLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SearchLog
     */
    select?: SearchLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SearchLog
     */
    omit?: SearchLogOmit<ExtArgs> | null
    /**
     * Filter, which SearchLog to fetch.
     */
    where?: SearchLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SearchLogs to fetch.
     */
    orderBy?: SearchLogOrderByWithRelationInput | SearchLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SearchLogs.
     */
    cursor?: SearchLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SearchLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SearchLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SearchLogs.
     */
    distinct?: SearchLogScalarFieldEnum | SearchLogScalarFieldEnum[]
  }

  /**
   * SearchLog findMany
   */
  export type SearchLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SearchLog
     */
    select?: SearchLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SearchLog
     */
    omit?: SearchLogOmit<ExtArgs> | null
    /**
     * Filter, which SearchLogs to fetch.
     */
    where?: SearchLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SearchLogs to fetch.
     */
    orderBy?: SearchLogOrderByWithRelationInput | SearchLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SearchLogs.
     */
    cursor?: SearchLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SearchLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SearchLogs.
     */
    skip?: number
    distinct?: SearchLogScalarFieldEnum | SearchLogScalarFieldEnum[]
  }

  /**
   * SearchLog create
   */
  export type SearchLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SearchLog
     */
    select?: SearchLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SearchLog
     */
    omit?: SearchLogOmit<ExtArgs> | null
    /**
     * The data needed to create a SearchLog.
     */
    data: XOR<SearchLogCreateInput, SearchLogUncheckedCreateInput>
  }

  /**
   * SearchLog createMany
   */
  export type SearchLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SearchLogs.
     */
    data: SearchLogCreateManyInput | SearchLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SearchLog createManyAndReturn
   */
  export type SearchLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SearchLog
     */
    select?: SearchLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SearchLog
     */
    omit?: SearchLogOmit<ExtArgs> | null
    /**
     * The data used to create many SearchLogs.
     */
    data: SearchLogCreateManyInput | SearchLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SearchLog update
   */
  export type SearchLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SearchLog
     */
    select?: SearchLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SearchLog
     */
    omit?: SearchLogOmit<ExtArgs> | null
    /**
     * The data needed to update a SearchLog.
     */
    data: XOR<SearchLogUpdateInput, SearchLogUncheckedUpdateInput>
    /**
     * Choose, which SearchLog to update.
     */
    where: SearchLogWhereUniqueInput
  }

  /**
   * SearchLog updateMany
   */
  export type SearchLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SearchLogs.
     */
    data: XOR<SearchLogUpdateManyMutationInput, SearchLogUncheckedUpdateManyInput>
    /**
     * Filter which SearchLogs to update
     */
    where?: SearchLogWhereInput
    /**
     * Limit how many SearchLogs to update.
     */
    limit?: number
  }

  /**
   * SearchLog updateManyAndReturn
   */
  export type SearchLogUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SearchLog
     */
    select?: SearchLogSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SearchLog
     */
    omit?: SearchLogOmit<ExtArgs> | null
    /**
     * The data used to update SearchLogs.
     */
    data: XOR<SearchLogUpdateManyMutationInput, SearchLogUncheckedUpdateManyInput>
    /**
     * Filter which SearchLogs to update
     */
    where?: SearchLogWhereInput
    /**
     * Limit how many SearchLogs to update.
     */
    limit?: number
  }

  /**
   * SearchLog upsert
   */
  export type SearchLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SearchLog
     */
    select?: SearchLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SearchLog
     */
    omit?: SearchLogOmit<ExtArgs> | null
    /**
     * The filter to search for the SearchLog to update in case it exists.
     */
    where: SearchLogWhereUniqueInput
    /**
     * In case the SearchLog found by the `where` argument doesn't exist, create a new SearchLog with this data.
     */
    create: XOR<SearchLogCreateInput, SearchLogUncheckedCreateInput>
    /**
     * In case the SearchLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SearchLogUpdateInput, SearchLogUncheckedUpdateInput>
  }

  /**
   * SearchLog delete
   */
  export type SearchLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SearchLog
     */
    select?: SearchLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SearchLog
     */
    omit?: SearchLogOmit<ExtArgs> | null
    /**
     * Filter which SearchLog to delete.
     */
    where: SearchLogWhereUniqueInput
  }

  /**
   * SearchLog deleteMany
   */
  export type SearchLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SearchLogs to delete
     */
    where?: SearchLogWhereInput
    /**
     * Limit how many SearchLogs to delete.
     */
    limit?: number
  }

  /**
   * SearchLog without action
   */
  export type SearchLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SearchLog
     */
    select?: SearchLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SearchLog
     */
    omit?: SearchLogOmit<ExtArgs> | null
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


  export const SearchLogScalarFieldEnum: {
    id: 'id',
    keyword: 'keyword',
    userId: 'userId',
    sessionId: 'sessionId',
    sourceIp: 'sourceIp',
    deviceType: 'deviceType',
    resultCount: 'resultCount',
    createdAt: 'createdAt'
  };

  export type SearchLogScalarFieldEnum = (typeof SearchLogScalarFieldEnum)[keyof typeof SearchLogScalarFieldEnum]


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


  export type SearchLogWhereInput = {
    AND?: SearchLogWhereInput | SearchLogWhereInput[]
    OR?: SearchLogWhereInput[]
    NOT?: SearchLogWhereInput | SearchLogWhereInput[]
    id?: StringFilter<"SearchLog"> | string
    keyword?: StringFilter<"SearchLog"> | string
    userId?: StringNullableFilter<"SearchLog"> | string | null
    sessionId?: StringNullableFilter<"SearchLog"> | string | null
    sourceIp?: StringNullableFilter<"SearchLog"> | string | null
    deviceType?: StringNullableFilter<"SearchLog"> | string | null
    resultCount?: IntNullableFilter<"SearchLog"> | number | null
    createdAt?: DateTimeFilter<"SearchLog"> | Date | string
  }

  export type SearchLogOrderByWithRelationInput = {
    id?: SortOrder
    keyword?: SortOrder
    userId?: SortOrderInput | SortOrder
    sessionId?: SortOrderInput | SortOrder
    sourceIp?: SortOrderInput | SortOrder
    deviceType?: SortOrderInput | SortOrder
    resultCount?: SortOrderInput | SortOrder
    createdAt?: SortOrder
  }

  export type SearchLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: SearchLogWhereInput | SearchLogWhereInput[]
    OR?: SearchLogWhereInput[]
    NOT?: SearchLogWhereInput | SearchLogWhereInput[]
    keyword?: StringFilter<"SearchLog"> | string
    userId?: StringNullableFilter<"SearchLog"> | string | null
    sessionId?: StringNullableFilter<"SearchLog"> | string | null
    sourceIp?: StringNullableFilter<"SearchLog"> | string | null
    deviceType?: StringNullableFilter<"SearchLog"> | string | null
    resultCount?: IntNullableFilter<"SearchLog"> | number | null
    createdAt?: DateTimeFilter<"SearchLog"> | Date | string
  }, "id">

  export type SearchLogOrderByWithAggregationInput = {
    id?: SortOrder
    keyword?: SortOrder
    userId?: SortOrderInput | SortOrder
    sessionId?: SortOrderInput | SortOrder
    sourceIp?: SortOrderInput | SortOrder
    deviceType?: SortOrderInput | SortOrder
    resultCount?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: SearchLogCountOrderByAggregateInput
    _avg?: SearchLogAvgOrderByAggregateInput
    _max?: SearchLogMaxOrderByAggregateInput
    _min?: SearchLogMinOrderByAggregateInput
    _sum?: SearchLogSumOrderByAggregateInput
  }

  export type SearchLogScalarWhereWithAggregatesInput = {
    AND?: SearchLogScalarWhereWithAggregatesInput | SearchLogScalarWhereWithAggregatesInput[]
    OR?: SearchLogScalarWhereWithAggregatesInput[]
    NOT?: SearchLogScalarWhereWithAggregatesInput | SearchLogScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"SearchLog"> | string
    keyword?: StringWithAggregatesFilter<"SearchLog"> | string
    userId?: StringNullableWithAggregatesFilter<"SearchLog"> | string | null
    sessionId?: StringNullableWithAggregatesFilter<"SearchLog"> | string | null
    sourceIp?: StringNullableWithAggregatesFilter<"SearchLog"> | string | null
    deviceType?: StringNullableWithAggregatesFilter<"SearchLog"> | string | null
    resultCount?: IntNullableWithAggregatesFilter<"SearchLog"> | number | null
    createdAt?: DateTimeWithAggregatesFilter<"SearchLog"> | Date | string
  }

  export type SearchLogCreateInput = {
    id?: string
    keyword: string
    userId?: string | null
    sessionId?: string | null
    sourceIp?: string | null
    deviceType?: string | null
    resultCount?: number | null
    createdAt?: Date | string
  }

  export type SearchLogUncheckedCreateInput = {
    id?: string
    keyword: string
    userId?: string | null
    sessionId?: string | null
    sourceIp?: string | null
    deviceType?: string | null
    resultCount?: number | null
    createdAt?: Date | string
  }

  export type SearchLogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    keyword?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    sessionId?: NullableStringFieldUpdateOperationsInput | string | null
    sourceIp?: NullableStringFieldUpdateOperationsInput | string | null
    deviceType?: NullableStringFieldUpdateOperationsInput | string | null
    resultCount?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SearchLogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    keyword?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    sessionId?: NullableStringFieldUpdateOperationsInput | string | null
    sourceIp?: NullableStringFieldUpdateOperationsInput | string | null
    deviceType?: NullableStringFieldUpdateOperationsInput | string | null
    resultCount?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SearchLogCreateManyInput = {
    id?: string
    keyword: string
    userId?: string | null
    sessionId?: string | null
    sourceIp?: string | null
    deviceType?: string | null
    resultCount?: number | null
    createdAt?: Date | string
  }

  export type SearchLogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    keyword?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    sessionId?: NullableStringFieldUpdateOperationsInput | string | null
    sourceIp?: NullableStringFieldUpdateOperationsInput | string | null
    deviceType?: NullableStringFieldUpdateOperationsInput | string | null
    resultCount?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SearchLogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    keyword?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    sessionId?: NullableStringFieldUpdateOperationsInput | string | null
    sourceIp?: NullableStringFieldUpdateOperationsInput | string | null
    deviceType?: NullableStringFieldUpdateOperationsInput | string | null
    resultCount?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
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

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type SearchLogCountOrderByAggregateInput = {
    id?: SortOrder
    keyword?: SortOrder
    userId?: SortOrder
    sessionId?: SortOrder
    sourceIp?: SortOrder
    deviceType?: SortOrder
    resultCount?: SortOrder
    createdAt?: SortOrder
  }

  export type SearchLogAvgOrderByAggregateInput = {
    resultCount?: SortOrder
  }

  export type SearchLogMaxOrderByAggregateInput = {
    id?: SortOrder
    keyword?: SortOrder
    userId?: SortOrder
    sessionId?: SortOrder
    sourceIp?: SortOrder
    deviceType?: SortOrder
    resultCount?: SortOrder
    createdAt?: SortOrder
  }

  export type SearchLogMinOrderByAggregateInput = {
    id?: SortOrder
    keyword?: SortOrder
    userId?: SortOrder
    sessionId?: SortOrder
    sourceIp?: SortOrder
    deviceType?: SortOrder
    resultCount?: SortOrder
    createdAt?: SortOrder
  }

  export type SearchLogSumOrderByAggregateInput = {
    resultCount?: SortOrder
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

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
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