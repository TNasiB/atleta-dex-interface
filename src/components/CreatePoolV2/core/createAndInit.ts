import { factoryv2Abi } from '@/abi/factoryv2.abi'
import { pairv2Abi } from '@/abi/pairv2.abi'
import { config } from '@/config/wagmi'
import { ChainId, Token, V2_FACTORY_ADDRESSES } from '@atleta-chain/sdk-core'
import { Pair } from '@atleta-chain/v2-sdk'
import {
  simulateContract,
  waitForTransactionReceipt,
  writeContract
} from 'wagmi/actions'

export const createAndInit = async (tokenA: Token, tokenB: Token) => {
  const pairAddress = Pair.getAddress(tokenA, tokenB)

  console.log({ pairAddress })

  const { request } = await simulateContract(config, {
    abi: factoryv2Abi,
    address: V2_FACTORY_ADDRESSES[ChainId.ATLETA_OLYMPIA] as `0x${string}`,
    functionName: 'createPair',
    args: [tokenA.address as `0x${string}`, tokenB.address as `0x${string}`]
  })
  const hash = await writeContract(config, request)
  await waitForTransactionReceipt(config, { hash })

  const res = await writeContract(config, {
    address: pairAddress as `0x${string}`,
    abi: pairv2Abi,
    functionName: 'initialize',
    args: [tokenA.address as `0x${string}`, tokenB.address as `0x${string}`]
  })

  console.log(res)
}
