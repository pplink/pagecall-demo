/**
 * Express App
 */
import express, { Request, Response, NextFunction, Express } from 'express';
import morgan from 'morgan';
import compression from 'compression';
import helmet from 'helmet';
import useragent from 'express-useragent';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import { Err } from '../types';
import routes from './routes';

const app: Express = express();
const corsOptions: cors.CorsOptions = {
  origin: true,
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ['OPTIONS', 'GET', 'POST', 'PUT', 'DELETE'],
};

app.set('trust proxy', true);
app.use(helmet());
app.use(morgan('combined'));
app.use(compression());
app.use(express.json({ limit: '10mb' }));
app.use(express.raw({ limit: '20mb' }));
app.use(express.text({ limit: '10mb' }));
app.use(
  express.urlencoded({
    extended: true,
    limit: '100kb',
  }),
);
app.use(cookieParser('secret'));
app.use(useragent.express());
app.use(cors(corsOptions));

app.options('*', cors(corsOptions));

app.use('/', routes);

/**
 * Catch 404 and forward to error handler
 */
app.use((req: Request, res: Response, next: NextFunction) => {
  const err = new Error('Not Found') as Err;
  err.status = 404;
  next(err);
});

/**
 * Error Handler
 */
app.use(async (err: Err, req: Request, res: Response, next: NextFunction) => {
  if (err.status === undefined || err.status >= 500) {
    // Status가 없거나 5XX 에러인 경우만 로그를 찍는다.
    console.error(err);
  }

  res.status(err.status ?? 500);
  res.end();
});

export default app;
