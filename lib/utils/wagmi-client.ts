import { goerli, localhost, polygon, sepolia } from "@wagmi/chains";
import { configureChains, createClient } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

const apiKey = process.env["NEXT_PUBLIC_ALCHEMY_API_KEY"]!;
const { chains, provider } = configureChains(
  [localhost, polygon, goerli, sepolia],
  [alchemyProvider({ apiKey }), publicProvider()]
);

export const metamaskConnector = new MetaMaskConnector({ chains });

export const wagmiClient = createClient({
  autoConnect: false,
  connectors: [new InjectedConnector({ chains }), metamaskConnector],
  provider,
});
