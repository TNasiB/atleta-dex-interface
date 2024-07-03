import { factoryv2Abi } from '@/abi/factoryv2.abi'
import { config } from '@/config/wagmi'
import { ChainId, V2_FACTORY_ADDRESSES } from '@atleta-chain/sdk-core'
import { readContract } from 'wagmi/actions'

export const getPairAddress = async (tokenA: string, tokenB: string) => {
  const pairAddress = await readContract(config, {
    address: V2_FACTORY_ADDRESSES[ChainId.ATLETA_OLYMPIA] as `0x${string}`,
    abi: factoryv2Abi,
    functionName: 'getPair',
    args: [tokenA as `0x${string}`, tokenB as `0x${string}`]
  })

  return pairAddress
}
