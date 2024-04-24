import { User } from '../types/User';
import UserModel, { UserSequelizeModel } from '../database/models/user.model';
import ProductModel from '../database/models/product.model';

const listUsers = async (): Promise<User[]> => {
  const users = await UserModel.findAll<UserSequelizeModel>({
    include: [{
      model: ProductModel,
      as: 'productIds',
      attributes: ['id'],
    }],
  });

  return users.map((user) => ({
    id: user.get('id') as number,
    username: user.get('username') as string,
    vocation: user.get('vocation') as string,
    level: user.get('level') as number,
    password: user.get('password') as string,
    productIds: (user.get('productIds') as { id: number }[])?.map((product) => product.id) || [],
  }));
};

export default {
  listUsers,
};