import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { CategoriesService } from './category.service';

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await CategoriesService.insertIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category created successfully!',
    data: result,
  });
});

const getAllCategoriesFromDB = catchAsync(
  async (req: Request, res: Response) => {
    const result = await CategoriesService.getAllCategoriesFromDB();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Categories fetched successfully',
      data: result,
    });
  }
);

const getCategoryById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await CategoriesService.getCategoryById(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Categories fetched successfully',
    data: result,
  });
});

export const CategoriesController = {
  insertIntoDB,
  getAllCategoriesFromDB,
  getCategoryById
};
