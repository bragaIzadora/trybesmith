import express from 'express';
import productsController from '../controllers/productsController';

const router = express.Router();

router.post('/products', productsController.createProductController);
router.get('/products', productsController.listProductsController);

export default router;