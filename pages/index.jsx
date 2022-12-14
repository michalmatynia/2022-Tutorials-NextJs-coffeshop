import Head from 'next/head';
import Image from 'next/image';

import { useEffect, useState, useContext } from 'react';
import styles from '../styles/Home.module.css';

import Banner from '../components/banner';
import Card from '../components/card';

import fetchCoffeeStores from '../lib/coffee-stores';

import useTrackLocation from '../hooks/use-track-location';
import { ACTION_TYPES, StoreContext } from '../store/store-context';

export async function getStaticProps() {
  const coffeeStores = await fetchCoffeeStores({});

  return {
    props: {
      coffeeStores,
    }, // will be passed to the page component as props
  };
}

export default function Home(props) {
  const { handleTrackLocation, locationErrorMsg, isFindingLocation } =
    useTrackLocation();

  const [coffeeStoresError, setError] = useState(null);

  const { dispatch, state } = useContext(StoreContext);

  const { coffeeStores, latLong } = state;

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `/api/getCoffeeStoresByLocation?latLong=${latLong}&limit=6`
      );

      const formattedCoffeeStores = await response.json();
      dispatch({
        type: ACTION_TYPES.SET_COFFEE_STORES,
        payload: {
          coffeeStores: formattedCoffeeStores,
        },
      });
    };

    setError('');
    // call the function
    if (latLong) {
      fetchData()
        // make sure to catch any error
        .catch((err) => {
          setError(err.message);
        });
    }
  }, [dispatch, latLong]);

  const handleOnBannerBtnClick = () => {
    handleTrackLocation();
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Coffee Connoisseur</title>
        <meta name="description" content="Allows you to discover coffee" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Banner
          buttonText={isFindingLocation ? 'Locating...' : 'View stores nearby'}
          handleOnClick={handleOnBannerBtnClick}
        />
        {locationErrorMsg && <p>Something went wrong: {locationErrorMsg} </p>}
        {coffeeStoresError && <p>Something went wrong: {coffeeStoresError} </p>}

        <div className={styles.heroImage}>
          <Image
            alt="image"
            src="/static/hero-image.png"
            width={700}
            height={400}
          />
        </div>
        {coffeeStores.length > 0 && (
          <div className={styles.sectionWrapper}>
            <h2 className={styles.heading2}>Stores Near Me</h2>
            <div className={styles.cardLayout}>
              {coffeeStores.map((coffeeStore) => (
                <Card
                  id={coffeeStore.fsq_id}
                  key={coffeeStore.fsq_id}
                  title={coffeeStore.name}
                  imgUrl={
                    coffeeStore.imgUrl ||
                    'https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80'
                  }
                  href={`/coffee-store/${coffeeStore.fsq_id}`}
                  className={styles.card}
                />
              ))}
            </div>
          </div>
        )}

        {props.coffeeStores.length > 0 && (
          <div className={styles.sectionWrapper}>
            <h2 className={styles.heading2}>Toronto stores</h2>
            <div className={styles.cardLayout}>
              {props.coffeeStores.map((coffeeStore) => (
                <Card
                  id={coffeeStore.fsq_id}
                  key={coffeeStore.fsq_id}
                  title={coffeeStore.name}
                  imgUrl={
                    coffeeStore.imgUrl ||
                    'https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80'
                  }
                  href={`/coffee-store/${coffeeStore.fsq_id}`}
                  className={styles.card}
                />
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
