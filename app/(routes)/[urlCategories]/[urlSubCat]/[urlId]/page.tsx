import { fetchCategoryPageData } from "@/app/lib/utils";
import { Suspense, use } from "react";
import Product from "@/app/ui/product";
import { fetchProductById } from "@/app/lib/data";

export default function Page({ params }) {
  const { urlId } = use(params);
  // console.log(urlId);

  const promise = fetchProductById(urlId);

  return (
    <Suspense fallback={<p>⌛Downloading message...</p>}>
      <Product promise={promise} />
    </Suspense>
  );
}
