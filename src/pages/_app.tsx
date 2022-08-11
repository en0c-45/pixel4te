import { Spinner } from "flowbite-react";
import { AppProps } from "next/app";
import { FC, Suspense } from "react";
import Layout from "../components/Layout";
import "../styles/globals.css";

const App: FC<AppProps> = function ({ Component, pageProps }): JSX.Element {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center">
          <Spinner size="lg" /> Loading..
        </div>
      }
    >
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Suspense>
  );
};

export default App;
