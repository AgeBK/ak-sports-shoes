import { Suspense, use } from "react";
import { fetchCategoryPageData } from "@/app/lib/utils";
import { DataProps } from "@/app/lib/definitions";
import { sentenceCase } from "@/app/lib/utils";
import appData from "@/app/lib/appData.json";
import Products from "@/app/ui/Products";
import Loading from "@/app/ui/loading";
import styles from "@/app/css/Page.module.css";

export default function Page({
  params,
}: {
  params: Promise<{ urlCategory: string; urlSubCategory: string; id: string }>;
}) {
  const { urlCategory, urlSubCategory } = use(params);
  const { categoryPageInfo } = appData;
  const cat = urlCategory || "";
  const subCat = urlSubCategory || "";
  const prodHdr = `${sentenceCase(cat)} ${sentenceCase(subCat)}`;
  const prodInfo = categoryPageInfo.replace("[replace]", prodHdr);
  const promise: Promise<DataProps[]> = fetchCategoryPageData(cat, subCat); // suspense handles await

  return (
    <article>
      <h2 className={styles.infoBlock}>{prodHdr}</h2>
      <div>{prodInfo}</div>
      <Suspense fallback={<Loading />}>
        <Products promise={promise} />
      </Suspense>
    </article>
  );
}
