import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'

import { Theme } from '@radix-ui/themes'
import '@radix-ui/themes/styles.css'
import EthereumProvider from '@/providers/EthereumProvider'
import QueryProvider from '@/providers/QueryProvider'
import { ConnectKitProvider } from 'connectkit'
import ApolloClient from '@/providers/ApolloPrvider'
import Header from '@/components/Header'

export const Route = createRootRoute({
  component: () => (
    <>
      <EthereumProvider>
        <QueryProvider>
          <ConnectKitProvider>
            <ApolloClient>
              <Theme>
                <Header />
                <Outlet />
              </Theme>
            </ApolloClient>
          </ConnectKitProvider>
        </QueryProvider>
      </EthereumProvider>

      <TanStackRouterDevtools />
    </>
  )
})
