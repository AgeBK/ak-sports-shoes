import { fetchCategoryPageData } from "../../lib/utils";
import { Suspense } from "react";
import Products from "../../ui/products";

export default function Home() {
  const promise = fetchCategoryPageData();

  return (
    <Suspense fallback={<p>⌛Downloading message...</p>}>
      <Products promise={promise} />
    </Suspense>
  );
}
