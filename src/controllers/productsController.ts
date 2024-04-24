import { Request, Response } from 'express';
import ProductService from '../services/productsService';
import { ProductInput } from '../types/Product';

const createProductController = async (req: Request, res: Response): Promise<void> => {
  const productInput: ProductInput = req.body;
  const product = await ProductService.createProduct(productInput);
  res.status(201).json(product);
};

const listProductsController = async (req: Request, res: Response): Promise<void> => {
  const products = await ProductService.listProducts();
  res.status(200).json(products);
};

export default {
  createProductController,
  listProductsController,
};