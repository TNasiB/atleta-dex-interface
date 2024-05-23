'use client'

import { WagmiProvider } from 'wagmi'

import { config } from '@/config/wagmi'

const EthereumProvider = ({ children }: { children: React.ReactNode }) => {
  return <WagmiProvider config={config}>{children}</WagmiProvider>
}

export default EthereumProvider
