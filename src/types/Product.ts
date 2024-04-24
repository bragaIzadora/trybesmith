export type Product = {
  id: number;
  name: string;
  price: string;
  userId: number;
};

export type ProductInput = Omit<Product, 'id'>;