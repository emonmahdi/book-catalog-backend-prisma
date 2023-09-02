import { Book, Prisma } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import {
  bookRelationalFields,
  bookRelationalFieldsMapper,
  bookSearchAbleFields,
} from './book.constants';
import { IBookFilterRequest } from './book.interface';

const insertIntoDB = async (data: Book): Promise<Book> => {
  const result = await prisma.book.create({
    data,
    include: {
      category: true,
    },
  });

  return result;
};

const getAllBookFromDB = async (
  filters: IBookFilterRequest,
  options: IPaginationOptions
) => {
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);

  const { searchTerm, minPrice, maxPrice, category, ...filterData } = filters;

  // console.log(filterData);

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: bookSearchAbleFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (minPrice !== undefined) {
    andConditions.push({
      price: {
        gte: minPrice,
      },
    });
  }

  if (maxPrice !== undefined) {
    andConditions.push({
      price: {
        lte: maxPrice,
      },
    });
  }

  if (category) {
    andConditions.push({
      categoryId: category,
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map(key => {
        if (bookRelationalFields.includes(key)) {
          return {
            [bookRelationalFieldsMapper[key]]: {
              id: (filterData as any)[key],
            },
          };
        } else {
          return {
            [key]: {
              equals: (filterData as any)[key],
            },
          };
        }
      }),
    });
  }

  const whereConditions: Prisma.BookWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.book.findMany({
    skip,
    take: limit,
    where: whereConditions,
    include: {
      category: true,
    },
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : undefined,
  });

  const total = await prisma.book.count({
    where: whereConditions,
  });

  const size = result.length;
  console.log(size);

  // const totalPage = Math.ceil(total / limit);
  // console.log(totalPage);

  const totalPage = Math.ceil(total / (size || limit));

  return {
    meta: {
      page,
      limit,
      total,
      size,
      totalPage,
    },
    data: result,
  };
};

export const BookService = {
  insertIntoDB,
  getAllBookFromDB,
};
