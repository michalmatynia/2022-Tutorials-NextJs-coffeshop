import { useRouter } from "next/router";
import Link from "next/link";

import coffeeStoresData from "../../data/coffee-stores.json";

export async function getStaticProps(staticProps) {
  const { params } = staticProps;

  return {
    props: {
      coffeeStore: coffeeStoresData.find(
        (coffeeStore) => coffeeStore.id.toString() === params.id
      ),
    }, // will be passed to the page component as props
  };
}

export function getStaticPaths() {
  return {
    paths: [
      { params: { id: "0" } },
      {
        params: { id: "1" },
        // with i18n configured the locale for the path can be returned as well
        // locale: "en",
      },
    ],
    fallback: false,
  };
}

function CoffeStore(props) {
  const router = useRouter();

  return (
    <div>
      Coffe Store Page{router.query.id}
      <Link href="/">
        <button type="button">Back to home</button>
      </Link>
      <Link href="/coffee-store/dynamic">
        <button type="button">Go to page dynamic</button>
      </Link>
      <p>{props.coffeeStore.address}</p>
      <p>{props.coffeeStore.name}</p>
    </div>
  );
}

export default CoffeStore;
