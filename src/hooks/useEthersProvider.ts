import { providers } from 'ethers'
import { useMemo } from 'react'
import type { Chain, Client, Transport } from 'viem'
import { Config, useClient } from 'wagmi'

export function clientToProvider(client: Client<Transport, Chain>) {
  const { chain, transport } = client
  const network = {
    chainId: chain.id,
    name: chain.name,
    ensAddress: chain.contracts?.ensRegistry?.address
  }
  if (transport.type === 'fallback') {
    return new providers.FallbackProvider(
      (transport.transports as ReturnType<Transport>[]).map(
        ({ value }) => new providers.JsonRpcProvider(value?.url, network)
      )
    )
  }
  return new providers.JsonRpcProvider(transport.url, network)
}

export function useEthersProvider({ chainId }: { chainId?: number | undefined } = {}) {
  const client = useClient<Config>({ chainId })

  return useMemo(() => client && clientToProvider(client), [client])
}
