/* eslint-disable no-unused-vars */
// Setup: npm install alchemy-sdk
import { Alchemy, Network } from "alchemy-sdk";

const settings = {
  apiKey: "8xYVGALXojuerzv1a9KbZXsIfWo3I3QN",
  network: Network.ETH_SEPOLIA,
};
export const alchemyClient = new Alchemy(settings);
