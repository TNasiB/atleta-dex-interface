import {
  SEPOLIA_FACTORY_ADDRESS,
  SEPOLIA_POSITION_MANAGER_ADDRESS,
} from "@/config/addreses";
import { Percent, Token } from "@atleta-chain/sdk-core";
import {
  computePoolAddress,
  FeeAmount,
  nearestUsableTick,
  NonfungiblePositionManager,
  Pool,
  Position,
} from "@atleta-chain/v3-sdk";
import { useState } from "react";
import IUniswapV3PoolABI from "@atleta-chain/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json";
import { ethers } from "ethers";
import { getOrderedTokens } from "@/utils/getOrderedTokens";
import { initPool } from "@/core/initPool";
import { parseUnits } from "viem";
// qrtPriceX96 uint160, tick int24, observationIndex uint16, observationCardinality uint16, observationCardinalityNext uint16, feeProtocol uint8, unlocked bool
export const MAX_FEE_PER_GAS = "100000000000";
export const MAX_PRIORITY_FEE_PER_GAS = "100000000000";

type CreatePositionRequest = {
  amount1: string;
  amount2: string;
  fee: FeeAmount;
  token1: Token;
  token2: Token;
};

export const useCreatePosition = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>();

  const createPosition = async ({
    amount1,
    amount2,
    fee,
    token1,
    token2,
  }: CreatePositionRequest) => {
    try {
      if (!window.ethereum) {
        throw new Error("Invalid provider");
      }

      await initPool({
        amount1: {
          token: token1,
          value: amount1,
        },
        amount2: {
          token: token2,
          value: amount2,
        },
        fee: fee,
      });

      const provider = new ethers.providers.Web3Provider(window.ethereum);

      const tokenA = token1.address < token2.address ? token1 : token2;
      const tokenB = token1.address < token2.address ? token2 : token1;

      const poolAddress = computePoolAddress({
        factoryAddress: SEPOLIA_FACTORY_ADDRESS,
        tokenA: tokenA,
        tokenB: tokenB,
        fee: fee,
      });

      console.log({ poolAddress });

      const poolContract = new ethers.Contract(
        poolAddress,
        IUniswapV3PoolABI.abi,
        provider
      );

      const [liquidity, slot0] = await Promise.all([
        poolContract.liquidity(),
        poolContract.slot0(),
        poolContract.tickSpacing(),
      ]);

      console.log(slot0.tick, liquidity, slot0);

      const pool = new Pool(
        token1,
        token2,
        fee,
        slot0.sqrtPriceX96.toString(),
        liquidity.toString(),
        slot0.tick
      );

      console.log(pool.tickCurrent);

      const tickLower =
        nearestUsableTick(pool.tickCurrent, pool.tickSpacing) - pool.tickSpacing * 2;

      const tickUpper =
        nearestUsableTick(pool.tickCurrent, pool.tickSpacing) + pool.tickSpacing * 2;

      alert(1);

      const position = Position.fromAmounts({
        pool: pool,
        tickLower: tickLower,
        tickUpper: tickUpper,
        amount0: parseUnits(amount1, token1.decimals).toString(),
        amount1: parseUnits(amount2, token2.decimals).toString(),
        useFullPrecision: true,
      });

      const signer = provider.getSigner();

      const mintOptions = {
        recipient: await signer.getAddress(),
        deadline: Math.floor(Date.now() / 1000) + 1800,
        slippageTolerance: new Percent(50, 10000),
      };

      const { calldata, value } = NonfungiblePositionManager.addCallParameters(
        position,
        mintOptions
      );

      console.log(1);

      const tx = await signer.sendTransaction({
        to: SEPOLIA_POSITION_MANAGER_ADDRESS,
        data: calldata,
        value: value,
        maxFeePerGas: ethers.utils.parseUnits("100", "gwei"),
      });

      console.log(await tx.wait());
    } catch (e) {
      console.error(e);
      setError(e);
    }

    setLoading(false);
  };

  return { createPosition, loading, error };
};
