import styles from "@/app/css/Price.module.css";
import { currency } from "../lib/utils";

export default function Price({
  price,
  priceBeforeDiscount,
  percentage,
  css = "",
}: {
  price: number;
  priceBeforeDiscount: number;
  percentage: number;
  css?: string;
}) {
  //   console.log(percentage);

  console.log("css");
  console.log(css);

  const formatedPrice = currency(price);

  const p = <strong className={styles.currentPrice}>{formatedPrice}</strong>;

  const pbd = (
    <>
      <strong className={styles.currentPrice}>{formatedPrice}</strong>
      <br />
      <s className={styles.was}>Was {currency(priceBeforeDiscount)}</s>
      <span className={styles.percentage}>{percentage}% off</span>
      <br />
    </>
  );

  return (
    <div className={styles.container}>
      <div className={css ? styles.product : ""}>{percentage ? pbd : p}</div>
    </div>
  );
}
