import { User } from '@prisma/client';
import prisma from '../../../shared/prisma';

const getAllUsersFromDB = async () => {
  const users = await prisma.user.findMany({});

  return users;
};

const getUserById = async (id: string): Promise<User | null> => {
  const result = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  return result;
};

export const UserService = {
  getAllUsersFromDB,
  getUserById,
};
