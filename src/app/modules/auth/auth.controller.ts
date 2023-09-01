import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { AuthService } from './auth.service';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';

const signUpUser = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.signUpUser(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User created successfully!',
    data: result
  });
});

export const AuthController = {
    signUpUser
}
