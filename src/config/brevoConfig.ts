import axios, { AxiosInstance } from 'axios';
import { IApiResponse } from '../types';

export const initializeBrevoClient = (): IApiResponse => {
  try {
    const apiKey = process.env.BREVO_API_KEY;

    if (!apiKey) {
      return {
        status: 500,
        errorCode: 'MISSING_API_KEY',
        message: 'BREVO_API_KEY environment variable is required',
        data: {},
      };
    }

    const brevoClient: AxiosInstance = axios.create({
      baseURL: 'https://api.brevo.com/v3',
      headers: {
        'Content-Type': 'application/json',
        'api-key': apiKey,
      },
    });

    return {
      status: 200,
      data: { client: brevoClient },
      message: 'Brevo client initialized successfully',
    };
    
  } catch (error: any) {
    return {
      status: 500,
      errorCode: 'CLIENT_INITIALIZATION_FAILED',
      message: 'Failed to initialize Brevo client',
      data: {},
    };
  }
};
