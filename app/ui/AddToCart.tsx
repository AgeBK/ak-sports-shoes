import { AddToCartProps } from "../lib/definitions";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { selectCart, increment } from "../slices/cartSlice";
import Button from "./Button";
import styles from "@/app/css/AddToCart.module.css";

type CartItemProps = {
  cartItems: AddToCartProps;
  // setShoeSize: () => void;
};

export default function AddToCart({ cartItems }: CartItemProps) {
  let cart = useSelector(selectCart);
  const dispatch = useDispatch();

  const { shoeSize, setChooseSize } = cartItems;

  const handleClick = () => {
    console.log("handleClick");

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
        {/* <CartImage itemAdded={isAdded} />
      <span>{id === itemId ? "Item Added" : "Add to cart"}</span> */}
      </Button>
    </div>
  );
}
