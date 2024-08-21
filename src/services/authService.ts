import jwt from 'jsonwebtoken';
import { config } from '../config/config';
import AuthKey from '../models/authKeyModel';
import { IApiResponse } from '../types';

interface IJwtPayload {
  key: string;
}

const checkJwtSecret = (): void => {
  if (!config.jwtSecret) {
    throw new Error('JWT Secret is not defined');
  }
};

export const generateToken = (): IApiResponse => {
  try {
    checkJwtSecret();
    const key = 'express'; 
    const token = jwt.sign({ key }, config.jwtSecret, { expiresIn: '1h' });

    return {
      status: 200,
      data: { token },
      message: 'Token generated successfully',
    };
  } catch (error: any) {
    console.error('Token generation failed:', error);
    return {
      status: 500,
      errorCode: 'TOKEN_GENERATION_FAILED',
      message: error.message || 'An error occurred while generating the token',
      data: {},
    };
  }
};

export const verifyToken = async (token: string): Promise<IApiResponse> => {
  try {
    checkJwtSecret();
    const decoded = jwt.verify(token, config.jwtSecret) as IJwtPayload;
    const validKey = await AuthKey.findOne({ key: decoded.key });

    if (validKey) {
      return {
        status: 200,
        data: decoded,
        message: 'Token verified successfully',
      };
    } else {
      return {
        status: 401,
        errorCode: 'INVALID_KEY',
        message: 'Invalid key in token',
        data: {},
      };
    }
  } catch (error: any) {
    console.error('Token verification failed:', error);
    return {
      status: 401,
      errorCode: 'TOKEN_VERIFICATION_FAILED',
      message: error.message || 'An error occurred while verifying the token',
      data: {},
    };
  }
};
