import dotenv from 'dotenv';

dotenv.config();

interface IConfig {
  port: number;
}

const getConfig = (): IConfig => {
  const { PORT } = process.env;

  if (!PORT) {
    throw new Error('Missing required environment variables');
  }

  return {
    port: parseInt(PORT, 10),
  };
};

export const config = getConfig();
