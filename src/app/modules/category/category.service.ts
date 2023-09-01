import { Category } from '@prisma/client';
import prisma from '../../../shared/prisma';

const insertIntoDB = async (data: Category): Promise<Category> => {
  const user = await prisma.category.create({
    data,
  });

  return user;
};

const getAllCategoriesFromDB = async () => {
  const result = await prisma.category.findMany({});

  return result;
};

const getCategoryById = async (id: string): Promise<Category | null> => {
  const result = await prisma.category.findUnique({
    where: {
      id,
    },
  });

  return result;
};

export const CategoriesService = {
  insertIntoDB,
  getAllCategoriesFromDB,
  getCategoryById,
};
