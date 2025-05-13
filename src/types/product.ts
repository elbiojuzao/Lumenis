export interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  fullDescription: string;
  imageSrc?: string;
  category?: string;
  stock: number;
  features?: string[];
  active: boolean;
  createdAt?: Date;
}