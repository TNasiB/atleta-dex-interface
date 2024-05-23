'use client'

import { ApolloProvider } from '@apollo/client'

import { client } from '@/services/gql'
const ApolloClient = ({ children }: { children: React.ReactNode }) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>
}

export default ApolloClient
