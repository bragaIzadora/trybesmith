import { Request, Response } from 'express';
import LoginService from '../services/loginService';

export default {
  async loginController(req: Request, res: Response): Promise<void> {
    const { username, password } = req.body;

    if (!username || !password) {
      res.status(400).json({ message: '"username" and "password" are required' });
      return;
    }

    const token = await LoginService.login(username, password);

    if (!token) {
      res.status(401).json({ message: 'Username or password invalid' });
      return;
    }

    res.status(200).json({ token });
  },
};