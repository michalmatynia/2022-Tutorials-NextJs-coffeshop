import React from "react";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <footer>
        <p>2022 Michal</p>
      </footer>
    </>
  );
}

export default MyApp;
