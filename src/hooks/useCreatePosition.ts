import { Percent, Token } from '@atleta-chain/sdk-core'
import {
  computePoolAddress,
  FeeAmount,
  nearestUsableTick,
  NonfungiblePositionManager,
  Pool,
  Position
} from '@atleta-chain/v3-sdk'
import { useState } from 'react'
import IUniswapV3PoolABI from '@atleta-chain/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json'
import { ethers } from 'ethers'
import { parseUnits } from 'viem'
import { getOrderedTokensWithValue } from '@/utils/getOrderedTokens'
import { initPool } from '@/core/initPool'
import { GetPoolByHashDocument } from '@/gql/graphql'
import { client } from '@/services/gql'
import { defaultAddresses } from '@/config/addreses'
// qrtPriceX96 uint160, tick int24, observationIndex uint16, observationCardinality uint16, observationCardinalityNext uint16, feeProtocol uint8, unlocked bool
export const MAX_FEE_PER_GAS = '100000000000'
export const MAX_PRIORITY_FEE_PER_GAS = '100000000000'

type CreatePositionRequest = {
  fee: FeeAmount
  token1: { token: Token; value: string }
  token2: { token: Token; value: string }
}

export const useCreatePosition = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<unknown>()

  const createPosition = async ({
    fee,
    token1,
    token2
  }: CreatePositionRequest) => {
    try {
      // @ts-ignore
      if (!window.ethereum) {
        throw new Error('Invalid provider')
      }

      const [tokenA, tokenB] = getOrderedTokensWithValue([token1, token2])
      const poolAddress = computePoolAddress({
        factoryAddress: defaultAddresses.v3CoreFactoryAddress,
        tokenA: tokenA.token,
        tokenB: tokenB.token,
        fee
      })

      // const createdPool = await client.query({
      //   query: GetPoolByHashDocument,
      //   variables: { hash: poolAddress.toLowerCase() }
      // })

      // console.log(createdPool)

      // if (!createdPool.data.pool) {
      // }
      await initPool({
        token0: tokenA,
        token1: tokenB,
        fee: fee
      })

      // @ts-ignore
      const provider = new ethers.providers.Web3Provider(window.ethereum)

      console.log({ poolAddress })

      const poolContract = new ethers.Contract(
        poolAddress,
        IUniswapV3PoolABI.abi,
        provider
      )

      const [liquidity, slot0] = await Promise.all([
        poolContract.liquidity(),
        poolContract.slot0(),
        poolContract.tickSpacing()
      ])

      const pool = new Pool(
        tokenA.token,
        tokenB.token,
        fee,
        slot0.sqrtPriceX96.toString(),
        liquidity.toString(),
        slot0.tick
      )

      console.log(pool.tickCurrent)

      const tickLower =
        nearestUsableTick(pool.tickCurrent, pool.tickSpacing) -
        pool.tickSpacing * 2

      const tickUpper =
        nearestUsableTick(pool.tickCurrent, pool.tickSpacing) +
        pool.tickSpacing * 2

      console.log(tokenA.value, tokenA.token.decimals, '123')

      const parsedAmount0 = parseUnits(
        tokenA.value,
        tokenA.token.decimals
      ).toString()

      console.log(tokenB.value, tokenB.token.decimals, 'asd')
      const parsedAmount1 = parseUnits(
        tokenB.value,
        tokenB.token.decimals
      ).toString()

      console.log({ parsedAmount0, parsedAmount1 })

      const position = Position.fromAmounts({
        pool: pool,
        tickLower: tickLower,
        tickUpper: tickUpper,
        amount0: parsedAmount0,
        amount1: parsedAmount1,
        useFullPrecision: true
      })

      console.log({ tickCurrent: position.pool.tickCurrent })

      console.log(position.pool.token0Price.toSignificant(5), 'price')

      const signer = provider.getSigner()

      const mintOptions = {
        recipient: await signer.getAddress(),
        deadline: Math.floor(Date.now() / 1000) + 1800,
        slippageTolerance: new Percent(50, 10_000)
      }

      const { calldata, value } = NonfungiblePositionManager.addCallParameters(
        position,
        mintOptions
      )

      console.log(calldata)

      // return

      const tx = await signer.sendTransaction({
        to: defaultAddresses.nonfungiblePositionManagerAddress!,
        data: calldata,
        value: value
        // maxFeePerGas: ethers.utils.parseUnits('100', 'gwei')
      })

      console.log(await tx.wait())
    } catch (e) {
      console.error(e)
      setError(e)
    }

    setLoading(false)
  }

  return { createPosition, loading, error }
}
