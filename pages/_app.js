import "../styles/globals.css";
// import { ThirdwebWeb3Provider } from "@3rdweb/hooks";
import Head from "next/head";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
/**
 * The chain ID 4 represents the Rinkeby network
 * The `injected` connector is a web3 connection method used by Metamask
 */
const supportedChainIds = [1,4];
const connectors = {
  injected: {},
};

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>DBC NFT Drop!</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
          crossorigin="anonymous"
        />
        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p"
          crossorigin="anonymous"
        ></script>
      </Head>
      <ThirdwebProvider desiredChainId={ChainId.Rinkeby}>
        <Component {...pageProps} />
      </ThirdwebProvider>
    </>
  );
}

export default MyApp;
