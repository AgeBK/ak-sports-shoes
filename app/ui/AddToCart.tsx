import { useDispatch } from "react-redux";
import { CartItemProps } from "../lib/definitions";
import { increment } from "../slices/cartSlice";
import Button from "./Button";

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
    <Button css="addCart" onClick={handleClick}>
      Add to cart
    </Button>
  );
}
