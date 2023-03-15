import { AppProps } from "next/app";
import { NFTStorage } from "nft.storage";
import { createContext, FC, Suspense, useContext } from "react";
import { WagmiConfig } from "wagmi";
import Layout from "../components/Layout";
import { EditorProvider } from "../contexts/editor";
import { MarketplaceProvider } from "../contexts/marketplace";
import { NFTStorageClient } from "../lib/utils/nft-storage";
import { wagmiClient } from "../lib/utils/wagmi-client";
import "../styles/globals.css";

const NFTStorageContext = createContext<{ client: NFTStorage } | undefined>(
  undefined
);
export const useNFTStorage = () => useContext(NFTStorageContext)!;

const App: FC<AppProps> = function ({ Component, pageProps }): JSX.Element {
  return (
    <Suspense
      fallback={<div className="flex items-center justify-center"></div>}
    >
      <NFTStorageContext.Provider value={{ client: NFTStorageClient }}>
        <WagmiConfig client={wagmiClient}>
          <EditorProvider>
            <MarketplaceProvider>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </MarketplaceProvider>
          </EditorProvider>
        </WagmiConfig>
      </NFTStorageContext.Provider>
    </Suspense>
  );
};

export default App;
