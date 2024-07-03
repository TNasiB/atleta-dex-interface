'use client'

import {
  CurrencyAmount,
  Percent,
  Token,
  TradeType
} from '@atleta-chain/sdk-core'
import {
  AlphaRouter,
  SwapOptionsSwapRouter02,
  SwapType
} from '@atleta-chain/smart-order-router'
import { ethers } from 'ethers'
import JSBI from 'jsbi'
import { useCallback } from 'react'
import { sepolia } from 'viem/chains'
import { useAccount } from 'wagmi'

import { SEPOLIA_RPC, defaultAddresses } from '@/config/addreses'
import { fromReadableAmount } from '@/utils/parseUnitsUni'

import { useEthersProvider } from './useEthersProvider'
import { MAX_FEE_PER_GAS, MAX_PRIORITY_FEE_PER_GAS } from './useCreatePosition'
import { ATLETA_OPYMPIA_CHAIN_ID } from '@/config/wagmi'

type Execute = {
  amountIn: number
  tokenIn: Token
  tokenOut: Token
}

export const useRoute = () => {
  const ethersPorivder = useEthersProvider()

  const { address } = useAccount()

  const execute = useCallback(
    async ({ amountIn, tokenIn, tokenOut }: Execute) => {
      try {
        if (!ethersPorivder) {
          throw new Error('Provider doesnt initialiate')
        }

        if (!address) {
          throw new Error('Нет адреса кошелька')
        }

        const router = new AlphaRouter({
          chainId: ATLETA_OPYMPIA_CHAIN_ID,
          provider: new ethers.providers.JsonRpcProvider(SEPOLIA_RPC)
        })

        const options: SwapOptionsSwapRouter02 = {
          recipient: address,
          slippageTolerance: new Percent(5000, 10_000),
          deadline: Math.floor(Date.now() / 1000 + 1800),
          type: SwapType.SWAP_ROUTER_02
        }

        const rawTokenAmountIn: JSBI = fromReadableAmount(
          amountIn,
          tokenIn.decimals
        )
        console.log({ amountIn })
        console.log({ rawTokenAmountIn })

        const test = CurrencyAmount.fromRawAmount(tokenIn, rawTokenAmountIn)

        const route = await router.route(
          test,
          tokenOut,
          TradeType.EXACT_INPUT,
          options
        )

        console.log({ route })

        const provider = new ethers.providers.Web3Provider(
          (window as any).ethereum
        )

        const signer = provider.getSigner()

        console.log({ route })

        if (!route || !route.methodParameters) {
          alert('route undefined')
          return
        }

        console.log(route.methodParameters.calldata)

        const txRes = await signer.sendTransaction({
          data: route.methodParameters.calldata,
          to: defaultAddresses.swapRouter02Address,
          value: route.methodParameters.value,
          from: address,
          gasLimit: ethers.utils.hexlify(1700000),
          maxFeePerGas: MAX_FEE_PER_GAS,
          maxPriorityFeePerGas: MAX_PRIORITY_FEE_PER_GAS
        })

        console.log({ txRes })
      } catch (e) {
        console.error(e)
      }
    },
    [address, ethersPorivder]
  )

  return { execute }
}
