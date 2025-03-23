// data definitions
export type DataProps = {
  id: number;
  modelId: number;
  name: string;
  brand: string;
  category: string;
  subCategory: string;
  available: boolean;
  catchLine: string;
  colour: string | null;
  components: string[];
  designFor: string;
  gender: string[];
  productNature: string;
  price: number;
  priceBeforeDiscount: number;
  percentage: number;
  size: number[];
  sport: string[];
};

export type AddToCartProps = {
  id: number;
  modelId: number;
  category: string;
  subCategory: string;
  name: string;
  brand: string;
  price: number;
  priceBeforeDiscount: number;
  percentage: number;
  shoeSize: number;
  setChooseSize?: (chooseSize: string) => void;
  setShoeSize?: (errMsg: string) => void;
  qty: number;
};

export type CartItemProps = {
  cartItems: AddToCartProps;
};

export interface CartProps {
  cart: AddToCartProps[];
}

export type CrumbProps = {
  path: string;
  name: string;
};

export type ModalProps = {
  setShowModal: (show: boolean) => void;
};

export type KeyStringProps = { [key: string]: string };

// before item in cart

export type ButtonProps = {
  children?: React.ReactNode;
  onClick?: (e: React.MouseEvent<Element, MouseEvent>) => void;
  css: string;
  disabled?: boolean;
  type?: "submit" | "reset" | "button" | undefined;
};

export type ImgProps = {
  imgSrc: string;
  imgAlt: string;
  imgWidth: number;
  imgHeight: number;
  imgPriority?: boolean;
};

export type ImgFillProps = {
  imgSrc: string;
  imgAlt: string;
  imgStyle: string;
  imgPriority?: boolean;
};
