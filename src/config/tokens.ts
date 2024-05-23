import { Token } from "@atleta-chain/sdk-core";

import { NETWORK_ID } from "./app";

export const TOKENS: Token[] = [
  // new Token(NETWORK_ID, "0xD340Ee0c35cd6B891B1b9A9437fFFd8F370CB0cF", 18, "Token 1"),
  // new Token(NETWORK_ID, "0x5ed77c45be0d8ced9c729130bf9ce546fb2594f5", 18, "Token 2"),
  new Token(NETWORK_ID, "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984", 18, "UNI"),
  new Token(NETWORK_ID, "0xE67ABDA0D43f7AC8f37876bBF00D1DFadbB93aaa", 18, "WETH"),
  // new Token(NETWORK_ID, "0x9534BC75342d65953B86830b5103Da7f17F5aaA7", 18, "Token 3"),
  // new Token(NETWORK_ID, "0x3c08Af36fd90616D7F7fB32097f3F07fc210A53b", 18, "Token 4"),
  new Token(NETWORK_ID, "0x7169d38820dfd117c3fa1f22a697dba58d90ba06", 6, "USDT"),
  new Token(NETWORK_ID, "0xB4090933A1E84401eef6819B153Dff1B732E070A", 18, "DAI"),

  // new Token(NETWORK_ID, "0x94a9D9AC8a22534E3FaCa9F4e7F2E2cf85d5E4C8", 6, "USDC"),
] as const;
