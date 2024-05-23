import { Fee } from "@/config/fees";
import { positionManagerAbi } from "@/abi/positionManager.abi";
import { SEPOLIA_POSITION_MANAGER_ADDRESS } from "@/config/addreses";
import { config } from "@/config/wagmi";
import { getOrderedTokensWithValue } from "@/utils/getOrderedTokens";
import { Token } from "@atleta-chain/sdk-core";
import { encodeSqrtRatioX96 } from "@atleta-chain/v3-sdk";
import {
  simulateContract,
  waitForTransactionReceipt,
  writeContract,
} from "wagmi/actions";
import { parseUnits } from "viem";

type Interface_initPool = {
  amount1: {
    token: Token;
    value: string;
  };
  amount2: {
    token: Token;
    value: string;
  };
  fee: Fee;
};

export const initPool = async ({ amount1, amount2, fee }: Interface_initPool) => {
  const [tokenA, tokenB] = getOrderedTokensWithValue([amount1, amount2]);

  const sqrt = encodeSqrtRatioX96(
    parseUnits(tokenA.value, tokenA.token.decimals).toString(),
    parseUnits(tokenB.value, tokenB.token.decimals).toString()
  );

  const { request: createRequest } = await simulateContract(config, {
    address: SEPOLIA_POSITION_MANAGER_ADDRESS,
    abi: positionManagerAbi,
    functionName: "createAndInitializePoolIfNecessary",
    args: [
      tokenA.token.address as `0x${string}`,
      tokenB.token.address as `0x${string}`,
      fee,
      BigInt(sqrt.toString()),
    ],
  });

  const hashCreate = await writeContract(config, createRequest);

  await waitForTransactionReceipt(config, { hash: hashCreate });
};
