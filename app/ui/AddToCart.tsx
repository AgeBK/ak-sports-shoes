import { AddToCartProps } from "../lib/definitions";
import Button from "./Button";

export default function AddToCart({
  id,
  name,
  brand,
  price,
  qty,
}: AddToCartProps) {
  const handleClick = () => {
    console.log("addToCart");
    const strCart = localStorage.getItem("AKShoesCart");
    console.log(strCart);

    if (strCart) {
      // cart exists
      const cart = JSON.parse(strCart);
      console.log(cart);
      const itemInCart = cart.find((val: AddToCartProps) => {
        const cartId = val.id;
        return cartId === id ? true : false;
      });

      if (itemInCart) {
        console.log("itemInCart");
        // if item exists in cart, increase qty
        itemInCart.qty++;
        localStorage.setItem("AKShoesCart", JSON.stringify(cart));
      } else {
        // add new item to existing cart
        const newItem = { id, name, brand, price, qty };
        const newCart = [...cart, newItem];
        localStorage.setItem("AKShoesCart", JSON.stringify(newCart));
      }
    } else {
      // no cart exists, create
      const qty = 1;
      localStorage.setItem(
        "AKShoesCart",
        JSON.stringify([{ id, name, brand, price, qty }])
      );
    }
  };

  return (
    <Button css="cart" onClick={handleClick}>
      Add to cart
      {/* <CartImage itemAdded={isAdded} />
      <span>{id === itemId ? "Item Added" : "Add to cart"}</span> */}
    </Button>
  );
}
