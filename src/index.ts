import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import logger from './logger';
import routes from './routes';

dotenv.config();
const port = process.env.PORT || 3000;

type NextFunction = (err?: Error | undefined) => void;

const app = express();
app.use(helmet());
app.use(express.json());
app.use(routes);

app.use(
  (err: Error | undefined, req: Request, res: Response, next: NextFunction) => {
    logger.error(`Unhandled Error: ${err?.message} | Stack: ${err?.stack}`);
    if (!res.headersSent) {
      logger.error(`Error: ${err?.message} | Stack: ${err?.stack}`);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      next(err);
    }
  }
);

if (require.main === module) {
  app.listen(port, () => {});
}

export default app;
