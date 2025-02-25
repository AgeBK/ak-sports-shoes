import { navSubItems } from "@/app/lib/appData.json";
import styles from "@/app/css/Nav.module.css";
import Link from "next/link";

export default function Nav() {
  return (
    <nav className={styles.container}>
      <ul className={styles.nav}>
        {Object.entries(navSubItems).map(([key, value], ind) => {
          const k = key.toLowerCase();
          console.log(k);

          return (
            <li className={styles.navItem} key={ind}>
              <Link href={`/${k}`}>{key}</Link>
              <ul className={`${styles.subNav} ${styles[k]}`}>
                {value.map((val) => (
                  <li key={val + key}>
                    <Link href={`/${k}/${val.toLowerCase()}`}>{val}</Link>
                  </li>
                ))}
              </ul>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
