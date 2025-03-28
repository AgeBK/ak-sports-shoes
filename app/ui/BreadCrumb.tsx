"use client";

import Link from "next/link";
import { sentenceCase } from "../lib/utils";
import { usePathname } from "next/navigation";
import { CrumbProps } from "../lib/definitions";
import styles from "@/app/css/BreadCrumb.module.css";

const Crumb = ({ path, name }: CrumbProps) => (
  <li className={`${styles.crumb} ${styles[name.toLowerCase()]}`} key={name}>
    <div className={styles.crumbs}>
      <ul>
        <li>
          <Link href={`/${path}`}>
            <span className={styles.text}>{name}</span>
          </Link>
        </li>
      </ul>
    </div>
  </li>
);

export default function BreadCrumb(): JSX.Element | null {
  const paths: string = usePathname();

  if (paths !== "/") {
    const pathNames: string[] = paths.split("/").filter((path) => path);
    const pathItems: { name: string; path: string }[] = pathNames.map(
      (path, i) => ({
        name: sentenceCase(path),
        path: pathNames.slice(0, i + 1).join("/"),
      })
    );

    const html: JSX.Element[] = pathItems.map(({ name, path }) => (
      <Crumb path={path} name={name} key={name} />
    ));

    return (
      <ul className={styles.breadCrumb}>
        <Crumb path="/" name="Home" key="home" />
        {html}
      </ul>
    );
  } else {
    return (
      <div className={styles.banner}>
        Free delivery on all orders over $150<span>(conditions apply)</span>
      </div>
    );
  }

  return null;
}
