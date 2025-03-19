import { CartItemProps } from "../lib/definitions";
import { useDispatch } from "react-redux";
import { increment } from "../slices/cartSlice";
import Button from "./Button";
import styles from "@/app/css/AddToCart.module.css";

export default function AddToCart({ cartItems }: CartItemProps) {
  const dispatch = useDispatch();
  const { shoeSize, setChooseSize } = cartItems;

  const handleClick = () => {
    if (shoeSize === 0 && setChooseSize) {
      setChooseSize("Please choose a shoe size");
    } else {
      dispatch(increment(cartItems));
    }
  };

  return (
    <div className={styles.addCartContainer}>
      <Button css="addCart" onClick={handleClick}>
        Add to cart
      </Button>
    </div>
  );
}
