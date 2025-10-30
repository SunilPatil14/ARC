import React from "react";
import ReactDOM from "react-dom/client";
import { WagmiProvider, createConfig, http } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  RainbowKitProvider,
  getDefaultWallets,
  darkTheme,
} from "@rainbow-me/rainbowkit";
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  base,
  sepolia,
} from "wagmi/chains";
import { arcTestnet } from "./chains/arcTestnet";
import App from "./App";
import "./index.css";
import "@rainbow-me/rainbowkit/styles.css";

// ✅ Wagmi + RainbowKit Setup
const { connectors } = getDefaultWallets({
  appName: "Arc Network dApp",
  projectId: "4056fb413aa26cf213b04e32e8d008d3", // your WalletConnect Project ID
});

const config = createConfig({
  chains: [arcTestnet, mainnet, polygon, optimism, arbitrum, base, sepolia],
  transports: {
    [arcTestnet.id]: http("https://rpc.testnet.arc.network"),
    [mainnet.id]: http(),
    [polygon.id]: http(),
    [optimism.id]: http(),
    [arbitrum.id]: http(),
    [base.id]: http(),
    [sepolia.id]: http(),
  },
  connectors, // ✅ add this line to enable multiple wallets!
  multiInjectedProviderDiscovery: true,
});

const queryClient = new QueryClient();

// ✅ Render
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          theme={darkTheme({
            accentColor: "#00bcd4",
            accentColorForeground: "white",
            borderRadius: "large",
            overlayBlur: "small",
          })}
          initialChain={arcTestnet}
        >
          <App />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>
);
