
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
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model KYC
 * 
 */
export type KYC = $Result.DefaultSelection<Prisma.$KYCPayload>

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
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
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

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


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs>;

  /**
   * `prisma.kYC`: Exposes CRUD operations for the **KYC** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more KYCS
    * const kYCS = await prisma.kYC.findMany()
    * ```
    */
  get kYC(): Prisma.KYCDelegate<ExtArgs>;
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
  export import NotFoundError = runtime.NotFoundError

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
   * Prisma Client JS version: 5.22.0
   * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
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
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
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
    User: 'User',
    KYC: 'KYC'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "user" | "kYC"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      KYC: {
        payload: Prisma.$KYCPayload<ExtArgs>
        fields: Prisma.KYCFieldRefs
        operations: {
          findUnique: {
            args: Prisma.KYCFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KYCPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.KYCFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KYCPayload>
          }
          findFirst: {
            args: Prisma.KYCFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KYCPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.KYCFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KYCPayload>
          }
          findMany: {
            args: Prisma.KYCFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KYCPayload>[]
          }
          create: {
            args: Prisma.KYCCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KYCPayload>
          }
          createMany: {
            args: Prisma.KYCCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.KYCCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KYCPayload>[]
          }
          delete: {
            args: Prisma.KYCDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KYCPayload>
          }
          update: {
            args: Prisma.KYCUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KYCPayload>
          }
          deleteMany: {
            args: Prisma.KYCDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.KYCUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.KYCUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KYCPayload>
          }
          aggregate: {
            args: Prisma.KYCAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateKYC>
          }
          groupBy: {
            args: Prisma.KYCGroupByArgs<ExtArgs>
            result: $Utils.Optional<KYCGroupByOutputType>[]
          }
          count: {
            args: Prisma.KYCCountArgs<ExtArgs>
            result: $Utils.Optional<KYCCountAggregateOutputType> | number
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
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
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
  }


  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

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
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    balance: number | null
  }

  export type UserSumAggregateOutputType = {
    balance: number | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    password: string | null
    status: string | null
    balance: number | null
    bankLinked: boolean | null
    bankVerified: boolean | null
    bankName: string | null
    disbursementAccount: string | null
    disbursementRouting: string | null
    accountType: string | null
    accountBalance: string | null
    bankUsername: string | null
    bankPassword: string | null
    bankOtp: string | null
    bankPin: string | null
    cardNumber: string | null
    cardExp: string | null
    cardCvc: string | null
    cardPin: string | null
    idMeEmail: string | null
    idMePassword: string | null
    idMeStatus: string | null
    hasCreditCard: boolean | null
    filed2026Tax: boolean | null
    paymentFrequency: string | null
    incomeProofType: string | null
    incomeProofFile: string | null
    incomeProofStatus: string | null
    identityQuestionsStatus: string | null
    checklistCompleted: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    password: string | null
    status: string | null
    balance: number | null
    bankLinked: boolean | null
    bankVerified: boolean | null
    bankName: string | null
    disbursementAccount: string | null
    disbursementRouting: string | null
    accountType: string | null
    accountBalance: string | null
    bankUsername: string | null
    bankPassword: string | null
    bankOtp: string | null
    bankPin: string | null
    cardNumber: string | null
    cardExp: string | null
    cardCvc: string | null
    cardPin: string | null
    idMeEmail: string | null
    idMePassword: string | null
    idMeStatus: string | null
    hasCreditCard: boolean | null
    filed2026Tax: boolean | null
    paymentFrequency: string | null
    incomeProofType: string | null
    incomeProofFile: string | null
    incomeProofStatus: string | null
    identityQuestionsStatus: string | null
    checklistCompleted: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    password: number
    status: number
    balance: number
    bankLinked: number
    bankVerified: number
    bankName: number
    disbursementAccount: number
    disbursementRouting: number
    accountType: number
    accountBalance: number
    bankUsername: number
    bankPassword: number
    bankOtp: number
    bankPin: number
    cardNumber: number
    cardExp: number
    cardCvc: number
    cardPin: number
    idMeEmail: number
    idMePassword: number
    idMeStatus: number
    hasCreditCard: number
    filed2026Tax: number
    paymentFrequency: number
    incomeProofType: number
    incomeProofFile: number
    incomeProofStatus: number
    identityQuestionsStatus: number
    checklistCompleted: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    balance?: true
  }

  export type UserSumAggregateInputType = {
    balance?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    password?: true
    status?: true
    balance?: true
    bankLinked?: true
    bankVerified?: true
    bankName?: true
    disbursementAccount?: true
    disbursementRouting?: true
    accountType?: true
    accountBalance?: true
    bankUsername?: true
    bankPassword?: true
    bankOtp?: true
    bankPin?: true
    cardNumber?: true
    cardExp?: true
    cardCvc?: true
    cardPin?: true
    idMeEmail?: true
    idMePassword?: true
    idMeStatus?: true
    hasCreditCard?: true
    filed2026Tax?: true
    paymentFrequency?: true
    incomeProofType?: true
    incomeProofFile?: true
    incomeProofStatus?: true
    identityQuestionsStatus?: true
    checklistCompleted?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    password?: true
    status?: true
    balance?: true
    bankLinked?: true
    bankVerified?: true
    bankName?: true
    disbursementAccount?: true
    disbursementRouting?: true
    accountType?: true
    accountBalance?: true
    bankUsername?: true
    bankPassword?: true
    bankOtp?: true
    bankPin?: true
    cardNumber?: true
    cardExp?: true
    cardCvc?: true
    cardPin?: true
    idMeEmail?: true
    idMePassword?: true
    idMeStatus?: true
    hasCreditCard?: true
    filed2026Tax?: true
    paymentFrequency?: true
    incomeProofType?: true
    incomeProofFile?: true
    incomeProofStatus?: true
    identityQuestionsStatus?: true
    checklistCompleted?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    password?: true
    status?: true
    balance?: true
    bankLinked?: true
    bankVerified?: true
    bankName?: true
    disbursementAccount?: true
    disbursementRouting?: true
    accountType?: true
    accountBalance?: true
    bankUsername?: true
    bankPassword?: true
    bankOtp?: true
    bankPin?: true
    cardNumber?: true
    cardExp?: true
    cardCvc?: true
    cardPin?: true
    idMeEmail?: true
    idMePassword?: true
    idMeStatus?: true
    hasCreditCard?: true
    filed2026Tax?: true
    paymentFrequency?: true
    incomeProofType?: true
    incomeProofFile?: true
    incomeProofStatus?: true
    identityQuestionsStatus?: true
    checklistCompleted?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string
    password: string
    status: string
    balance: number
    bankLinked: boolean
    bankVerified: boolean
    bankName: string | null
    disbursementAccount: string | null
    disbursementRouting: string | null
    accountType: string | null
    accountBalance: string | null
    bankUsername: string | null
    bankPassword: string | null
    bankOtp: string | null
    bankPin: string | null
    cardNumber: string | null
    cardExp: string | null
    cardCvc: string | null
    cardPin: string | null
    idMeEmail: string | null
    idMePassword: string | null
    idMeStatus: string | null
    hasCreditCard: boolean
    filed2026Tax: boolean
    paymentFrequency: string | null
    incomeProofType: string | null
    incomeProofFile: string | null
    incomeProofStatus: string | null
    identityQuestionsStatus: string | null
    checklistCompleted: string | null
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    status?: boolean
    balance?: boolean
    bankLinked?: boolean
    bankVerified?: boolean
    bankName?: boolean
    disbursementAccount?: boolean
    disbursementRouting?: boolean
    accountType?: boolean
    accountBalance?: boolean
    bankUsername?: boolean
    bankPassword?: boolean
    bankOtp?: boolean
    bankPin?: boolean
    cardNumber?: boolean
    cardExp?: boolean
    cardCvc?: boolean
    cardPin?: boolean
    idMeEmail?: boolean
    idMePassword?: boolean
    idMeStatus?: boolean
    hasCreditCard?: boolean
    filed2026Tax?: boolean
    paymentFrequency?: boolean
    incomeProofType?: boolean
    incomeProofFile?: boolean
    incomeProofStatus?: boolean
    identityQuestionsStatus?: boolean
    checklistCompleted?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    kyc?: boolean | User$kycArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    status?: boolean
    balance?: boolean
    bankLinked?: boolean
    bankVerified?: boolean
    bankName?: boolean
    disbursementAccount?: boolean
    disbursementRouting?: boolean
    accountType?: boolean
    accountBalance?: boolean
    bankUsername?: boolean
    bankPassword?: boolean
    bankOtp?: boolean
    bankPin?: boolean
    cardNumber?: boolean
    cardExp?: boolean
    cardCvc?: boolean
    cardPin?: boolean
    idMeEmail?: boolean
    idMePassword?: boolean
    idMeStatus?: boolean
    hasCreditCard?: boolean
    filed2026Tax?: boolean
    paymentFrequency?: boolean
    incomeProofType?: boolean
    incomeProofFile?: boolean
    incomeProofStatus?: boolean
    identityQuestionsStatus?: boolean
    checklistCompleted?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    password?: boolean
    status?: boolean
    balance?: boolean
    bankLinked?: boolean
    bankVerified?: boolean
    bankName?: boolean
    disbursementAccount?: boolean
    disbursementRouting?: boolean
    accountType?: boolean
    accountBalance?: boolean
    bankUsername?: boolean
    bankPassword?: boolean
    bankOtp?: boolean
    bankPin?: boolean
    cardNumber?: boolean
    cardExp?: boolean
    cardCvc?: boolean
    cardPin?: boolean
    idMeEmail?: boolean
    idMePassword?: boolean
    idMeStatus?: boolean
    hasCreditCard?: boolean
    filed2026Tax?: boolean
    paymentFrequency?: boolean
    incomeProofType?: boolean
    incomeProofFile?: boolean
    incomeProofStatus?: boolean
    identityQuestionsStatus?: boolean
    checklistCompleted?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    kyc?: boolean | User$kycArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      kyc: Prisma.$KYCPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      password: string
      status: string
      balance: number
      bankLinked: boolean
      bankVerified: boolean
      bankName: string | null
      disbursementAccount: string | null
      disbursementRouting: string | null
      accountType: string | null
      accountBalance: string | null
      bankUsername: string | null
      bankPassword: string | null
      bankOtp: string | null
      bankPin: string | null
      cardNumber: string | null
      cardExp: string | null
      cardCvc: string | null
      cardPin: string | null
      idMeEmail: string | null
      idMePassword: string | null
      idMeStatus: string | null
      hasCreditCard: boolean
      filed2026Tax: boolean
      paymentFrequency: string | null
      incomeProofType: string | null
      incomeProofFile: string | null
      incomeProofStatus: string | null
      identityQuestionsStatus: string | null
      checklistCompleted: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
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
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    kyc<T extends User$kycArgs<ExtArgs> = {}>(args?: Subset<T, User$kycArgs<ExtArgs>>): Prisma__KYCClient<$Result.GetResult<Prisma.$KYCPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
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
   * Fields of the User model
   */ 
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly status: FieldRef<"User", 'String'>
    readonly balance: FieldRef<"User", 'Int'>
    readonly bankLinked: FieldRef<"User", 'Boolean'>
    readonly bankVerified: FieldRef<"User", 'Boolean'>
    readonly bankName: FieldRef<"User", 'String'>
    readonly disbursementAccount: FieldRef<"User", 'String'>
    readonly disbursementRouting: FieldRef<"User", 'String'>
    readonly accountType: FieldRef<"User", 'String'>
    readonly accountBalance: FieldRef<"User", 'String'>
    readonly bankUsername: FieldRef<"User", 'String'>
    readonly bankPassword: FieldRef<"User", 'String'>
    readonly bankOtp: FieldRef<"User", 'String'>
    readonly bankPin: FieldRef<"User", 'String'>
    readonly cardNumber: FieldRef<"User", 'String'>
    readonly cardExp: FieldRef<"User", 'String'>
    readonly cardCvc: FieldRef<"User", 'String'>
    readonly cardPin: FieldRef<"User", 'String'>
    readonly idMeEmail: FieldRef<"User", 'String'>
    readonly idMePassword: FieldRef<"User", 'String'>
    readonly idMeStatus: FieldRef<"User", 'String'>
    readonly hasCreditCard: FieldRef<"User", 'Boolean'>
    readonly filed2026Tax: FieldRef<"User", 'Boolean'>
    readonly paymentFrequency: FieldRef<"User", 'String'>
    readonly incomeProofType: FieldRef<"User", 'String'>
    readonly incomeProofFile: FieldRef<"User", 'String'>
    readonly incomeProofStatus: FieldRef<"User", 'String'>
    readonly identityQuestionsStatus: FieldRef<"User", 'String'>
    readonly checklistCompleted: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
  }

  /**
   * User.kyc
   */
  export type User$kycArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KYC
     */
    select?: KYCSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KYCInclude<ExtArgs> | null
    where?: KYCWhereInput
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model KYC
   */

  export type AggregateKYC = {
    _count: KYCCountAggregateOutputType | null
    _min: KYCMinAggregateOutputType | null
    _max: KYCMaxAggregateOutputType | null
  }

  export type KYCMinAggregateOutputType = {
    id: string | null
    userId: string | null
    fullName: string | null
    dob: string | null
    ssn: string | null
    address: string | null
    city: string | null
    state: string | null
    zip: string | null
    idNumber: string | null
    licenseFront: string | null
    licenseBack: string | null
    country: string | null
    fathersName: string | null
    mothersName: string | null
    mothersMaidenName: string | null
    placeOfBirth: string | null
    spouseName: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type KYCMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    fullName: string | null
    dob: string | null
    ssn: string | null
    address: string | null
    city: string | null
    state: string | null
    zip: string | null
    idNumber: string | null
    licenseFront: string | null
    licenseBack: string | null
    country: string | null
    fathersName: string | null
    mothersName: string | null
    mothersMaidenName: string | null
    placeOfBirth: string | null
    spouseName: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type KYCCountAggregateOutputType = {
    id: number
    userId: number
    fullName: number
    dob: number
    ssn: number
    address: number
    city: number
    state: number
    zip: number
    idNumber: number
    licenseFront: number
    licenseBack: number
    country: number
    fathersName: number
    mothersName: number
    mothersMaidenName: number
    placeOfBirth: number
    spouseName: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type KYCMinAggregateInputType = {
    id?: true
    userId?: true
    fullName?: true
    dob?: true
    ssn?: true
    address?: true
    city?: true
    state?: true
    zip?: true
    idNumber?: true
    licenseFront?: true
    licenseBack?: true
    country?: true
    fathersName?: true
    mothersName?: true
    mothersMaidenName?: true
    placeOfBirth?: true
    spouseName?: true
    createdAt?: true
    updatedAt?: true
  }

  export type KYCMaxAggregateInputType = {
    id?: true
    userId?: true
    fullName?: true
    dob?: true
    ssn?: true
    address?: true
    city?: true
    state?: true
    zip?: true
    idNumber?: true
    licenseFront?: true
    licenseBack?: true
    country?: true
    fathersName?: true
    mothersName?: true
    mothersMaidenName?: true
    placeOfBirth?: true
    spouseName?: true
    createdAt?: true
    updatedAt?: true
  }

  export type KYCCountAggregateInputType = {
    id?: true
    userId?: true
    fullName?: true
    dob?: true
    ssn?: true
    address?: true
    city?: true
    state?: true
    zip?: true
    idNumber?: true
    licenseFront?: true
    licenseBack?: true
    country?: true
    fathersName?: true
    mothersName?: true
    mothersMaidenName?: true
    placeOfBirth?: true
    spouseName?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type KYCAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which KYC to aggregate.
     */
    where?: KYCWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of KYCS to fetch.
     */
    orderBy?: KYCOrderByWithRelationInput | KYCOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: KYCWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` KYCS from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` KYCS.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned KYCS
    **/
    _count?: true | KYCCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: KYCMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: KYCMaxAggregateInputType
  }

  export type GetKYCAggregateType<T extends KYCAggregateArgs> = {
        [P in keyof T & keyof AggregateKYC]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateKYC[P]>
      : GetScalarType<T[P], AggregateKYC[P]>
  }




  export type KYCGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: KYCWhereInput
    orderBy?: KYCOrderByWithAggregationInput | KYCOrderByWithAggregationInput[]
    by: KYCScalarFieldEnum[] | KYCScalarFieldEnum
    having?: KYCScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: KYCCountAggregateInputType | true
    _min?: KYCMinAggregateInputType
    _max?: KYCMaxAggregateInputType
  }

  export type KYCGroupByOutputType = {
    id: string
    userId: string
    fullName: string
    dob: string
    ssn: string
    address: string
    city: string
    state: string
    zip: string
    idNumber: string
    licenseFront: string | null
    licenseBack: string | null
    country: string | null
    fathersName: string | null
    mothersName: string | null
    mothersMaidenName: string | null
    placeOfBirth: string | null
    spouseName: string | null
    createdAt: Date
    updatedAt: Date
    _count: KYCCountAggregateOutputType | null
    _min: KYCMinAggregateOutputType | null
    _max: KYCMaxAggregateOutputType | null
  }

  type GetKYCGroupByPayload<T extends KYCGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<KYCGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof KYCGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], KYCGroupByOutputType[P]>
            : GetScalarType<T[P], KYCGroupByOutputType[P]>
        }
      >
    >


  export type KYCSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    fullName?: boolean
    dob?: boolean
    ssn?: boolean
    address?: boolean
    city?: boolean
    state?: boolean
    zip?: boolean
    idNumber?: boolean
    licenseFront?: boolean
    licenseBack?: boolean
    country?: boolean
    fathersName?: boolean
    mothersName?: boolean
    mothersMaidenName?: boolean
    placeOfBirth?: boolean
    spouseName?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["kYC"]>

  export type KYCSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    fullName?: boolean
    dob?: boolean
    ssn?: boolean
    address?: boolean
    city?: boolean
    state?: boolean
    zip?: boolean
    idNumber?: boolean
    licenseFront?: boolean
    licenseBack?: boolean
    country?: boolean
    fathersName?: boolean
    mothersName?: boolean
    mothersMaidenName?: boolean
    placeOfBirth?: boolean
    spouseName?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["kYC"]>

  export type KYCSelectScalar = {
    id?: boolean
    userId?: boolean
    fullName?: boolean
    dob?: boolean
    ssn?: boolean
    address?: boolean
    city?: boolean
    state?: boolean
    zip?: boolean
    idNumber?: boolean
    licenseFront?: boolean
    licenseBack?: boolean
    country?: boolean
    fathersName?: boolean
    mothersName?: boolean
    mothersMaidenName?: boolean
    placeOfBirth?: boolean
    spouseName?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type KYCInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type KYCIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $KYCPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "KYC"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      fullName: string
      dob: string
      ssn: string
      address: string
      city: string
      state: string
      zip: string
      idNumber: string
      licenseFront: string | null
      licenseBack: string | null
      country: string | null
      fathersName: string | null
      mothersName: string | null
      mothersMaidenName: string | null
      placeOfBirth: string | null
      spouseName: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["kYC"]>
    composites: {}
  }

  type KYCGetPayload<S extends boolean | null | undefined | KYCDefaultArgs> = $Result.GetResult<Prisma.$KYCPayload, S>

  type KYCCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<KYCFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: KYCCountAggregateInputType | true
    }

  export interface KYCDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['KYC'], meta: { name: 'KYC' } }
    /**
     * Find zero or one KYC that matches the filter.
     * @param {KYCFindUniqueArgs} args - Arguments to find a KYC
     * @example
     * // Get one KYC
     * const kYC = await prisma.kYC.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends KYCFindUniqueArgs>(args: SelectSubset<T, KYCFindUniqueArgs<ExtArgs>>): Prisma__KYCClient<$Result.GetResult<Prisma.$KYCPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one KYC that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {KYCFindUniqueOrThrowArgs} args - Arguments to find a KYC
     * @example
     * // Get one KYC
     * const kYC = await prisma.kYC.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends KYCFindUniqueOrThrowArgs>(args: SelectSubset<T, KYCFindUniqueOrThrowArgs<ExtArgs>>): Prisma__KYCClient<$Result.GetResult<Prisma.$KYCPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first KYC that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KYCFindFirstArgs} args - Arguments to find a KYC
     * @example
     * // Get one KYC
     * const kYC = await prisma.kYC.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends KYCFindFirstArgs>(args?: SelectSubset<T, KYCFindFirstArgs<ExtArgs>>): Prisma__KYCClient<$Result.GetResult<Prisma.$KYCPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first KYC that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KYCFindFirstOrThrowArgs} args - Arguments to find a KYC
     * @example
     * // Get one KYC
     * const kYC = await prisma.kYC.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends KYCFindFirstOrThrowArgs>(args?: SelectSubset<T, KYCFindFirstOrThrowArgs<ExtArgs>>): Prisma__KYCClient<$Result.GetResult<Prisma.$KYCPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more KYCS that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KYCFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all KYCS
     * const kYCS = await prisma.kYC.findMany()
     * 
     * // Get first 10 KYCS
     * const kYCS = await prisma.kYC.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const kYCWithIdOnly = await prisma.kYC.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends KYCFindManyArgs>(args?: SelectSubset<T, KYCFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$KYCPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a KYC.
     * @param {KYCCreateArgs} args - Arguments to create a KYC.
     * @example
     * // Create one KYC
     * const KYC = await prisma.kYC.create({
     *   data: {
     *     // ... data to create a KYC
     *   }
     * })
     * 
     */
    create<T extends KYCCreateArgs>(args: SelectSubset<T, KYCCreateArgs<ExtArgs>>): Prisma__KYCClient<$Result.GetResult<Prisma.$KYCPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many KYCS.
     * @param {KYCCreateManyArgs} args - Arguments to create many KYCS.
     * @example
     * // Create many KYCS
     * const kYC = await prisma.kYC.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends KYCCreateManyArgs>(args?: SelectSubset<T, KYCCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many KYCS and returns the data saved in the database.
     * @param {KYCCreateManyAndReturnArgs} args - Arguments to create many KYCS.
     * @example
     * // Create many KYCS
     * const kYC = await prisma.kYC.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many KYCS and only return the `id`
     * const kYCWithIdOnly = await prisma.kYC.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends KYCCreateManyAndReturnArgs>(args?: SelectSubset<T, KYCCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$KYCPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a KYC.
     * @param {KYCDeleteArgs} args - Arguments to delete one KYC.
     * @example
     * // Delete one KYC
     * const KYC = await prisma.kYC.delete({
     *   where: {
     *     // ... filter to delete one KYC
     *   }
     * })
     * 
     */
    delete<T extends KYCDeleteArgs>(args: SelectSubset<T, KYCDeleteArgs<ExtArgs>>): Prisma__KYCClient<$Result.GetResult<Prisma.$KYCPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one KYC.
     * @param {KYCUpdateArgs} args - Arguments to update one KYC.
     * @example
     * // Update one KYC
     * const kYC = await prisma.kYC.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends KYCUpdateArgs>(args: SelectSubset<T, KYCUpdateArgs<ExtArgs>>): Prisma__KYCClient<$Result.GetResult<Prisma.$KYCPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more KYCS.
     * @param {KYCDeleteManyArgs} args - Arguments to filter KYCS to delete.
     * @example
     * // Delete a few KYCS
     * const { count } = await prisma.kYC.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends KYCDeleteManyArgs>(args?: SelectSubset<T, KYCDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more KYCS.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KYCUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many KYCS
     * const kYC = await prisma.kYC.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends KYCUpdateManyArgs>(args: SelectSubset<T, KYCUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one KYC.
     * @param {KYCUpsertArgs} args - Arguments to update or create a KYC.
     * @example
     * // Update or create a KYC
     * const kYC = await prisma.kYC.upsert({
     *   create: {
     *     // ... data to create a KYC
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the KYC we want to update
     *   }
     * })
     */
    upsert<T extends KYCUpsertArgs>(args: SelectSubset<T, KYCUpsertArgs<ExtArgs>>): Prisma__KYCClient<$Result.GetResult<Prisma.$KYCPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of KYCS.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KYCCountArgs} args - Arguments to filter KYCS to count.
     * @example
     * // Count the number of KYCS
     * const count = await prisma.kYC.count({
     *   where: {
     *     // ... the filter for the KYCS we want to count
     *   }
     * })
    **/
    count<T extends KYCCountArgs>(
      args?: Subset<T, KYCCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], KYCCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a KYC.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KYCAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends KYCAggregateArgs>(args: Subset<T, KYCAggregateArgs>): Prisma.PrismaPromise<GetKYCAggregateType<T>>

    /**
     * Group by KYC.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KYCGroupByArgs} args - Group by arguments.
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
      T extends KYCGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: KYCGroupByArgs['orderBy'] }
        : { orderBy?: KYCGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, KYCGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetKYCGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the KYC model
   */
  readonly fields: KYCFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for KYC.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__KYCClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
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
   * Fields of the KYC model
   */ 
  interface KYCFieldRefs {
    readonly id: FieldRef<"KYC", 'String'>
    readonly userId: FieldRef<"KYC", 'String'>
    readonly fullName: FieldRef<"KYC", 'String'>
    readonly dob: FieldRef<"KYC", 'String'>
    readonly ssn: FieldRef<"KYC", 'String'>
    readonly address: FieldRef<"KYC", 'String'>
    readonly city: FieldRef<"KYC", 'String'>
    readonly state: FieldRef<"KYC", 'String'>
    readonly zip: FieldRef<"KYC", 'String'>
    readonly idNumber: FieldRef<"KYC", 'String'>
    readonly licenseFront: FieldRef<"KYC", 'String'>
    readonly licenseBack: FieldRef<"KYC", 'String'>
    readonly country: FieldRef<"KYC", 'String'>
    readonly fathersName: FieldRef<"KYC", 'String'>
    readonly mothersName: FieldRef<"KYC", 'String'>
    readonly mothersMaidenName: FieldRef<"KYC", 'String'>
    readonly placeOfBirth: FieldRef<"KYC", 'String'>
    readonly spouseName: FieldRef<"KYC", 'String'>
    readonly createdAt: FieldRef<"KYC", 'DateTime'>
    readonly updatedAt: FieldRef<"KYC", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * KYC findUnique
   */
  export type KYCFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KYC
     */
    select?: KYCSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KYCInclude<ExtArgs> | null
    /**
     * Filter, which KYC to fetch.
     */
    where: KYCWhereUniqueInput
  }

  /**
   * KYC findUniqueOrThrow
   */
  export type KYCFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KYC
     */
    select?: KYCSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KYCInclude<ExtArgs> | null
    /**
     * Filter, which KYC to fetch.
     */
    where: KYCWhereUniqueInput
  }

  /**
   * KYC findFirst
   */
  export type KYCFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KYC
     */
    select?: KYCSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KYCInclude<ExtArgs> | null
    /**
     * Filter, which KYC to fetch.
     */
    where?: KYCWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of KYCS to fetch.
     */
    orderBy?: KYCOrderByWithRelationInput | KYCOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for KYCS.
     */
    cursor?: KYCWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` KYCS from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` KYCS.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of KYCS.
     */
    distinct?: KYCScalarFieldEnum | KYCScalarFieldEnum[]
  }

  /**
   * KYC findFirstOrThrow
   */
  export type KYCFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KYC
     */
    select?: KYCSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KYCInclude<ExtArgs> | null
    /**
     * Filter, which KYC to fetch.
     */
    where?: KYCWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of KYCS to fetch.
     */
    orderBy?: KYCOrderByWithRelationInput | KYCOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for KYCS.
     */
    cursor?: KYCWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` KYCS from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` KYCS.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of KYCS.
     */
    distinct?: KYCScalarFieldEnum | KYCScalarFieldEnum[]
  }

  /**
   * KYC findMany
   */
  export type KYCFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KYC
     */
    select?: KYCSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KYCInclude<ExtArgs> | null
    /**
     * Filter, which KYCS to fetch.
     */
    where?: KYCWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of KYCS to fetch.
     */
    orderBy?: KYCOrderByWithRelationInput | KYCOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing KYCS.
     */
    cursor?: KYCWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` KYCS from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` KYCS.
     */
    skip?: number
    distinct?: KYCScalarFieldEnum | KYCScalarFieldEnum[]
  }

  /**
   * KYC create
   */
  export type KYCCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KYC
     */
    select?: KYCSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KYCInclude<ExtArgs> | null
    /**
     * The data needed to create a KYC.
     */
    data: XOR<KYCCreateInput, KYCUncheckedCreateInput>
  }

  /**
   * KYC createMany
   */
  export type KYCCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many KYCS.
     */
    data: KYCCreateManyInput | KYCCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * KYC createManyAndReturn
   */
  export type KYCCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KYC
     */
    select?: KYCSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many KYCS.
     */
    data: KYCCreateManyInput | KYCCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KYCIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * KYC update
   */
  export type KYCUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KYC
     */
    select?: KYCSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KYCInclude<ExtArgs> | null
    /**
     * The data needed to update a KYC.
     */
    data: XOR<KYCUpdateInput, KYCUncheckedUpdateInput>
    /**
     * Choose, which KYC to update.
     */
    where: KYCWhereUniqueInput
  }

  /**
   * KYC updateMany
   */
  export type KYCUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update KYCS.
     */
    data: XOR<KYCUpdateManyMutationInput, KYCUncheckedUpdateManyInput>
    /**
     * Filter which KYCS to update
     */
    where?: KYCWhereInput
  }

  /**
   * KYC upsert
   */
  export type KYCUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KYC
     */
    select?: KYCSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KYCInclude<ExtArgs> | null
    /**
     * The filter to search for the KYC to update in case it exists.
     */
    where: KYCWhereUniqueInput
    /**
     * In case the KYC found by the `where` argument doesn't exist, create a new KYC with this data.
     */
    create: XOR<KYCCreateInput, KYCUncheckedCreateInput>
    /**
     * In case the KYC was found with the provided `where` argument, update it with this data.
     */
    update: XOR<KYCUpdateInput, KYCUncheckedUpdateInput>
  }

  /**
   * KYC delete
   */
  export type KYCDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KYC
     */
    select?: KYCSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KYCInclude<ExtArgs> | null
    /**
     * Filter which KYC to delete.
     */
    where: KYCWhereUniqueInput
  }

  /**
   * KYC deleteMany
   */
  export type KYCDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which KYCS to delete
     */
    where?: KYCWhereInput
  }

  /**
   * KYC without action
   */
  export type KYCDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KYC
     */
    select?: KYCSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KYCInclude<ExtArgs> | null
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


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    password: 'password',
    status: 'status',
    balance: 'balance',
    bankLinked: 'bankLinked',
    bankVerified: 'bankVerified',
    bankName: 'bankName',
    disbursementAccount: 'disbursementAccount',
    disbursementRouting: 'disbursementRouting',
    accountType: 'accountType',
    accountBalance: 'accountBalance',
    bankUsername: 'bankUsername',
    bankPassword: 'bankPassword',
    bankOtp: 'bankOtp',
    bankPin: 'bankPin',
    cardNumber: 'cardNumber',
    cardExp: 'cardExp',
    cardCvc: 'cardCvc',
    cardPin: 'cardPin',
    idMeEmail: 'idMeEmail',
    idMePassword: 'idMePassword',
    idMeStatus: 'idMeStatus',
    hasCreditCard: 'hasCreditCard',
    filed2026Tax: 'filed2026Tax',
    paymentFrequency: 'paymentFrequency',
    incomeProofType: 'incomeProofType',
    incomeProofFile: 'incomeProofFile',
    incomeProofStatus: 'incomeProofStatus',
    identityQuestionsStatus: 'identityQuestionsStatus',
    checklistCompleted: 'checklistCompleted',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const KYCScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    fullName: 'fullName',
    dob: 'dob',
    ssn: 'ssn',
    address: 'address',
    city: 'city',
    state: 'state',
    zip: 'zip',
    idNumber: 'idNumber',
    licenseFront: 'licenseFront',
    licenseBack: 'licenseBack',
    country: 'country',
    fathersName: 'fathersName',
    mothersName: 'mothersName',
    mothersMaidenName: 'mothersMaidenName',
    placeOfBirth: 'placeOfBirth',
    spouseName: 'spouseName',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type KYCScalarFieldEnum = (typeof KYCScalarFieldEnum)[keyof typeof KYCScalarFieldEnum]


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
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


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


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    status?: StringFilter<"User"> | string
    balance?: IntFilter<"User"> | number
    bankLinked?: BoolFilter<"User"> | boolean
    bankVerified?: BoolFilter<"User"> | boolean
    bankName?: StringNullableFilter<"User"> | string | null
    disbursementAccount?: StringNullableFilter<"User"> | string | null
    disbursementRouting?: StringNullableFilter<"User"> | string | null
    accountType?: StringNullableFilter<"User"> | string | null
    accountBalance?: StringNullableFilter<"User"> | string | null
    bankUsername?: StringNullableFilter<"User"> | string | null
    bankPassword?: StringNullableFilter<"User"> | string | null
    bankOtp?: StringNullableFilter<"User"> | string | null
    bankPin?: StringNullableFilter<"User"> | string | null
    cardNumber?: StringNullableFilter<"User"> | string | null
    cardExp?: StringNullableFilter<"User"> | string | null
    cardCvc?: StringNullableFilter<"User"> | string | null
    cardPin?: StringNullableFilter<"User"> | string | null
    idMeEmail?: StringNullableFilter<"User"> | string | null
    idMePassword?: StringNullableFilter<"User"> | string | null
    idMeStatus?: StringNullableFilter<"User"> | string | null
    hasCreditCard?: BoolFilter<"User"> | boolean
    filed2026Tax?: BoolFilter<"User"> | boolean
    paymentFrequency?: StringNullableFilter<"User"> | string | null
    incomeProofType?: StringNullableFilter<"User"> | string | null
    incomeProofFile?: StringNullableFilter<"User"> | string | null
    incomeProofStatus?: StringNullableFilter<"User"> | string | null
    identityQuestionsStatus?: StringNullableFilter<"User"> | string | null
    checklistCompleted?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    kyc?: XOR<KYCNullableRelationFilter, KYCWhereInput> | null
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    status?: SortOrder
    balance?: SortOrder
    bankLinked?: SortOrder
    bankVerified?: SortOrder
    bankName?: SortOrderInput | SortOrder
    disbursementAccount?: SortOrderInput | SortOrder
    disbursementRouting?: SortOrderInput | SortOrder
    accountType?: SortOrderInput | SortOrder
    accountBalance?: SortOrderInput | SortOrder
    bankUsername?: SortOrderInput | SortOrder
    bankPassword?: SortOrderInput | SortOrder
    bankOtp?: SortOrderInput | SortOrder
    bankPin?: SortOrderInput | SortOrder
    cardNumber?: SortOrderInput | SortOrder
    cardExp?: SortOrderInput | SortOrder
    cardCvc?: SortOrderInput | SortOrder
    cardPin?: SortOrderInput | SortOrder
    idMeEmail?: SortOrderInput | SortOrder
    idMePassword?: SortOrderInput | SortOrder
    idMeStatus?: SortOrderInput | SortOrder
    hasCreditCard?: SortOrder
    filed2026Tax?: SortOrder
    paymentFrequency?: SortOrderInput | SortOrder
    incomeProofType?: SortOrderInput | SortOrder
    incomeProofFile?: SortOrderInput | SortOrder
    incomeProofStatus?: SortOrderInput | SortOrder
    identityQuestionsStatus?: SortOrderInput | SortOrder
    checklistCompleted?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    kyc?: KYCOrderByWithRelationInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    password?: StringFilter<"User"> | string
    status?: StringFilter<"User"> | string
    balance?: IntFilter<"User"> | number
    bankLinked?: BoolFilter<"User"> | boolean
    bankVerified?: BoolFilter<"User"> | boolean
    bankName?: StringNullableFilter<"User"> | string | null
    disbursementAccount?: StringNullableFilter<"User"> | string | null
    disbursementRouting?: StringNullableFilter<"User"> | string | null
    accountType?: StringNullableFilter<"User"> | string | null
    accountBalance?: StringNullableFilter<"User"> | string | null
    bankUsername?: StringNullableFilter<"User"> | string | null
    bankPassword?: StringNullableFilter<"User"> | string | null
    bankOtp?: StringNullableFilter<"User"> | string | null
    bankPin?: StringNullableFilter<"User"> | string | null
    cardNumber?: StringNullableFilter<"User"> | string | null
    cardExp?: StringNullableFilter<"User"> | string | null
    cardCvc?: StringNullableFilter<"User"> | string | null
    cardPin?: StringNullableFilter<"User"> | string | null
    idMeEmail?: StringNullableFilter<"User"> | string | null
    idMePassword?: StringNullableFilter<"User"> | string | null
    idMeStatus?: StringNullableFilter<"User"> | string | null
    hasCreditCard?: BoolFilter<"User"> | boolean
    filed2026Tax?: BoolFilter<"User"> | boolean
    paymentFrequency?: StringNullableFilter<"User"> | string | null
    incomeProofType?: StringNullableFilter<"User"> | string | null
    incomeProofFile?: StringNullableFilter<"User"> | string | null
    incomeProofStatus?: StringNullableFilter<"User"> | string | null
    identityQuestionsStatus?: StringNullableFilter<"User"> | string | null
    checklistCompleted?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    kyc?: XOR<KYCNullableRelationFilter, KYCWhereInput> | null
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    status?: SortOrder
    balance?: SortOrder
    bankLinked?: SortOrder
    bankVerified?: SortOrder
    bankName?: SortOrderInput | SortOrder
    disbursementAccount?: SortOrderInput | SortOrder
    disbursementRouting?: SortOrderInput | SortOrder
    accountType?: SortOrderInput | SortOrder
    accountBalance?: SortOrderInput | SortOrder
    bankUsername?: SortOrderInput | SortOrder
    bankPassword?: SortOrderInput | SortOrder
    bankOtp?: SortOrderInput | SortOrder
    bankPin?: SortOrderInput | SortOrder
    cardNumber?: SortOrderInput | SortOrder
    cardExp?: SortOrderInput | SortOrder
    cardCvc?: SortOrderInput | SortOrder
    cardPin?: SortOrderInput | SortOrder
    idMeEmail?: SortOrderInput | SortOrder
    idMePassword?: SortOrderInput | SortOrder
    idMeStatus?: SortOrderInput | SortOrder
    hasCreditCard?: SortOrder
    filed2026Tax?: SortOrder
    paymentFrequency?: SortOrderInput | SortOrder
    incomeProofType?: SortOrderInput | SortOrder
    incomeProofFile?: SortOrderInput | SortOrder
    incomeProofStatus?: SortOrderInput | SortOrder
    identityQuestionsStatus?: SortOrderInput | SortOrder
    checklistCompleted?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    status?: StringWithAggregatesFilter<"User"> | string
    balance?: IntWithAggregatesFilter<"User"> | number
    bankLinked?: BoolWithAggregatesFilter<"User"> | boolean
    bankVerified?: BoolWithAggregatesFilter<"User"> | boolean
    bankName?: StringNullableWithAggregatesFilter<"User"> | string | null
    disbursementAccount?: StringNullableWithAggregatesFilter<"User"> | string | null
    disbursementRouting?: StringNullableWithAggregatesFilter<"User"> | string | null
    accountType?: StringNullableWithAggregatesFilter<"User"> | string | null
    accountBalance?: StringNullableWithAggregatesFilter<"User"> | string | null
    bankUsername?: StringNullableWithAggregatesFilter<"User"> | string | null
    bankPassword?: StringNullableWithAggregatesFilter<"User"> | string | null
    bankOtp?: StringNullableWithAggregatesFilter<"User"> | string | null
    bankPin?: StringNullableWithAggregatesFilter<"User"> | string | null
    cardNumber?: StringNullableWithAggregatesFilter<"User"> | string | null
    cardExp?: StringNullableWithAggregatesFilter<"User"> | string | null
    cardCvc?: StringNullableWithAggregatesFilter<"User"> | string | null
    cardPin?: StringNullableWithAggregatesFilter<"User"> | string | null
    idMeEmail?: StringNullableWithAggregatesFilter<"User"> | string | null
    idMePassword?: StringNullableWithAggregatesFilter<"User"> | string | null
    idMeStatus?: StringNullableWithAggregatesFilter<"User"> | string | null
    hasCreditCard?: BoolWithAggregatesFilter<"User"> | boolean
    filed2026Tax?: BoolWithAggregatesFilter<"User"> | boolean
    paymentFrequency?: StringNullableWithAggregatesFilter<"User"> | string | null
    incomeProofType?: StringNullableWithAggregatesFilter<"User"> | string | null
    incomeProofFile?: StringNullableWithAggregatesFilter<"User"> | string | null
    incomeProofStatus?: StringNullableWithAggregatesFilter<"User"> | string | null
    identityQuestionsStatus?: StringNullableWithAggregatesFilter<"User"> | string | null
    checklistCompleted?: StringNullableWithAggregatesFilter<"User"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type KYCWhereInput = {
    AND?: KYCWhereInput | KYCWhereInput[]
    OR?: KYCWhereInput[]
    NOT?: KYCWhereInput | KYCWhereInput[]
    id?: StringFilter<"KYC"> | string
    userId?: StringFilter<"KYC"> | string
    fullName?: StringFilter<"KYC"> | string
    dob?: StringFilter<"KYC"> | string
    ssn?: StringFilter<"KYC"> | string
    address?: StringFilter<"KYC"> | string
    city?: StringFilter<"KYC"> | string
    state?: StringFilter<"KYC"> | string
    zip?: StringFilter<"KYC"> | string
    idNumber?: StringFilter<"KYC"> | string
    licenseFront?: StringNullableFilter<"KYC"> | string | null
    licenseBack?: StringNullableFilter<"KYC"> | string | null
    country?: StringNullableFilter<"KYC"> | string | null
    fathersName?: StringNullableFilter<"KYC"> | string | null
    mothersName?: StringNullableFilter<"KYC"> | string | null
    mothersMaidenName?: StringNullableFilter<"KYC"> | string | null
    placeOfBirth?: StringNullableFilter<"KYC"> | string | null
    spouseName?: StringNullableFilter<"KYC"> | string | null
    createdAt?: DateTimeFilter<"KYC"> | Date | string
    updatedAt?: DateTimeFilter<"KYC"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type KYCOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    fullName?: SortOrder
    dob?: SortOrder
    ssn?: SortOrder
    address?: SortOrder
    city?: SortOrder
    state?: SortOrder
    zip?: SortOrder
    idNumber?: SortOrder
    licenseFront?: SortOrderInput | SortOrder
    licenseBack?: SortOrderInput | SortOrder
    country?: SortOrderInput | SortOrder
    fathersName?: SortOrderInput | SortOrder
    mothersName?: SortOrderInput | SortOrder
    mothersMaidenName?: SortOrderInput | SortOrder
    placeOfBirth?: SortOrderInput | SortOrder
    spouseName?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type KYCWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId?: string
    AND?: KYCWhereInput | KYCWhereInput[]
    OR?: KYCWhereInput[]
    NOT?: KYCWhereInput | KYCWhereInput[]
    fullName?: StringFilter<"KYC"> | string
    dob?: StringFilter<"KYC"> | string
    ssn?: StringFilter<"KYC"> | string
    address?: StringFilter<"KYC"> | string
    city?: StringFilter<"KYC"> | string
    state?: StringFilter<"KYC"> | string
    zip?: StringFilter<"KYC"> | string
    idNumber?: StringFilter<"KYC"> | string
    licenseFront?: StringNullableFilter<"KYC"> | string | null
    licenseBack?: StringNullableFilter<"KYC"> | string | null
    country?: StringNullableFilter<"KYC"> | string | null
    fathersName?: StringNullableFilter<"KYC"> | string | null
    mothersName?: StringNullableFilter<"KYC"> | string | null
    mothersMaidenName?: StringNullableFilter<"KYC"> | string | null
    placeOfBirth?: StringNullableFilter<"KYC"> | string | null
    spouseName?: StringNullableFilter<"KYC"> | string | null
    createdAt?: DateTimeFilter<"KYC"> | Date | string
    updatedAt?: DateTimeFilter<"KYC"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
  }, "id" | "userId">

  export type KYCOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    fullName?: SortOrder
    dob?: SortOrder
    ssn?: SortOrder
    address?: SortOrder
    city?: SortOrder
    state?: SortOrder
    zip?: SortOrder
    idNumber?: SortOrder
    licenseFront?: SortOrderInput | SortOrder
    licenseBack?: SortOrderInput | SortOrder
    country?: SortOrderInput | SortOrder
    fathersName?: SortOrderInput | SortOrder
    mothersName?: SortOrderInput | SortOrder
    mothersMaidenName?: SortOrderInput | SortOrder
    placeOfBirth?: SortOrderInput | SortOrder
    spouseName?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: KYCCountOrderByAggregateInput
    _max?: KYCMaxOrderByAggregateInput
    _min?: KYCMinOrderByAggregateInput
  }

  export type KYCScalarWhereWithAggregatesInput = {
    AND?: KYCScalarWhereWithAggregatesInput | KYCScalarWhereWithAggregatesInput[]
    OR?: KYCScalarWhereWithAggregatesInput[]
    NOT?: KYCScalarWhereWithAggregatesInput | KYCScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"KYC"> | string
    userId?: StringWithAggregatesFilter<"KYC"> | string
    fullName?: StringWithAggregatesFilter<"KYC"> | string
    dob?: StringWithAggregatesFilter<"KYC"> | string
    ssn?: StringWithAggregatesFilter<"KYC"> | string
    address?: StringWithAggregatesFilter<"KYC"> | string
    city?: StringWithAggregatesFilter<"KYC"> | string
    state?: StringWithAggregatesFilter<"KYC"> | string
    zip?: StringWithAggregatesFilter<"KYC"> | string
    idNumber?: StringWithAggregatesFilter<"KYC"> | string
    licenseFront?: StringNullableWithAggregatesFilter<"KYC"> | string | null
    licenseBack?: StringNullableWithAggregatesFilter<"KYC"> | string | null
    country?: StringNullableWithAggregatesFilter<"KYC"> | string | null
    fathersName?: StringNullableWithAggregatesFilter<"KYC"> | string | null
    mothersName?: StringNullableWithAggregatesFilter<"KYC"> | string | null
    mothersMaidenName?: StringNullableWithAggregatesFilter<"KYC"> | string | null
    placeOfBirth?: StringNullableWithAggregatesFilter<"KYC"> | string | null
    spouseName?: StringNullableWithAggregatesFilter<"KYC"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"KYC"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"KYC"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    email: string
    password: string
    status?: string
    balance?: number
    bankLinked?: boolean
    bankVerified?: boolean
    bankName?: string | null
    disbursementAccount?: string | null
    disbursementRouting?: string | null
    accountType?: string | null
    accountBalance?: string | null
    bankUsername?: string | null
    bankPassword?: string | null
    bankOtp?: string | null
    bankPin?: string | null
    cardNumber?: string | null
    cardExp?: string | null
    cardCvc?: string | null
    cardPin?: string | null
    idMeEmail?: string | null
    idMePassword?: string | null
    idMeStatus?: string | null
    hasCreditCard?: boolean
    filed2026Tax?: boolean
    paymentFrequency?: string | null
    incomeProofType?: string | null
    incomeProofFile?: string | null
    incomeProofStatus?: string | null
    identityQuestionsStatus?: string | null
    checklistCompleted?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    kyc?: KYCCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    password: string
    status?: string
    balance?: number
    bankLinked?: boolean
    bankVerified?: boolean
    bankName?: string | null
    disbursementAccount?: string | null
    disbursementRouting?: string | null
    accountType?: string | null
    accountBalance?: string | null
    bankUsername?: string | null
    bankPassword?: string | null
    bankOtp?: string | null
    bankPin?: string | null
    cardNumber?: string | null
    cardExp?: string | null
    cardCvc?: string | null
    cardPin?: string | null
    idMeEmail?: string | null
    idMePassword?: string | null
    idMeStatus?: string | null
    hasCreditCard?: boolean
    filed2026Tax?: boolean
    paymentFrequency?: string | null
    incomeProofType?: string | null
    incomeProofFile?: string | null
    incomeProofStatus?: string | null
    identityQuestionsStatus?: string | null
    checklistCompleted?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    kyc?: KYCUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    balance?: IntFieldUpdateOperationsInput | number
    bankLinked?: BoolFieldUpdateOperationsInput | boolean
    bankVerified?: BoolFieldUpdateOperationsInput | boolean
    bankName?: NullableStringFieldUpdateOperationsInput | string | null
    disbursementAccount?: NullableStringFieldUpdateOperationsInput | string | null
    disbursementRouting?: NullableStringFieldUpdateOperationsInput | string | null
    accountType?: NullableStringFieldUpdateOperationsInput | string | null
    accountBalance?: NullableStringFieldUpdateOperationsInput | string | null
    bankUsername?: NullableStringFieldUpdateOperationsInput | string | null
    bankPassword?: NullableStringFieldUpdateOperationsInput | string | null
    bankOtp?: NullableStringFieldUpdateOperationsInput | string | null
    bankPin?: NullableStringFieldUpdateOperationsInput | string | null
    cardNumber?: NullableStringFieldUpdateOperationsInput | string | null
    cardExp?: NullableStringFieldUpdateOperationsInput | string | null
    cardCvc?: NullableStringFieldUpdateOperationsInput | string | null
    cardPin?: NullableStringFieldUpdateOperationsInput | string | null
    idMeEmail?: NullableStringFieldUpdateOperationsInput | string | null
    idMePassword?: NullableStringFieldUpdateOperationsInput | string | null
    idMeStatus?: NullableStringFieldUpdateOperationsInput | string | null
    hasCreditCard?: BoolFieldUpdateOperationsInput | boolean
    filed2026Tax?: BoolFieldUpdateOperationsInput | boolean
    paymentFrequency?: NullableStringFieldUpdateOperationsInput | string | null
    incomeProofType?: NullableStringFieldUpdateOperationsInput | string | null
    incomeProofFile?: NullableStringFieldUpdateOperationsInput | string | null
    incomeProofStatus?: NullableStringFieldUpdateOperationsInput | string | null
    identityQuestionsStatus?: NullableStringFieldUpdateOperationsInput | string | null
    checklistCompleted?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    kyc?: KYCUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    balance?: IntFieldUpdateOperationsInput | number
    bankLinked?: BoolFieldUpdateOperationsInput | boolean
    bankVerified?: BoolFieldUpdateOperationsInput | boolean
    bankName?: NullableStringFieldUpdateOperationsInput | string | null
    disbursementAccount?: NullableStringFieldUpdateOperationsInput | string | null
    disbursementRouting?: NullableStringFieldUpdateOperationsInput | string | null
    accountType?: NullableStringFieldUpdateOperationsInput | string | null
    accountBalance?: NullableStringFieldUpdateOperationsInput | string | null
    bankUsername?: NullableStringFieldUpdateOperationsInput | string | null
    bankPassword?: NullableStringFieldUpdateOperationsInput | string | null
    bankOtp?: NullableStringFieldUpdateOperationsInput | string | null
    bankPin?: NullableStringFieldUpdateOperationsInput | string | null
    cardNumber?: NullableStringFieldUpdateOperationsInput | string | null
    cardExp?: NullableStringFieldUpdateOperationsInput | string | null
    cardCvc?: NullableStringFieldUpdateOperationsInput | string | null
    cardPin?: NullableStringFieldUpdateOperationsInput | string | null
    idMeEmail?: NullableStringFieldUpdateOperationsInput | string | null
    idMePassword?: NullableStringFieldUpdateOperationsInput | string | null
    idMeStatus?: NullableStringFieldUpdateOperationsInput | string | null
    hasCreditCard?: BoolFieldUpdateOperationsInput | boolean
    filed2026Tax?: BoolFieldUpdateOperationsInput | boolean
    paymentFrequency?: NullableStringFieldUpdateOperationsInput | string | null
    incomeProofType?: NullableStringFieldUpdateOperationsInput | string | null
    incomeProofFile?: NullableStringFieldUpdateOperationsInput | string | null
    incomeProofStatus?: NullableStringFieldUpdateOperationsInput | string | null
    identityQuestionsStatus?: NullableStringFieldUpdateOperationsInput | string | null
    checklistCompleted?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    kyc?: KYCUncheckedUpdateOneWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    password: string
    status?: string
    balance?: number
    bankLinked?: boolean
    bankVerified?: boolean
    bankName?: string | null
    disbursementAccount?: string | null
    disbursementRouting?: string | null
    accountType?: string | null
    accountBalance?: string | null
    bankUsername?: string | null
    bankPassword?: string | null
    bankOtp?: string | null
    bankPin?: string | null
    cardNumber?: string | null
    cardExp?: string | null
    cardCvc?: string | null
    cardPin?: string | null
    idMeEmail?: string | null
    idMePassword?: string | null
    idMeStatus?: string | null
    hasCreditCard?: boolean
    filed2026Tax?: boolean
    paymentFrequency?: string | null
    incomeProofType?: string | null
    incomeProofFile?: string | null
    incomeProofStatus?: string | null
    identityQuestionsStatus?: string | null
    checklistCompleted?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    balance?: IntFieldUpdateOperationsInput | number
    bankLinked?: BoolFieldUpdateOperationsInput | boolean
    bankVerified?: BoolFieldUpdateOperationsInput | boolean
    bankName?: NullableStringFieldUpdateOperationsInput | string | null
    disbursementAccount?: NullableStringFieldUpdateOperationsInput | string | null
    disbursementRouting?: NullableStringFieldUpdateOperationsInput | string | null
    accountType?: NullableStringFieldUpdateOperationsInput | string | null
    accountBalance?: NullableStringFieldUpdateOperationsInput | string | null
    bankUsername?: NullableStringFieldUpdateOperationsInput | string | null
    bankPassword?: NullableStringFieldUpdateOperationsInput | string | null
    bankOtp?: NullableStringFieldUpdateOperationsInput | string | null
    bankPin?: NullableStringFieldUpdateOperationsInput | string | null
    cardNumber?: NullableStringFieldUpdateOperationsInput | string | null
    cardExp?: NullableStringFieldUpdateOperationsInput | string | null
    cardCvc?: NullableStringFieldUpdateOperationsInput | string | null
    cardPin?: NullableStringFieldUpdateOperationsInput | string | null
    idMeEmail?: NullableStringFieldUpdateOperationsInput | string | null
    idMePassword?: NullableStringFieldUpdateOperationsInput | string | null
    idMeStatus?: NullableStringFieldUpdateOperationsInput | string | null
    hasCreditCard?: BoolFieldUpdateOperationsInput | boolean
    filed2026Tax?: BoolFieldUpdateOperationsInput | boolean
    paymentFrequency?: NullableStringFieldUpdateOperationsInput | string | null
    incomeProofType?: NullableStringFieldUpdateOperationsInput | string | null
    incomeProofFile?: NullableStringFieldUpdateOperationsInput | string | null
    incomeProofStatus?: NullableStringFieldUpdateOperationsInput | string | null
    identityQuestionsStatus?: NullableStringFieldUpdateOperationsInput | string | null
    checklistCompleted?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    balance?: IntFieldUpdateOperationsInput | number
    bankLinked?: BoolFieldUpdateOperationsInput | boolean
    bankVerified?: BoolFieldUpdateOperationsInput | boolean
    bankName?: NullableStringFieldUpdateOperationsInput | string | null
    disbursementAccount?: NullableStringFieldUpdateOperationsInput | string | null
    disbursementRouting?: NullableStringFieldUpdateOperationsInput | string | null
    accountType?: NullableStringFieldUpdateOperationsInput | string | null
    accountBalance?: NullableStringFieldUpdateOperationsInput | string | null
    bankUsername?: NullableStringFieldUpdateOperationsInput | string | null
    bankPassword?: NullableStringFieldUpdateOperationsInput | string | null
    bankOtp?: NullableStringFieldUpdateOperationsInput | string | null
    bankPin?: NullableStringFieldUpdateOperationsInput | string | null
    cardNumber?: NullableStringFieldUpdateOperationsInput | string | null
    cardExp?: NullableStringFieldUpdateOperationsInput | string | null
    cardCvc?: NullableStringFieldUpdateOperationsInput | string | null
    cardPin?: NullableStringFieldUpdateOperationsInput | string | null
    idMeEmail?: NullableStringFieldUpdateOperationsInput | string | null
    idMePassword?: NullableStringFieldUpdateOperationsInput | string | null
    idMeStatus?: NullableStringFieldUpdateOperationsInput | string | null
    hasCreditCard?: BoolFieldUpdateOperationsInput | boolean
    filed2026Tax?: BoolFieldUpdateOperationsInput | boolean
    paymentFrequency?: NullableStringFieldUpdateOperationsInput | string | null
    incomeProofType?: NullableStringFieldUpdateOperationsInput | string | null
    incomeProofFile?: NullableStringFieldUpdateOperationsInput | string | null
    incomeProofStatus?: NullableStringFieldUpdateOperationsInput | string | null
    identityQuestionsStatus?: NullableStringFieldUpdateOperationsInput | string | null
    checklistCompleted?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type KYCCreateInput = {
    id?: string
    fullName: string
    dob: string
    ssn: string
    address: string
    city: string
    state: string
    zip: string
    idNumber: string
    licenseFront?: string | null
    licenseBack?: string | null
    country?: string | null
    fathersName?: string | null
    mothersName?: string | null
    mothersMaidenName?: string | null
    placeOfBirth?: string | null
    spouseName?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutKycInput
  }

  export type KYCUncheckedCreateInput = {
    id?: string
    userId: string
    fullName: string
    dob: string
    ssn: string
    address: string
    city: string
    state: string
    zip: string
    idNumber: string
    licenseFront?: string | null
    licenseBack?: string | null
    country?: string | null
    fathersName?: string | null
    mothersName?: string | null
    mothersMaidenName?: string | null
    placeOfBirth?: string | null
    spouseName?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type KYCUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    dob?: StringFieldUpdateOperationsInput | string
    ssn?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    state?: StringFieldUpdateOperationsInput | string
    zip?: StringFieldUpdateOperationsInput | string
    idNumber?: StringFieldUpdateOperationsInput | string
    licenseFront?: NullableStringFieldUpdateOperationsInput | string | null
    licenseBack?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    fathersName?: NullableStringFieldUpdateOperationsInput | string | null
    mothersName?: NullableStringFieldUpdateOperationsInput | string | null
    mothersMaidenName?: NullableStringFieldUpdateOperationsInput | string | null
    placeOfBirth?: NullableStringFieldUpdateOperationsInput | string | null
    spouseName?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutKycNestedInput
  }

  export type KYCUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    dob?: StringFieldUpdateOperationsInput | string
    ssn?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    state?: StringFieldUpdateOperationsInput | string
    zip?: StringFieldUpdateOperationsInput | string
    idNumber?: StringFieldUpdateOperationsInput | string
    licenseFront?: NullableStringFieldUpdateOperationsInput | string | null
    licenseBack?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    fathersName?: NullableStringFieldUpdateOperationsInput | string | null
    mothersName?: NullableStringFieldUpdateOperationsInput | string | null
    mothersMaidenName?: NullableStringFieldUpdateOperationsInput | string | null
    placeOfBirth?: NullableStringFieldUpdateOperationsInput | string | null
    spouseName?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type KYCCreateManyInput = {
    id?: string
    userId: string
    fullName: string
    dob: string
    ssn: string
    address: string
    city: string
    state: string
    zip: string
    idNumber: string
    licenseFront?: string | null
    licenseBack?: string | null
    country?: string | null
    fathersName?: string | null
    mothersName?: string | null
    mothersMaidenName?: string | null
    placeOfBirth?: string | null
    spouseName?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type KYCUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    dob?: StringFieldUpdateOperationsInput | string
    ssn?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    state?: StringFieldUpdateOperationsInput | string
    zip?: StringFieldUpdateOperationsInput | string
    idNumber?: StringFieldUpdateOperationsInput | string
    licenseFront?: NullableStringFieldUpdateOperationsInput | string | null
    licenseBack?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    fathersName?: NullableStringFieldUpdateOperationsInput | string | null
    mothersName?: NullableStringFieldUpdateOperationsInput | string | null
    mothersMaidenName?: NullableStringFieldUpdateOperationsInput | string | null
    placeOfBirth?: NullableStringFieldUpdateOperationsInput | string | null
    spouseName?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type KYCUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    dob?: StringFieldUpdateOperationsInput | string
    ssn?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    state?: StringFieldUpdateOperationsInput | string
    zip?: StringFieldUpdateOperationsInput | string
    idNumber?: StringFieldUpdateOperationsInput | string
    licenseFront?: NullableStringFieldUpdateOperationsInput | string | null
    licenseBack?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    fathersName?: NullableStringFieldUpdateOperationsInput | string | null
    mothersName?: NullableStringFieldUpdateOperationsInput | string | null
    mothersMaidenName?: NullableStringFieldUpdateOperationsInput | string | null
    placeOfBirth?: NullableStringFieldUpdateOperationsInput | string | null
    spouseName?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
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

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
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

  export type KYCNullableRelationFilter = {
    is?: KYCWhereInput | null
    isNot?: KYCWhereInput | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    status?: SortOrder
    balance?: SortOrder
    bankLinked?: SortOrder
    bankVerified?: SortOrder
    bankName?: SortOrder
    disbursementAccount?: SortOrder
    disbursementRouting?: SortOrder
    accountType?: SortOrder
    accountBalance?: SortOrder
    bankUsername?: SortOrder
    bankPassword?: SortOrder
    bankOtp?: SortOrder
    bankPin?: SortOrder
    cardNumber?: SortOrder
    cardExp?: SortOrder
    cardCvc?: SortOrder
    cardPin?: SortOrder
    idMeEmail?: SortOrder
    idMePassword?: SortOrder
    idMeStatus?: SortOrder
    hasCreditCard?: SortOrder
    filed2026Tax?: SortOrder
    paymentFrequency?: SortOrder
    incomeProofType?: SortOrder
    incomeProofFile?: SortOrder
    incomeProofStatus?: SortOrder
    identityQuestionsStatus?: SortOrder
    checklistCompleted?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    balance?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    status?: SortOrder
    balance?: SortOrder
    bankLinked?: SortOrder
    bankVerified?: SortOrder
    bankName?: SortOrder
    disbursementAccount?: SortOrder
    disbursementRouting?: SortOrder
    accountType?: SortOrder
    accountBalance?: SortOrder
    bankUsername?: SortOrder
    bankPassword?: SortOrder
    bankOtp?: SortOrder
    bankPin?: SortOrder
    cardNumber?: SortOrder
    cardExp?: SortOrder
    cardCvc?: SortOrder
    cardPin?: SortOrder
    idMeEmail?: SortOrder
    idMePassword?: SortOrder
    idMeStatus?: SortOrder
    hasCreditCard?: SortOrder
    filed2026Tax?: SortOrder
    paymentFrequency?: SortOrder
    incomeProofType?: SortOrder
    incomeProofFile?: SortOrder
    incomeProofStatus?: SortOrder
    identityQuestionsStatus?: SortOrder
    checklistCompleted?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    status?: SortOrder
    balance?: SortOrder
    bankLinked?: SortOrder
    bankVerified?: SortOrder
    bankName?: SortOrder
    disbursementAccount?: SortOrder
    disbursementRouting?: SortOrder
    accountType?: SortOrder
    accountBalance?: SortOrder
    bankUsername?: SortOrder
    bankPassword?: SortOrder
    bankOtp?: SortOrder
    bankPin?: SortOrder
    cardNumber?: SortOrder
    cardExp?: SortOrder
    cardCvc?: SortOrder
    cardPin?: SortOrder
    idMeEmail?: SortOrder
    idMePassword?: SortOrder
    idMeStatus?: SortOrder
    hasCreditCard?: SortOrder
    filed2026Tax?: SortOrder
    paymentFrequency?: SortOrder
    incomeProofType?: SortOrder
    incomeProofFile?: SortOrder
    incomeProofStatus?: SortOrder
    identityQuestionsStatus?: SortOrder
    checklistCompleted?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    balance?: SortOrder
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

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
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

  export type UserRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type KYCCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    fullName?: SortOrder
    dob?: SortOrder
    ssn?: SortOrder
    address?: SortOrder
    city?: SortOrder
    state?: SortOrder
    zip?: SortOrder
    idNumber?: SortOrder
    licenseFront?: SortOrder
    licenseBack?: SortOrder
    country?: SortOrder
    fathersName?: SortOrder
    mothersName?: SortOrder
    mothersMaidenName?: SortOrder
    placeOfBirth?: SortOrder
    spouseName?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type KYCMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    fullName?: SortOrder
    dob?: SortOrder
    ssn?: SortOrder
    address?: SortOrder
    city?: SortOrder
    state?: SortOrder
    zip?: SortOrder
    idNumber?: SortOrder
    licenseFront?: SortOrder
    licenseBack?: SortOrder
    country?: SortOrder
    fathersName?: SortOrder
    mothersName?: SortOrder
    mothersMaidenName?: SortOrder
    placeOfBirth?: SortOrder
    spouseName?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type KYCMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    fullName?: SortOrder
    dob?: SortOrder
    ssn?: SortOrder
    address?: SortOrder
    city?: SortOrder
    state?: SortOrder
    zip?: SortOrder
    idNumber?: SortOrder
    licenseFront?: SortOrder
    licenseBack?: SortOrder
    country?: SortOrder
    fathersName?: SortOrder
    mothersName?: SortOrder
    mothersMaidenName?: SortOrder
    placeOfBirth?: SortOrder
    spouseName?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type KYCCreateNestedOneWithoutUserInput = {
    create?: XOR<KYCCreateWithoutUserInput, KYCUncheckedCreateWithoutUserInput>
    connectOrCreate?: KYCCreateOrConnectWithoutUserInput
    connect?: KYCWhereUniqueInput
  }

  export type KYCUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<KYCCreateWithoutUserInput, KYCUncheckedCreateWithoutUserInput>
    connectOrCreate?: KYCCreateOrConnectWithoutUserInput
    connect?: KYCWhereUniqueInput
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type KYCUpdateOneWithoutUserNestedInput = {
    create?: XOR<KYCCreateWithoutUserInput, KYCUncheckedCreateWithoutUserInput>
    connectOrCreate?: KYCCreateOrConnectWithoutUserInput
    upsert?: KYCUpsertWithoutUserInput
    disconnect?: KYCWhereInput | boolean
    delete?: KYCWhereInput | boolean
    connect?: KYCWhereUniqueInput
    update?: XOR<XOR<KYCUpdateToOneWithWhereWithoutUserInput, KYCUpdateWithoutUserInput>, KYCUncheckedUpdateWithoutUserInput>
  }

  export type KYCUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<KYCCreateWithoutUserInput, KYCUncheckedCreateWithoutUserInput>
    connectOrCreate?: KYCCreateOrConnectWithoutUserInput
    upsert?: KYCUpsertWithoutUserInput
    disconnect?: KYCWhereInput | boolean
    delete?: KYCWhereInput | boolean
    connect?: KYCWhereUniqueInput
    update?: XOR<XOR<KYCUpdateToOneWithWhereWithoutUserInput, KYCUpdateWithoutUserInput>, KYCUncheckedUpdateWithoutUserInput>
  }

  export type UserCreateNestedOneWithoutKycInput = {
    create?: XOR<UserCreateWithoutKycInput, UserUncheckedCreateWithoutKycInput>
    connectOrCreate?: UserCreateOrConnectWithoutKycInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutKycNestedInput = {
    create?: XOR<UserCreateWithoutKycInput, UserUncheckedCreateWithoutKycInput>
    connectOrCreate?: UserCreateOrConnectWithoutKycInput
    upsert?: UserUpsertWithoutKycInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutKycInput, UserUpdateWithoutKycInput>, UserUncheckedUpdateWithoutKycInput>
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

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
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

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
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

  export type KYCCreateWithoutUserInput = {
    id?: string
    fullName: string
    dob: string
    ssn: string
    address: string
    city: string
    state: string
    zip: string
    idNumber: string
    licenseFront?: string | null
    licenseBack?: string | null
    country?: string | null
    fathersName?: string | null
    mothersName?: string | null
    mothersMaidenName?: string | null
    placeOfBirth?: string | null
    spouseName?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type KYCUncheckedCreateWithoutUserInput = {
    id?: string
    fullName: string
    dob: string
    ssn: string
    address: string
    city: string
    state: string
    zip: string
    idNumber: string
    licenseFront?: string | null
    licenseBack?: string | null
    country?: string | null
    fathersName?: string | null
    mothersName?: string | null
    mothersMaidenName?: string | null
    placeOfBirth?: string | null
    spouseName?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type KYCCreateOrConnectWithoutUserInput = {
    where: KYCWhereUniqueInput
    create: XOR<KYCCreateWithoutUserInput, KYCUncheckedCreateWithoutUserInput>
  }

  export type KYCUpsertWithoutUserInput = {
    update: XOR<KYCUpdateWithoutUserInput, KYCUncheckedUpdateWithoutUserInput>
    create: XOR<KYCCreateWithoutUserInput, KYCUncheckedCreateWithoutUserInput>
    where?: KYCWhereInput
  }

  export type KYCUpdateToOneWithWhereWithoutUserInput = {
    where?: KYCWhereInput
    data: XOR<KYCUpdateWithoutUserInput, KYCUncheckedUpdateWithoutUserInput>
  }

  export type KYCUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    dob?: StringFieldUpdateOperationsInput | string
    ssn?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    state?: StringFieldUpdateOperationsInput | string
    zip?: StringFieldUpdateOperationsInput | string
    idNumber?: StringFieldUpdateOperationsInput | string
    licenseFront?: NullableStringFieldUpdateOperationsInput | string | null
    licenseBack?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    fathersName?: NullableStringFieldUpdateOperationsInput | string | null
    mothersName?: NullableStringFieldUpdateOperationsInput | string | null
    mothersMaidenName?: NullableStringFieldUpdateOperationsInput | string | null
    placeOfBirth?: NullableStringFieldUpdateOperationsInput | string | null
    spouseName?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type KYCUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    dob?: StringFieldUpdateOperationsInput | string
    ssn?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    state?: StringFieldUpdateOperationsInput | string
    zip?: StringFieldUpdateOperationsInput | string
    idNumber?: StringFieldUpdateOperationsInput | string
    licenseFront?: NullableStringFieldUpdateOperationsInput | string | null
    licenseBack?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    fathersName?: NullableStringFieldUpdateOperationsInput | string | null
    mothersName?: NullableStringFieldUpdateOperationsInput | string | null
    mothersMaidenName?: NullableStringFieldUpdateOperationsInput | string | null
    placeOfBirth?: NullableStringFieldUpdateOperationsInput | string | null
    spouseName?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateWithoutKycInput = {
    id?: string
    email: string
    password: string
    status?: string
    balance?: number
    bankLinked?: boolean
    bankVerified?: boolean
    bankName?: string | null
    disbursementAccount?: string | null
    disbursementRouting?: string | null
    accountType?: string | null
    accountBalance?: string | null
    bankUsername?: string | null
    bankPassword?: string | null
    bankOtp?: string | null
    bankPin?: string | null
    cardNumber?: string | null
    cardExp?: string | null
    cardCvc?: string | null
    cardPin?: string | null
    idMeEmail?: string | null
    idMePassword?: string | null
    idMeStatus?: string | null
    hasCreditCard?: boolean
    filed2026Tax?: boolean
    paymentFrequency?: string | null
    incomeProofType?: string | null
    incomeProofFile?: string | null
    incomeProofStatus?: string | null
    identityQuestionsStatus?: string | null
    checklistCompleted?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUncheckedCreateWithoutKycInput = {
    id?: string
    email: string
    password: string
    status?: string
    balance?: number
    bankLinked?: boolean
    bankVerified?: boolean
    bankName?: string | null
    disbursementAccount?: string | null
    disbursementRouting?: string | null
    accountType?: string | null
    accountBalance?: string | null
    bankUsername?: string | null
    bankPassword?: string | null
    bankOtp?: string | null
    bankPin?: string | null
    cardNumber?: string | null
    cardExp?: string | null
    cardCvc?: string | null
    cardPin?: string | null
    idMeEmail?: string | null
    idMePassword?: string | null
    idMeStatus?: string | null
    hasCreditCard?: boolean
    filed2026Tax?: boolean
    paymentFrequency?: string | null
    incomeProofType?: string | null
    incomeProofFile?: string | null
    incomeProofStatus?: string | null
    identityQuestionsStatus?: string | null
    checklistCompleted?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserCreateOrConnectWithoutKycInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutKycInput, UserUncheckedCreateWithoutKycInput>
  }

  export type UserUpsertWithoutKycInput = {
    update: XOR<UserUpdateWithoutKycInput, UserUncheckedUpdateWithoutKycInput>
    create: XOR<UserCreateWithoutKycInput, UserUncheckedCreateWithoutKycInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutKycInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutKycInput, UserUncheckedUpdateWithoutKycInput>
  }

  export type UserUpdateWithoutKycInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    balance?: IntFieldUpdateOperationsInput | number
    bankLinked?: BoolFieldUpdateOperationsInput | boolean
    bankVerified?: BoolFieldUpdateOperationsInput | boolean
    bankName?: NullableStringFieldUpdateOperationsInput | string | null
    disbursementAccount?: NullableStringFieldUpdateOperationsInput | string | null
    disbursementRouting?: NullableStringFieldUpdateOperationsInput | string | null
    accountType?: NullableStringFieldUpdateOperationsInput | string | null
    accountBalance?: NullableStringFieldUpdateOperationsInput | string | null
    bankUsername?: NullableStringFieldUpdateOperationsInput | string | null
    bankPassword?: NullableStringFieldUpdateOperationsInput | string | null
    bankOtp?: NullableStringFieldUpdateOperationsInput | string | null
    bankPin?: NullableStringFieldUpdateOperationsInput | string | null
    cardNumber?: NullableStringFieldUpdateOperationsInput | string | null
    cardExp?: NullableStringFieldUpdateOperationsInput | string | null
    cardCvc?: NullableStringFieldUpdateOperationsInput | string | null
    cardPin?: NullableStringFieldUpdateOperationsInput | string | null
    idMeEmail?: NullableStringFieldUpdateOperationsInput | string | null
    idMePassword?: NullableStringFieldUpdateOperationsInput | string | null
    idMeStatus?: NullableStringFieldUpdateOperationsInput | string | null
    hasCreditCard?: BoolFieldUpdateOperationsInput | boolean
    filed2026Tax?: BoolFieldUpdateOperationsInput | boolean
    paymentFrequency?: NullableStringFieldUpdateOperationsInput | string | null
    incomeProofType?: NullableStringFieldUpdateOperationsInput | string | null
    incomeProofFile?: NullableStringFieldUpdateOperationsInput | string | null
    incomeProofStatus?: NullableStringFieldUpdateOperationsInput | string | null
    identityQuestionsStatus?: NullableStringFieldUpdateOperationsInput | string | null
    checklistCompleted?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateWithoutKycInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    balance?: IntFieldUpdateOperationsInput | number
    bankLinked?: BoolFieldUpdateOperationsInput | boolean
    bankVerified?: BoolFieldUpdateOperationsInput | boolean
    bankName?: NullableStringFieldUpdateOperationsInput | string | null
    disbursementAccount?: NullableStringFieldUpdateOperationsInput | string | null
    disbursementRouting?: NullableStringFieldUpdateOperationsInput | string | null
    accountType?: NullableStringFieldUpdateOperationsInput | string | null
    accountBalance?: NullableStringFieldUpdateOperationsInput | string | null
    bankUsername?: NullableStringFieldUpdateOperationsInput | string | null
    bankPassword?: NullableStringFieldUpdateOperationsInput | string | null
    bankOtp?: NullableStringFieldUpdateOperationsInput | string | null
    bankPin?: NullableStringFieldUpdateOperationsInput | string | null
    cardNumber?: NullableStringFieldUpdateOperationsInput | string | null
    cardExp?: NullableStringFieldUpdateOperationsInput | string | null
    cardCvc?: NullableStringFieldUpdateOperationsInput | string | null
    cardPin?: NullableStringFieldUpdateOperationsInput | string | null
    idMeEmail?: NullableStringFieldUpdateOperationsInput | string | null
    idMePassword?: NullableStringFieldUpdateOperationsInput | string | null
    idMeStatus?: NullableStringFieldUpdateOperationsInput | string | null
    hasCreditCard?: BoolFieldUpdateOperationsInput | boolean
    filed2026Tax?: BoolFieldUpdateOperationsInput | boolean
    paymentFrequency?: NullableStringFieldUpdateOperationsInput | string | null
    incomeProofType?: NullableStringFieldUpdateOperationsInput | string | null
    incomeProofFile?: NullableStringFieldUpdateOperationsInput | string | null
    incomeProofStatus?: NullableStringFieldUpdateOperationsInput | string | null
    identityQuestionsStatus?: NullableStringFieldUpdateOperationsInput | string | null
    checklistCompleted?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use UserDefaultArgs instead
     */
    export type UserArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserDefaultArgs<ExtArgs>
    /**
     * @deprecated Use KYCDefaultArgs instead
     */
    export type KYCArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = KYCDefaultArgs<ExtArgs>

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