import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';

import cls from 'classnames';
// import coffeeStoresData from '../../data/coffee-stores.json';
import { useEffect, useState, useContext, useCallback } from 'react';
import useSWR from 'swr';
import fetchCoffeeStores from '../../lib/coffee-stores';

import { StoreContext } from '../../store/store-context';

import styles from '../../styles/coffee-store.module.css';

import { isEmpty } from '../../utils';

export async function getStaticProps(staticProps) {
  const { params } = staticProps;

  let latLong;

  const coffeeStores = await fetchCoffeeStores({ latLong }); // Foursquare request

  const findCoffeeStoreById = coffeeStores.find(
    (coffeeStore) => coffeeStore.fsq_id.toString() === params.id
  );

  return {
    props: {
      coffeeStore: findCoffeeStoreById || {},
    }, // will be passed to the page component as props
  };
}

export async function getStaticPaths() {
  const coffeeStores = await fetchCoffeeStores({});

  const paths = coffeeStores.map((coffeeStore) => ({
    params: {
      id: coffeeStore.fsq_id.toString(),
    },
  }));

  return {
    paths,
    fallback: true,
  };
}

function CoffeeStore(initialProps) {
  const router = useRouter();
  const { id } = router.query;

  const [coffeeStore, setCoffeeStore] = useState(initialProps.coffeeStore);
  const [votingCount, setVotingCount] = useState(0);
  const { data, error } = useSWR(`/api/getCoffeeStoreById?id=${id}`);

  useEffect(() => {
    if (data && data.length > 0) {
      setCoffeeStore(data[0]);
      setVotingCount(data[0].voting);
    }
  }, [data]);

  const {
    state: { coffeeStores },
  } = useContext(StoreContext);

  const handleCreateCoffeeStore = useCallback(
    async (myData) => {
      try {
        const { name, imgUrl, neighbourhood, address } = myData;
        const response = await fetch('/api/createCoffeeStore', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id,
            name,
            voting: 0,
            imgUrl,
            neighbourhood: neighbourhood || '',
            address: address || '',
          }),
        });

        const dbCoffeeStore = response.json();
        return dbCoffeeStore;
      } catch (err) {
        console.log('Error creating store', err);
        return err;
      }
    },
    [id]
  );

  useEffect(() => {
    if (initialProps?.coffeeStore && isEmpty(initialProps.coffeeStore)) {
      if (coffeeStores.length > 0) {
        const coffeeStoreFromContext = coffeeStores.find(
          (each) => each.fsq_id.toString() === id
        );
        if (coffeeStoreFromContext) {
          console.log(coffeeStoreFromContext);

          setCoffeeStore(coffeeStoreFromContext);
          handleCreateCoffeeStore(coffeeStoreFromContext);
        }
      }
    } else {
      // SSG
      handleCreateCoffeeStore(initialProps.coffeeStore);
    }
  }, [
    coffeeStores,
    handleCreateCoffeeStore,
    id,
    initialProps.coffeeStore,
    router.isFallback,
  ]);

  if (router.isFallback) {
    console.log('Loading...');
    return <div>Loading...</div>;
  }

  const { location, name, distance, imgUrl } = coffeeStore;

  const handleUpvoteButton = () => {
    const count = votingCount + 1;
    setVotingCount(count);
  };

  if (error) {
    return <div>Something went wrong retrieving Coffee Store Page</div>;
  }

  return (
    <div className={styles.layout}>
      <Head>
        <title>{name}</title>
      </Head>
      {Object.keys(coffeeStore).length > 0 && (
        <div className={styles.container}>
          <div className={styles.col1}>
            <div className={styles.backToHomeLink}>
              <Link href="/">
                <button type="button">Back to home</button>
              </Link>
            </div>
            <div className={styles.nameWrapper}>
              <h1 className={styles.name}>{name}</h1>
            </div>
            <Image
              src={
                imgUrl ||
                'https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80'
              }
              width={600}
              height={360}
              className={styles.storeImg}
              alt={name}
            />
          </div>

          <div className={cls('glass', styles.col2)}>
            <div className={styles.iconWrapper}>
              <Image src="/static/icons/places.svg" width="24" height="24" />
              <p className={styles.text}>{location.address}</p>
            </div>
            {distance && (
              <div className={styles.iconWrapper}>
                <Image src="/static/icons/nearMe.svg" width="24" height="24" />
                <p className={styles.text}>{distance} m</p>
              </div>
            )}
            <div className={styles.iconWrapper}>
              <Image src="/static/icons/star.svg" width="24" height="24" />
              <p className={styles.text}>{votingCount}</p>
            </div>
            <button
              type="button"
              className={styles.upvoteButton}
              onClick={handleUpvoteButton}
            >
              Up Vote!
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CoffeeStore;
