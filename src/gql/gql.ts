/* eslint-disable */
import * as types from './graphql'
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core'

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
  'query GetMyNftPositions($origin: Bytes!) {\n  mints(first: 10, where: {origin: $origin}) {\n    id\n    owner\n    amount0\n    sender\n    token0 {\n      symbol\n    }\n    token1 {\n      symbol\n    }\n  }\n}':
    types.GetMyNftPositionsDocument,
  'query GetPools {\n  pools(first: 20) {\n    token0 {\n      name\n      decimals\n      symbol\n      id\n    }\n    token1 {\n      name\n      decimals\n      symbol\n      id\n    }\n    feesUSD\n    feeTier\n    id\n  }\n}':
    types.GetPoolsDocument,
  'query GetTokens {\n  tokens {\n    id\n    symbol\n    name\n    decimals\n  }\n}': types.GetTokensDocument
}

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: 'query GetMyNftPositions($origin: Bytes!) {\n  mints(first: 10, where: {origin: $origin}) {\n    id\n    owner\n    amount0\n    sender\n    token0 {\n      symbol\n    }\n    token1 {\n      symbol\n    }\n  }\n}'
): (typeof documents)['query GetMyNftPositions($origin: Bytes!) {\n  mints(first: 10, where: {origin: $origin}) {\n    id\n    owner\n    amount0\n    sender\n    token0 {\n      symbol\n    }\n    token1 {\n      symbol\n    }\n  }\n}']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: 'query GetPools {\n  pools(first: 20) {\n    token0 {\n      name\n      decimals\n      symbol\n      id\n    }\n    token1 {\n      name\n      decimals\n      symbol\n      id\n    }\n    feesUSD\n    feeTier\n    id\n  }\n}'
): (typeof documents)['query GetPools {\n  pools(first: 20) {\n    token0 {\n      name\n      decimals\n      symbol\n      id\n    }\n    token1 {\n      name\n      decimals\n      symbol\n      id\n    }\n    feesUSD\n    feeTier\n    id\n  }\n}']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: 'query GetTokens {\n  tokens {\n    id\n    symbol\n    name\n    decimals\n  }\n}'
): (typeof documents)['query GetTokens {\n  tokens {\n    id\n    symbol\n    name\n    decimals\n  }\n}']

export function graphql(source: string) {
  return (documents as any)[source] ?? {}
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never
