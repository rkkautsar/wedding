import Head from "next/head";
import "tailwindcss/tailwind.css";
import "./style.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <script async src="https://cdn.splitbee.io/sb.js"></script>
        <title>Faridah & Rakha</title>
        <meta
          name="description"
          content="Faridah &amp; Rakha is getting married soon!"
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
