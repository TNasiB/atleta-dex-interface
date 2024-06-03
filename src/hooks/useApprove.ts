import { useEffect, useState } from 'react'
import { parseUnits } from 'viem'
import { useAccount } from 'wagmi'
import {
  readContract,
  waitForTransactionReceipt,
  writeContract
} from 'wagmi/actions'

import { config } from '@/config/wagmi'
import { Token } from '@atleta-chain/sdk-core'
import { erc20abi } from '@/abi/erc20.abi'

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
  const [loading, setLoading] = useState(false)

  const approve = async () => {
    try {
      if (address) {
        setLoading(true)

        const parsedAmount = parseUnits(amount.value, amount.token.decimals)

        const hash = await writeContract(config, {
          abi: erc20abi,
          address: amount.token.address as `0x${string}`,
          functionName: 'approve',
          args: [spenderAddress as `0x${string}`, parsedAmount]
        })

        await waitForTransactionReceipt(config, { hash })
        setLoading(false)
      }
    } catch (e) {
      console.error(e)
      setLoading(false)
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

        console.log(Number(allowance) > Number(amount.value), '123')

        if (Number(allowance) < Number(amount.value)) {
          setNeedApprove(true)
        }
      }
    }

    checkApprove()
  }, [amount, spenderAddress, amount.value])

  return { needApprove, approve, loading }
}
