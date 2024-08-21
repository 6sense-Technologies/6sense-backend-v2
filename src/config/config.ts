import dotenv from 'dotenv';

dotenv.config();

interface IConfig {
  port: number;
  mongoURI: string;
}

const getConfig = (): IConfig => {
  const { PORT, MONGO_URI } = process.env;

  if (!PORT || !MONGO_URI) {
    throw new Error('Missing required environment variables');
  }

  return {
    port: parseInt(PORT, 10),
    mongoURI: MONGO_URI,
  };
};

export const config = getConfig();
