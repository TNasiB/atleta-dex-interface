'use client'

import { Button } from '@radix-ui/themes'
import { Token } from '@atleta-chain/sdk-core'
import { Controller, useForm } from 'react-hook-form'
import { FaArrowRightArrowLeft } from 'react-icons/fa6'

import TokenSelect from '@/components/TokenSelect'
import { useRoute } from '@/hooks/useRoute'
import Input from '@/shared/ui/Input'

import S from './swap.module.scss'
import { TOKENS } from '@/config/tokens'
import { useApprove } from '@/hooks/useApprove'
import { defaultAddresses } from '@/config/addreses'
import { MAX_UINT160 } from '@atleta-chain/smart-order-router'

type SwapData = {
  amount1: { value: string; token: Token }
  amount2: { value: string; token: Token }
}

const Swap = () => {
  const { register, watch, control, handleSubmit } = useForm<SwapData>({
    defaultValues: {
      amount1: { value: '', token: TOKENS[0] },
      amount2: { value: '', token: TOKENS[1] }
    }
  })

  const token1 = watch('amount1.token')
  const token2 = watch('amount2.token')

  const { approve: approve1 } = useApprove({
    amount: { token: token1, value: MAX_UINT160 },
    spenderAddress: defaultAddresses.swapRouter02Address!
  })

  const { approve: approve2 } = useApprove({
    amount: { token: token2, value: MAX_UINT160 },
    spenderAddress: defaultAddresses.swapRouter02Address!
  })

  const { execute } = useRoute()

  // watch(async (data) => {
  //   const tokenA = data.amount1?.token?.address as `0x${string}`;
  //   const tokenB = data.amount2?.token?.address as `0x${string}`;

  //   if (tokenA && tokenB && data.amount1?.token && data.amount2?.token) {
  //     execute({
  //       amountIn: 10,
  //       tokenIn: data.amount1?.token,
  //       tokenOut: data.amount2.token,
  //     });
  //   }
  // });

  const handleSwap = handleSubmit(async data => {
    const tokenA = data.amount1?.token?.address as `0x${string}`
    const tokenB = data.amount2?.token?.address as `0x${string}`

    await approve1()
    await approve2()

    if (tokenA && tokenB && data.amount1?.token && data.amount2?.token) {
      execute({
        amountIn: +data.amount1.value,
        tokenIn: data.amount1?.token,
        tokenOut: data.amount2.token
      })
    }
  })

  return (
    <div className={S.swap}>
      <span>SWAP TOKENS</span>

      <Input
        {...register('amount1.value')}
        rightSlot={
          <Controller
            control={control}
            name="amount1.token"
            render={({ field: { value, onChange } }) => (
              <TokenSelect onChange={onChange} value={value} />
            )}
          />
        }
        placeholder="Введите количество токенов"
      />

      <button className={S.reverseBtn}>
        <FaArrowRightArrowLeft width={24} height={24} />
      </button>

      <Input
        disabled
        {...register('amount2.value')}
        rightSlot={
          <Controller
            control={control}
            name="amount2.token"
            render={({ field: { value, onChange } }) => (
              <TokenSelect onChange={onChange} value={value} />
            )}
          />
        }
        placeholder="Введите количество токенов"
      />

      <Button onClick={handleSwap}>Swap</Button>
    </div>
  )
}

export default Swap
