import { User } from '@prisma/client';
import prisma from '../../../shared/prisma';

const signUpUser = async (data: User): Promise<User> => {
  const user = await prisma.user.create({
    data,
  });

  return user;
};

export const AuthService = {
  signUpUser,
};
