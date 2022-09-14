import { useRouter } from "next/router";
import Head from "next/head";

function DynamicRoute() {
  const router = useRouter();
  const { query } = router;

  return (
    <div>
      <Head>
        <title>{query.dynamic}</title>
      </Head>
      Dynamic My page {query.dynamic}
    </div>
  );
}

export default DynamicRoute;
