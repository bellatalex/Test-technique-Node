import { Router, Request, Response, NextFunction } from 'express';
import { promises as fs } from 'fs';
import { dataAggregation, authenticateToken } from './middleware';

const router = Router();

router.get('/', (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(200).send('Hello World');
  } catch (error) {
    next(error as Error);
  }
});

router.post(
  '/api/generate_json_bridge',
  authenticateToken,
  (req: Request, res: Response, next: NextFunction) => {
    dataAggregation()
      .then(data => {
        res.status(200).json(data);
      })
      .catch(error => {
        next(error as Error);
      });
  }
);

router.post(
  '/api/generate_json_bridge_file',
  authenticateToken,
  (req: Request, res: Response, next: NextFunction) => {
    dataAggregation()
      .then(data => {
        const filePath = './output.json';
        return fs
          .writeFile(filePath, JSON.stringify(data, null, 2))
          .then(() => {
            res.status(200).send('File created successfully');
          })
          .catch(error => {
            next(error as Error);
          });
      })
      .catch(error => {
        next(error as Error);
      });
  }
);

export default router;
