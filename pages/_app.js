import Head from "next/head";
import "../styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Kids Learning</title>

        <link rel="icon" href="/icon.png" />

        <link
          rel="apple-touch-icon"
          href="/icon.png"
        />
      </Head>

      <Component {...pageProps} />
    </>
  );
}
