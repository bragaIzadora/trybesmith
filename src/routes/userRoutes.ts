import express from 'express';
import UsersController from '../controllers/userController';

const router = express.Router();

router.get('/users', UsersController.listUsersController);

export default router;