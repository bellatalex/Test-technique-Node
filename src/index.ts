import express, { Request, Response } from 'express';
const app = express();

const port = process.env.PORT || 3000;
type NextFunction = (err?: Error | undefined) => void;
const masterToken =
  '8dJyzP1.:3Mbpr11y~8ZUdEY*E.m&LV?dCqT96UH:-(I?!YGgyyuGgp2VawTJ!t*Uw$ekuO`YeWoip~WPC/TFL&|qQXf$/W7QVIPp0U9tnGPhu@GuEdZO/G^^Ect+q!enpn';

app.get('/', (req: Request, res: Response) => {
  res.status(200).send('Hello World');
});

function authenticateToken(req: Request, res: Response, next: NextFunction) {
  const tokenHeader = req.headers['token'];
  if (tokenHeader == masterToken) {
    return next();
  }
  return res.status(401).json({ error: 'Unauthorized' });
}

app.get('/api/generate_json_bridge', authenticateToken, (req, res) => {
  res
    .status(200)
    .json({ message: 'Accès autorisé à la route generate_json_bridge' });
});

if (require.main === module) {
  app.listen(port, () => {});
}

export default app;
