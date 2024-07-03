'use client'

import { v2routerAbi } from '@/abi/v2router.abi'
import { config } from '@/config/wagmi'
import { ChainId, V2_ROUTER_ADDRESSES } from '@atleta-chain/sdk-core'
import {
  getAccount,
  simulateContract,
  waitForTransactionReceipt,
  writeContract
} from 'wagmi/actions'

type Dto = {
  address0: `0x${string}`
  address1: `0x${string}`
  sum0desired: bigint
  sum1desired: bigint
}

export const addLiquidity = async ({
  address0,
  address1,
  sum0desired,
  sum1desired
}: Dto) => {
  const account = getAccount(config)

  if (!account?.address) {
    throw new Error('Invalid address')
  }

  console.log(
    address0,
    address1,
    sum0desired,
    sum1desired,
    sum0desired,
    sum1desired,
    account.address,
    BigInt(Math.floor(Date.now() / 1000 + 1800))
  )

  const { request } = await simulateContract(config, {
    address: V2_ROUTER_ADDRESSES[ChainId.ATLETA_OLYMPIA] as `0x${string}`,
    abi: v2routerAbi,
    functionName: 'addLiquidity',
    args: [
      address0,
      address1,
      sum0desired,
      sum1desired,
      0n,
      0n,
      account.address,
      BigInt(Math.floor(Date.now() / 1000 + 1800))
    ]
  })

  const hash = await writeContract(config, request)

  await waitForTransactionReceipt(config, { hash })
}
