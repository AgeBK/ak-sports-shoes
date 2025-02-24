import { currency } from "../lib/utils";
import styles from "@/app/css/Price.module.css";

type PriceProps = {
  price: number;
  priceBeforeDiscount: number;
  percentage: number;
  css?: string;
};

export default function Price({
  price,
  priceBeforeDiscount,
  percentage,
  css = "",
}: PriceProps) {
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
