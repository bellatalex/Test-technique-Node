import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
// import { Bridge } from './bridge/bridge';

dotenv.config();
const masterToken = process.env.KEY || '';
const port = process.env.PORT || 3000;

// const bridgeInstance = new Bridge();
const app = express();

type NextFunction = (err?: Error | undefined) => void;

function authenticateToken(req: Request, res: Response, next: NextFunction) {
  const tokenHeader = req.headers['token'];
  if (tokenHeader == masterToken) {
    return next();
  }
  return res.status(401).json({ error: 'Unauthorized' });
}

app.get('/', (req: Request, res: Response) => {
  res.status(200).send('Hello World');
});

app.get('/api/generate_json_bridge', authenticateToken, (req, res) => {
  res
    .status(200)
    .json({ message: 'Accès autorisé à la route generate_json_bridge' });
});

if (require.main === module) {
  app.listen(port, () => {});
}

export default app;
