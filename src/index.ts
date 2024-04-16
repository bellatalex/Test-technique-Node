import express, { Request, Response } from 'express';
const app = express();

const port = process.env.PORT || 3000;
type NextFunction = (err?: any) => void;
const master_token =
  "8dJyzP1.:3Mbpr11y~8ZUdEY*E.m&LV?dCqT96U'H:-(I?!YGgyyuGgp2VawTJ!t'*Uw$ekuO`YeWoip~WPC/TFL&|qQXf$/W7'QVIPp0U9tnGPhuD'@GuEdZO/G^^Ect+q!enpn";

app.get('/', (req: Request, res: Response) => {
  res.status(200).send('Hello World');
});

function authenticateToken(req: Request, res: Response, next: NextFunction) {
  const token_header = req.headers['token'];
  if (token_header == master_token) {
    return next();
  }
  return res.status(401).json({ error: 'Unauthorized' });
}

app.get('/api/generate_json_bridge', authenticateToken, (req, res) => {
  res.status(200).json({ message: "Accès autorisé à l'API sécurisée" });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app;
