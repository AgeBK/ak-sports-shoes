import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "@/app/css/BreadCrumb.module.css";

export default function BreadCrumb() {
  const path = usePathname();
  const pathArr = path.substring(1).split("/");
  const trailArr: string[] = [];

  return (
    <ul className={styles.container}>
      {pathArr.map((val) => {
        console.log("PathArr");
        console.log(val);

        trailArr.push(val);
        return (
          <li key={val}>
            {<Link href={`/${trailArr.join("/")}`}>{val}</Link>}
          </li>
        );
      })}
    </ul>
  );
}
