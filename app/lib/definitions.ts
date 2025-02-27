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

export type CrumbProps = {
  path: string;
  name: string;
};

export type ModalProps = {
  setShowModal: (show: boolean) => void;
};

// export type CategoryParamsProps = {
//   params: { urlCategory: string; urlSubCategory: string };
// };

// before item in cart

export type AddToCartProps = {
  id: string;
  name: string;
  brand: string;
  price: number;
  quantity: number;
};

export type CartItemProps = {
  name: string;
  brand: string;
  shortName: string;
  price: number;
  quantity: number;
  deal?: {
    priceTwoFor?: number;
    priceTenFor?: number;
    pricePercentOff?: number;
  };
  promotionDiscountCode?: string;
  dealPrice?: number;
};

// item in cart
export type CartProps = {
  [id: string]: CartItemProps;
};

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
  // imageStyle: keyof typeof styles;
  imgStyle: string;
  imgPriority?: boolean;
};
