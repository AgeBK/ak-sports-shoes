import Image from "next/image";
import { Suspense, use } from "react";
import { sentenceCase } from "../lib/utils";
import Link from "next/link";
import { DataProps } from "../lib/definitions";
import styles from "../page.module.css";

export default function Product({ promise }) {
  const products = use(promise);

  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        {products.map((val: DataProps, ind: number) => {
          const {
            id,
            name,
            category,
            subCategory,

            modelId,
          } = val;
          const link = `/${category}/${subCategory}/${id}`.toLowerCase();

          return (
            <li className={styles.listItem} key={ind}>
              <Link href={link}>
                <h3 className={styles.name}>{sentenceCase(name)}</h3>
              </Link>
              <div>{modelId}</div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
