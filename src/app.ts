import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import corsMiddleware from './middleware/corsMiddleware';

const app = express();
app.use(bodyParser.json());
app.use(corsMiddleware);


app.get('/', (req: Request, res: Response) => {
  res.send('Hello 6sense. And app is running on port 3000');
});

export default app;
