import { Token } from "@atleta-chain/sdk-core";

export const getOrderedTokens = ([tokenA, tokenB]: [Token, Token]): [Token, Token] => {
  if (tokenA.address.toLowerCase() < tokenB.address.toLowerCase()) {
    return [tokenA, tokenB];
  }

  return [tokenB, tokenA];
};

type TokenValue = {
  value: string;
  token: Token;
};
export const getOrderedTokensWithValue = ([tokenA, tokenB]: [TokenValue, TokenValue]): [
  TokenValue,
  TokenValue
] => {
  if (tokenA.token.address.toLowerCase() < tokenB.token.address.toLowerCase()) {
    return [tokenA, tokenB];
  }

  return [tokenB, tokenA];
};
