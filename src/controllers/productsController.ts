import { Request, Response } from 'express';
import ProductService from '../services/productsService';
import { ProductInput } from '../types/Product';

async function createProductController(req: Request, res: Response): Promise<void> {
  try {
    const productInput: ProductInput = req.body;
    const product = await ProductService.createProduct(productInput);
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error creating product', error });
  }
}

export default createProductController;