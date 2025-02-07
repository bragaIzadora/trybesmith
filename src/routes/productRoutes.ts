import express from 'express';
import productsController from '../controllers/productsController';
import { validateName, validatePrice, valiUserId } from '../middlewares/validateProduct';

const router = express.Router();

router.post('/products', validateName, validatePrice, valiUserId, productsController
  .createProductController);
router.get('/products', productsController.listProductsController);

export default router;