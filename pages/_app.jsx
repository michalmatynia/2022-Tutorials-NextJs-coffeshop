import { useEffect } from 'react';
import '../styles/globals.css';
import StoreProvider from '../store/store-context';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    console.log('er');
  }, []);

  return (
    <StoreProvider>
      <Component {...pageProps} />
    </StoreProvider>
  );
}

export default MyApp;
