import { Dispatch } from "react";

export interface Root {
  products: ProductT[];
  total: number;
  skip: number;
  limit: number;
}

export interface ProductT {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  dimensions: Dimensions;
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: Review[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: Meta;
  images: string[];
  thumbnail: string;
}

export interface Dimensions {
  width: number;
  height: number;
  depth: number;
}

export interface Review {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}

export interface Meta {
  createdAt: string;
  updatedAt: string;
  barcode: string;
  qrCode: string;
}

export type UserT = {
  userName?: string;
  id: string;
  email: string;
};

export type ModalLoginProps = {
  showLogin: boolean;
  handleLoginClose: () => void;
};

export type ModalSignUpProps = {
  showSignUp: boolean;
  handleSignUpClose: () => void;
};

export type ModalAlertProps = {
  showAlert: boolean;
  setShowAlert: Dispatch<React.SetStateAction<boolean>>;
  alertText: string;
};
