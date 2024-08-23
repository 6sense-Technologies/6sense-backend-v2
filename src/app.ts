import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import corsMiddleware from './middleware/corsMiddleware';
import rateLimiter from './middleware/rateLimitMiddleware';
import helloWorldRoutes from './routes/helloWorldRoutes';
import brevoFolderRoutes from './brevo/folders/brevoFolderRoutes';
import brevoContactRoutes from './brevo/contact/brevoContactRoutes';
import brevoListRoutes from './brevo/lists/brevoListRoutes';
import brevoEventRoutes from './brevo/events/brevoEventRoutes';
import emailRoutes from './brevo/email/brevoEmailRoutes';
import mixpanelEventRoutes from './mixpanel/mixpanelEventRoutes';

const app = express();
app.use(bodyParser.json());
app.use(corsMiddleware);
app.use(rateLimiter);


app.get('/', (req: Request, res: Response) => {
  res.send('Hello 6sense. And app is running on port 3000');
});


app.use('/', helloWorldRoutes);
app.use('/brevo', brevoFolderRoutes);
app.use('/brevo', brevoContactRoutes);
app.use('/brevo', brevoListRoutes);
app.use('/brevo', brevoEventRoutes);
app.use('/brevo', emailRoutes);
app.use('/mixpanel', mixpanelEventRoutes);

export default app;
