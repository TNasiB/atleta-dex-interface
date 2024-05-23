import { getDefaultConfig } from "connectkit";
import { createConfig, http } from "wagmi";
import { sepolia } from "wagmi/chains";

export const config = createConfig(
  getDefaultConfig({
    chains: [sepolia],
    ssr: true,
    transports: {
      [sepolia.id]: http(
        "https://eth-sepolia.g.alchemy.com/v2/0IKzva2Wy9boNMUTnLfFNzbnaI8WnoZb"
      ),
    },
    walletConnectProjectId: "1effc4f9fd017d11f394606d6103bfff",
    appName: "Atleta Dex",
  })
);
