import { ApolloClient, InMemoryCache } from '@apollo/client'

export const client = new ApolloClient({
  uri: 'http://146.190.68.0:8000/subgraphs/name/ianlapham/uniswap-v3',
  cache: new InMemoryCache(),
  ssrMode: true
})
