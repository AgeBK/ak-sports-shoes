import { Suspense, use } from "react";
import { fetchProductById } from "@/app/lib/data";
import { DataProps } from "@/app/lib/definitions";
import Product from "@/app/ui/Product";
import Loading from "@/app/ui/loading";

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
    <Suspense fallback={<Loading />}>
      <article>
        <Product promise={promise} />
      </article>
    </Suspense>
  );
}
