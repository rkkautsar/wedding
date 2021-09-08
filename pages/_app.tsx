import Head from "next/head";
import { useEffect } from "react";
import "tailwindcss/tailwind.css";
import "./style.css";

function setViewHeight() {
  const vh = window.innerHeight * 0.01;
  const vw = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
  document.documentElement.style.setProperty("--vw", `${vw}px`);
}

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    setViewHeight();
    window.addEventListener("resize", setViewHeight);
    return () => window.removeEventListener("resize", setViewHeight);
  }, []);

  return (
    <>
      <Head>
        <script async src="https://cdn.splitbee.io/sb.js"></script>
        <title>Faridah & Rakha</title>
        <meta
          name="description"
          content="Faridah &amp; Rakha is getting married soon!"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#ccdbed" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
