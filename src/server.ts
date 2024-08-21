import app from './app';
import { config } from './config/config';

const startServer = async (): Promise<void> => {
  try {
    app.listen(config.port, () => {
      console.log(`Server is running on port ${config.port}`);
    });
  } catch (err) {
    console.error('Error starting server:', err);
    process.exit(1);
  }
};

startServer();
