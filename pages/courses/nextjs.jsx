import { useEffect } from 'react';

function NextJS() {
  console.log('xaz');
  useEffect((props) => {
    // if (!router.isFallback) {
    console.log(props);
    // if (initialProps?.coffeeStore && isEmpty(initialProps.coffeeStore)) {
    //   if (coffeeStores.length > 0) {
    //     console.log(coffeeStores);
    //     console.log(initialProps?.coffeeStore);
    //     const coffeeStoreFromContext = coffeeStores.find(
    //       (each) => each.fsq_id.toString() === id
    //     );
    //     if (coffeeStoreFromContext) {
    //       // setCoffeeStore(coffeeStoreFromContext);
    //       // handleCreateCoffeeStore(coffeeStoreFromContext);
    //     }
    //   }
    // }
    // }
  }, []);

  return console.log('render'), (<div>Welcome to NextJS with ANkita </div>);
}

export default NextJS;
