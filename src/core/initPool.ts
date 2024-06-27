import { Fee } from '@/config/fees'
import { positionManagerAbi } from '@/abi/positionManager.abi'
import { SEPOLIA_POSITION_MANAGER_ADDRESS } from '@/config/addreses'
import { config } from '@/config/wagmi'
import { Token } from '@atleta-chain/sdk-core'
import { encodeSqrtRatioX96 } from '@atleta-chain/v3-sdk'
import {
  simulateContract,
  waitForTransactionReceipt,
  writeContract
} from 'wagmi/actions'
import { parseUnits } from 'viem'

type Interface_initPool = {
  token0: {
    token: Token
    value: string
  }
  token1: {
    token: Token
    value: string
  }
  fee: Fee
}

export const initPool = async ({ token0, token1, fee }: Interface_initPool) => {
  try {
    const sqrt = encodeSqrtRatioX96(
      parseUnits(token1.value, token1.token.decimals).toString(),
      parseUnits(token0.value, token0.token.decimals).toString()
    )

    console.log(sqrt.toString())

    console.log({ token0, token1, fee })

    const { request: createRequest, result } = await simulateContract(config, {
      address: SEPOLIA_POSITION_MANAGER_ADDRESS,
      abi: positionManagerAbi,
      functionName: 'createAndInitializePoolIfNecessary',
      args: [
        token0.token.address as `0x${string}`,
        token1.token.address as `0x${string}`,
        fee,
        BigInt(sqrt.toString())
      ]
    })

    const hashCreate = await writeContract(config, createRequest)

    await waitForTransactionReceipt(config, { hash: hashCreate })
  } catch (e) {
    console.log(e)
  }
}
