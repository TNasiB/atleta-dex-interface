import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri: "https://api.studio.thegraph.com/query/67019/uniswap-fork/version/latest",
  cache: new InMemoryCache(),
  ssrMode: true,
});
