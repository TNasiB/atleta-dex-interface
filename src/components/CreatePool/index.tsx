'use client'

import { Token } from '@atleta-chain/sdk-core'
import { Button, Radio, RadioCards, Select, TextField } from '@radix-ui/themes'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { SEPOLIA_POSITION_MANAGER_ADDRESS } from '@/config/addreses'
import { FEES } from '@/config/fees'
import { TOKENS } from '@/config/tokens'
import { useApprove } from '@/hooks/useApprove'
import { useCreatePosition } from '@/hooks/useCreatePosition'

import S from './createPool.module.scss'

type CreatePoolDto = {
  amountA: { token: Token; value: string }
  amountB: { token: Token; value: string }
  fee: (typeof FEES)[number]
  minPrice: string
  maxPrice: string
}

const CreatePool = () => {
  const { control, register, watch, getValues, handleSubmit } =
    useForm<CreatePoolDto>({
      defaultValues: {
        amountA: { token: TOKENS[0], value: '0' },
        amountB: { token: TOKENS[1], value: '0' },
        fee: 10000
      }
    })

  const amountA = watch('amountA')
  const amountB = watch('amountB')

  const {
    needApprove: needApproveA,
    approve: approveA,
    loading: loadingA
  } = useApprove({
    amount: amountA,
    spenderAddress: SEPOLIA_POSITION_MANAGER_ADDRESS
  })
  const {
    needApprove: needApproveB,
    approve: approveB,
    loading: loadingB
  } = useApprove({
    amount: amountB,
    spenderAddress: SEPOLIA_POSITION_MANAGER_ADDRESS
  })

  const [_, setTokenCurrency] = useState<Token>(getValues('amountA.token'))
  const { createPosition, loading } = useCreatePosition()

  const handleCreatePosition = handleSubmit(async data => {
    await createPosition({
      token1: data.amountA,
      token2: data.amountB,
      fee: data.fee
    })
  })

  return (
    <div className={S.createPool}>
      <div className={S.content}>
        <span>Выберите пару</span>

        <div className={S.pairs}>
          <Controller
            control={control}
            name="amountA.token"
            render={({ field: { onChange, value } }) => (
              <Select.Root
                value={value.address}
                onValueChange={val =>
                  onChange(TOKENS.find(token => token.address === val))
                }
              >
                <Select.Trigger className={S.select}>
                  {value.symbol}
                </Select.Trigger>

                <Select.Content position="popper">
                  {TOKENS.map(token => (
                    <Select.Item key={token.address} value={token.address}>
                      {token.symbol}
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Root>
            )}
          />

          <Controller
            control={control}
            name="amountB.token"
            render={({ field: { onChange, value } }) => (
              <Select.Root
                value={value.address}
                onValueChange={val =>
                  onChange(TOKENS.find(token => token.address === val))
                }
              >
                <Select.Trigger className={S.select}>
                  {value.symbol}
                </Select.Trigger>

                <Select.Content position="popper">
                  {TOKENS.map(token => (
                    <Select.Item key={token.address} value={token.address}>
                      {token.symbol}
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Root>
            )}
          />
        </div>

        <span>Выберите комиссию</span>

        <div className={S.fees}>
          <Controller
            control={control}
            name="fee"
            render={({ field: { value, onChange } }) => (
              <RadioCards.Root
                defaultValue="1"
                columns={'4'}
                value={value.toString()}
              >
                {FEES.map(fee => (
                  <RadioCards.Item
                    key={fee}
                    value={fee.toString()}
                    onClick={() => onChange(fee)}
                  >
                    {fee / 10000}%
                  </RadioCards.Item>
                ))}
              </RadioCards.Root>
            )}
          />
        </div>

        <div className={S.prices}>
          <div>
            <span>Ценовой диапазон</span>

            <div>
              {[amountA, amountB].map(({ token }) => (
                <label key={token.address}>
                  <Radio
                    name="token"
                    value={token.address}
                    onChange={v => {
                      const token = [amountA, amountB].find(
                        amount => amount.token.address === v.target.value
                      )

                      if (token) {
                        setTokenCurrency(token.token)
                      }
                    }}
                  />
                  <span>{token.symbol}</span>
                </label>
              ))}
            </div>
          </div>

          <TextField.Root placeholder="Min price" {...register('minPrice')} />
          <TextField.Root placeholder="Max price" {...register('maxPrice')} />
        </div>

        <div>
          <span>Вложения</span>

          <TextField.Root
            placeholder={amountA.token.symbol}
            {...register('amountA.value')}
          />
          <TextField.Root
            placeholder={amountB.token.symbol}
            {...register('amountB.value')}
          />
        </div>

        {!needApproveA && !needApproveB && (
          <Button onClick={handleCreatePosition} disabled={loading}>
            {loading ? 'Загрузка' : 'Добавить ликвидность'}
          </Button>
        )}

        {needApproveA && (
          <Button onClick={approveA} loading={loadingA}>
            {`Апрувнуть ${amountA.token.symbol}`}
          </Button>
        )}

        {needApproveB && (
          <Button onClick={approveB} loading={loadingB}>
            {`Апрувнуть ${amountB.token.symbol}`}
          </Button>
        )}
      </div>
    </div>
  )
}

export default CreatePool
