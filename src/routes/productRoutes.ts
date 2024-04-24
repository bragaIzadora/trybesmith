import express from 'express';
import createProductController from '../controllers/productsController';

const router = express.Router();

router.post('/products', createProductController);

export default router;