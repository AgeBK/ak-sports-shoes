import { Suspense, use } from "react";
import Product from "@/app/ui/Product";
import { fetchProductById } from "@/app/lib/data";
import { DataProps } from "@/app/lib/definitions";

export default function Page({
  params,
}: {
  params: Promise<{
    urlCategory: string;
    urlSubCategory: string;
    urlId: string;
  }>;
}) {
  const { urlId } = use(params);
  const promise: Promise<DataProps> = fetchProductById(urlId); // suspense handles await

  return (
    <Suspense fallback={<p>⌛Downloading message...</p>}>
      <article>
        <Product promise={promise} />
      </article>
    </Suspense>
  );
}
