import { Token } from '@atleta-chain/sdk-core'

import { NETWORK_ID } from './app'

export const TOKENS: Token[] = [
  new Token(
    NETWORK_ID,
    '0xE67ABDA0D43f7AC8f37876bBF00D1DFadbB93aaa',
    18,
    'WETH'
  ),
  new Token(
    NETWORK_ID,
    '0xcFcD20aE75876EF87d75978cCe070646C555f711',
    18,
    'USDC'
  ),
  new Token(
    NETWORK_ID,
    '0x096435c06D354BAB973503C090F27AbF47e9BC14',
    18,
    'DAI'
  ),
  new Token(
    NETWORK_ID,
    '0x710f4FBe314CF403dE432d96d7EF53ded48beDbe',
    18,
    'TT1'
  ),
  new Token(NETWORK_ID, '0xc153D96AdAeD1fa02a454A884E3672123b01C062', 18, 'TNB')
] as const
