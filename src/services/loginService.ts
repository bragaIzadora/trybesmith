import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../types/User';
import UserModel from '../database/models/user.model';

const SECRET_KEY = 'yourSecretKey';

const generateToken = (user: User): string => jwt
  .sign({ id: user.id, username: user.username }, SECRET_KEY, {
    expiresIn: '1h',
  });

const login = async (username: string, password: string): Promise<string | null> => {
  const user = await UserModel.findOne({ where: { username } });

  if (!user) return null;

  const isPasswordValid = await bcrypt.compare(password, user.get('password') as string);
  if (!isPasswordValid) return null;

  const userTyped: User = {
    id: user.get('id') as number,
    username: user.get('username') as string,
    vocation: user.get('vocation') as string,
    level: user.get('level') as number,
    password: user.get('password') as string,
    productIds: (user.get('productIds') as { id: number }[])?.map((product) => product.id) || [],
  };

  const token = generateToken(userTyped);
  return token;
};

export default {
  login,
  generateToken,
};