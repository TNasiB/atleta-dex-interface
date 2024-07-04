import { TOKENS, TokenEnum } from '@/config/tokens'
import { ChainId, V2_ROUTER_ADDRESSES } from '@atleta-chain/sdk-core'
import { Button } from '@radix-ui/themes'
import { addLiquidity } from './core/addLiquidity'
import { useApprove } from '@/hooks/useApprove'
import { parseUnits } from 'viem'
import { useEffect } from 'react'
import { readContract } from 'wagmi/actions'
import { config } from '@/config/wagmi'
import { getPairAddress } from './core/getPairAddress'
import { pairv2Abi } from '@/abi/pairv2.abi'
import { createAndInit } from './core/createAndInit'

const token1 = TOKENS[TokenEnum.USDT]
const token2 = TOKENS[TokenEnum.WATLA]

const CreatePoolV2: React.FC = () => {
  const { needApprove: needApprove1, approve: approve1 } = useApprove({
    amount: { token: token1, value: '10000000' },
    spenderAddress: V2_ROUTER_ADDRESSES[ChainId.ATLETA_OLYMPIA]
  })
  const { needApprove: needApprove2, approve: approve2 } = useApprove({
    amount: { token: token2, value: '3600000' },
    spenderAddress: V2_ROUTER_ADDRESSES[ChainId.ATLETA_OLYMPIA]
  })

  useEffect(() => {
    getPairAddress(token2.address, token1.address).then(async address => {
      console.log(address)
      const res = await readContract(config, {
        address,
        abi: pairv2Abi,
        functionName: 'getReserves'
      })

      console.log({ res })
    })
  }, [])

  const createPair = async () => {
    try {
      await createAndInit(token1, token2)

      if (needApprove1) {
        await approve1()
      }

      if (needApprove2) {
        await approve2()
      }

      addLiquidity({
        address0: token1.address as `0x${string}`,
        address1: token2.address as `0x${string}`,
        sum0desired: parseUnits('3600', 18),
        sum1desired: parseUnits('1', 18)
      })
    } catch (e) {
      console.log(e)
    }
  }

  return <Button onClick={createPair}>Creacte pool v2</Button>
}

export default CreatePoolV2
