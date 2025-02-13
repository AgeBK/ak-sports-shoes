import { fetchCategoryPageData } from "./lib/utils";
import { Suspense } from "react";
import Products from "./ui/products";

export default async function Home() {
  const promise = fetchCategoryPageData();

  return (
    <Suspense fallback={<p>⌛Downloading message...</p>}>
      <h1>HOME</h1>
      <Products promise={promise} />
    </Suspense>
  );
}
