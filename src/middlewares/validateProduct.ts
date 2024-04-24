import { Request, Response, NextFunction } from 'express';
import UserModel from '../database/models/user.model';

export const validateName = (req: Request, res: Response, next: NextFunction): void => {
  const { name } = req.body;

  if (!name) {
    res.status(400).json({ message: '"name" is required' });
    return;
  }

  if (typeof name !== 'string') {
    res.status(422).json({ message: '"name" must be a string' });
    return;
  }

  if (name.length < 3) {
    res.status(422).json({ message: '"name" length must be at least 3 characters long' });
    return;
  }

  next();
};

export const validatePrice = (req: Request, res: Response, next: NextFunction): void => {
  const { price } = req.body;

  if (!price) {
    res.status(400).json({ message: '"price" is required' });
    return;
  }

  if (typeof price !== 'string') {
    res.status(422).json({ message: '"price" must be a string' });
    return;
  }

  if (price.length < 3) {
    res.status(422).json({ message: '"price" length must be at least 3 characters long' });
    return;
  }

  next();
};

export const valiUserId = async (req: Request, res: Response, next: NextFunction):Promise<void> => {
  const { userId } = req.body;

  if (!userId) {
    res.status(400).json({ message: '"userId" is required' });
    return;
  }

  if (typeof userId !== 'number') {
    res.status(422).json({ message: '"userId" must be a number' });
    return;
  }

  const user = await UserModel.findByPk(userId);

  if (!user) {
    res.status(422).json({ message: '"userId" not found' });
    return;
  }

  next();
};