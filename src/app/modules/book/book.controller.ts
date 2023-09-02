import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { BookService } from './book.service';
import pick from '../../../shared/pick';
import { bookFilterableFields } from './book.constants';

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await BookService.insertIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book created successfully',
    data: result,
  });
});

const getAllBookFromDB = catchAsync(async (req: Request, res: Response) => {
  // console.log(req.query);
  const filters = pick(req.query, bookFilterableFields);
  const options = pick(req.query, ['page', 'limit', 'sortBy', 'sortOrder']);

  // console.log('Filters: ', filters);
  // console.log('Options: ', options);

  const result = await BookService.getAllBookFromDB(filters, options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

export const BookController = {
  insertIntoDB,
  getAllBookFromDB,
};
