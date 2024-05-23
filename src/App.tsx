import "./App.css";
import EthereumProvider from "./providers/EthereumProvider";
import QueryProvider from "./providers/QueryProvider";
import ConnectKitProvider from "./providers/ConnectKitProvider";
import { Theme } from "@radix-ui/themes";
import CreatePool from "./components/CreatePool";
import "@radix-ui/themes/styles.css";
import Swap from "./components/Swap";
import ApolloClient from "./providers/ApolloPrvider";

function App() {
  return (
    <>
      <EthereumProvider>
        <QueryProvider>
          <ConnectKitProvider>
            <ApolloClient>
              <Theme>
                <CreatePool />
                <Swap />
              </Theme>
            </ApolloClient>
          </ConnectKitProvider>
        </QueryProvider>
      </EthereumProvider>
    </>
  );
}

export default App;
