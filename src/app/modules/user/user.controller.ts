import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync'; 
import { UserService } from './user.service';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';

const getAllUsersFromDB = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.getAllUsersFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Users retrieved successfully',
    data: result
  });
});

export const UserController = {
    getAllUsersFromDB
}
