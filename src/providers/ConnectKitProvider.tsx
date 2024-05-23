'use client'

import { ConnectKitProvider as ConnectKitProviderLib } from 'connectkit'

const ConnectKitProvider = (props: { children: React.ReactNode }) => {
  return <ConnectKitProviderLib>{props.children}</ConnectKitProviderLib>
}

export default ConnectKitProvider
