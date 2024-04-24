import { Request, Response } from 'express';
import ProductService from '../services/productsService';
import { ProductInput } from '../types/Product';

const createProductController = async (req: Request, res: Response): Promise<void> => {
  try {
    const productInput: ProductInput = req.body;
    const product = await ProductService.createProduct(productInput);
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error creating product', error });
  }
};

const listProductsController = async (req: Request, res: Response): Promise<void> => {
  try {
    const products = await ProductService.listProducts();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error listing products', error });
  }
};

export default {
  createProductController,
  listProductsController,
};