import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import corsMiddleware from './middleware/corsMiddleware';
import rateLimiter from './middleware/rateLimitMiddleware';
import helloWorldRoutes from './routes/helloWorldRoutes';
import brevoFolderRoutes from './brevo/folders/brevoFolderRoutes';

const app = express();
app.use(bodyParser.json());
app.use(corsMiddleware);
app.use(rateLimiter);


app.get('/', (req: Request, res: Response) => {
  res.send('Hello 6sense. And app is running on port 3000');
});


app.use('/', helloWorldRoutes);
app.use('/brevo', brevoFolderRoutes);

export default app;
