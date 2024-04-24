import { Model } from 'sequelize';
import { Product, ProductInput } from '../types/Product';
import ProductModel from '../database/models/product.model';

const createProduct = async (productInput: ProductInput): Promise<Product> => {
  const product: Model<Product, ProductInput> = await ProductModel.create(productInput);
  return product.toJSON() as Product;
};

const listProducts = async (): Promise<Product[]> => {
  const products = await ProductModel.findAll();
  return products.map((product) => product.toJSON() as Product);
};

export default {
  createProduct,
  listProducts,
};