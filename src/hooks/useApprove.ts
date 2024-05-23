import { useEffect, useState } from 'react'
import { parseUnits } from 'viem'
import { useAccount } from 'wagmi'
import {
  readContract,
  waitForTransactionReceipt,
  writeContract
} from 'wagmi/actions'

import { config } from '@/config/wagmi'
import { erc20abi } from '../abi/erc20.abi'
import { Token } from '@atleta-chain/sdk-core'

type ApproveDto = {
  spenderAddress: string

  amount: {
    token: Token
    value: string
  }
}

export const useApprove = ({ amount, spenderAddress }: ApproveDto) => {
  const { address } = useAccount()
  const [needApprove, setNeedApprove] = useState(false)

  const approve = async () => {
    if (address) {
      const hash = await writeContract(config, {
        abi: erc20abi,
        address: amount.token.address as `0x${string}`,
        functionName: 'approve',
        args: [
          spenderAddress as `0x${string}`,
          parseUnits(amount.value, amount.token.decimals)
        ]
      })

      await waitForTransactionReceipt(config, { hash })
    }
  }

  useEffect(() => {
    const checkApprove = async () => {
      if (address) {
        const allowance = await readContract(config, {
          abi: erc20abi,
          address: amount.token.address as `0x${string}`,
          functionName: 'allowance',
          args: [address, spenderAddress as `0x${string}`]
        })

        console.log({ allowance })

        if (allowance < BigInt(amount.value)) {
          setNeedApprove(true)
        }
      }
    }

    checkApprove()
  }, [amount, spenderAddress])

  return { needApprove, approve }
}
