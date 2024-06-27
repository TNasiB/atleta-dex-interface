import { getDefaultConfig } from 'connectkit'
import { defineChain } from 'viem'
import { createConfig, http } from 'wagmi'
import { sepolia } from 'wagmi/chains'

export const ATLETA_OPYMPIA_CHAIN_ID = 2340

const OLYMPIA_RPC_URL = 'https://testnet-rpc.atleta.network:9944'

export const olympia = defineChain({
  id: ATLETA_OPYMPIA_CHAIN_ID,
  name: 'Atleta Olympia',
  nativeCurrency: { decimals: 18, name: 'ATLA', symbol: 'ATLA' },
  rpcUrls: {
    default: { http: [OLYMPIA_RPC_URL] }
  },
  testnet: true
})

export const config = createConfig(
  getDefaultConfig({
    chains: [
      // sepolia

      olympia
    ],
    ssr: true,
    transports: {
      // [sepolia.id]: http(
      //   'https://eth-sepolia.g.alchemy.com/v2/0IKzva2Wy9boNMUTnLfFNzbnaI8WnoZb'
      // ),
      [olympia.id]: http(OLYMPIA_RPC_URL)
    },
    walletConnectProjectId: '1effc4f9fd017d11f394606d6103bfff',
    appName: 'Atleta Dex'
  })
)
