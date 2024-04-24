import { Request, Response } from 'express';
import UserService from '../services/userServices';

export default {
  async listUsersController(req: Request, res: Response): Promise<void> {
    const users = await UserService.listUsers();
    res.status(200).json(users);
  },
};