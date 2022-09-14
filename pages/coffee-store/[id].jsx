import { useRouter } from "next/router";
import Link from "next/link";

function CoffeStore() {
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
    </div>
  );
}

export default CoffeStore;
