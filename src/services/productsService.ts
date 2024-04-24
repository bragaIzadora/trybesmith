import { Model } from 'sequelize';
import { Product, ProductInput } from '../types/Product';
import ProductModel from '../database/models/product.model';

export default class ProductService {
  static async createProduct(productInput: ProductInput): Promise<Product> {
    const product: Model<Product, ProductInput> = await ProductModel.create(productInput);
    return product.toJSON() as Product;
  }
}