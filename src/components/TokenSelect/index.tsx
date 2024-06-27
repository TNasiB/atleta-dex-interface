import { useQuery } from '@apollo/client'
import { Token } from '@atleta-chain/sdk-core'
import { useMemo, useState } from 'react'
import { getContract } from 'viem'
import { getWalletClient } from 'wagmi/actions'

import { erc20abi } from '@/abi/erc20.abi'
import { NETWORK_ID } from '@/config/app'
import { config } from '@/config/wagmi'
import { GetTokensDocument } from '@/gql/graphql'
import Dialog from '@/shared/ui/Dialog'
import Input from '@/shared/ui/Input'
import Spinner from '@/shared/ui/Spinner'

import TokenCard from './TokenCard/TokenCard'
import S from './TokenSelect.module.scss'

type TokenSelectProps = {
  onChange: (token: Token) => void
  value: Token | null
}

const TokenSelect = ({ onChange, value }: TokenSelectProps) => {
  const [open, setOpen] = useState(false)
  const { data, loading } = useQuery(GetTokensDocument)
  const [uploadedToken, setUploadedToken] = useState<Token | null>(null)

  const handleTokenSelect = (token: Token) => {
    onChange(token)
    setOpen(false)
  }

  const formattedTokens = useMemo(
    () => [
      // eslint-disable-next-line no-unsafe-optional-chaining
      ...(data?.tokens ?? []).map(
        token =>
          new Token(NETWORK_ID, token.id, Number(token.decimals), token.symbol)
      ),
      new Token(
        NETWORK_ID,
        '0xD340Ee0c35cd6B891B1b9A9437fFFd8F370CB0cF',
        18,
        'TOKEN_1'
      ),
      new Token(
        NETWORK_ID,
        '0x5ED77c45BE0D8ceD9C729130bf9ce546fb2594f5',
        18,
        'TOKEN_2'
      )
    ],
    [data]
  )

  const handleSearchToken = async (value: string) => {
    if (/^(0x)?[0-9a-fA-F]{40}$/.test(value)) {
      const walletClient = await getWalletClient(config)

      const contract = getContract({
        address: value as `0x${string}`,
        abi: erc20abi,
        client: walletClient
      })

      const decimals = await contract.read.decimals()

      setUploadedToken(new Token(NETWORK_ID, value, Number(decimals)))
    }
  }

  return (
    <>
      <button className={S.trigger} onClick={() => setOpen(true)}>
        {value?.symbol ?? 'Выберите токен'}
      </button>

      <Dialog open={open} toggleOpen={setOpen} title="Выберите токен">
        <Input
          width="form"
          onChange={e => handleSearchToken(e.target.value)}
          placeholder="Введите адрес токена если его нет"
        />

        <div className={S.list}>
          {(() => {
            if (uploadedToken) {
              return (
                <TokenCard
                  token={uploadedToken}
                  onClick={() => handleTokenSelect(uploadedToken)}
                />
              )
            }

            if (loading) {
              return <Spinner />
            }

            return formattedTokens?.map(token => (
              <TokenCard
                key={token.address}
                token={token}
                onClick={() => handleTokenSelect(token)}
              />
            ))
          })()}
        </div>
      </Dialog>
    </>
  )
}

export default TokenSelect
