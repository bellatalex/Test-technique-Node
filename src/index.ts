import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import { Bridge } from './bridge/bridge';

dotenv.config();
const masterToken = process.env.KEY || '';
const port = process.env.PORT || 3000;

const bridgeInstance = new Bridge();
const app = express();

type NextFunction = (err?: Error | undefined) => void;

function authenticateToken(req: Request, res: Response, next: NextFunction) {
  const tokenHeader = req.headers['token'];
  if (tokenHeader == masterToken) {
    return next();
  }
  return res.status(401).json({ error: 'Unauthorized' });
}

function dataAggregation() {
  return bridgeInstance.getAuthenticate().then(auth => {
    const promises = [
      bridgeInstance.getItems(auth.access_token),
      bridgeInstance.getAccounts(auth.access_token),
      bridgeInstance.getTransactions(auth.access_token),
    ];
    return Promise.all(promises).then(([items, accounts, transactions]) => {
      return {
        auth: auth,
        items: items,
        accounts: accounts,
        transactions: transactions,
      };
    });
  });
}

app.get('/', (req: Request, res: Response) => {
  res.status(200).send('Hello World');
});

app.post('/api/generate_json_bridge', authenticateToken, (req, res) => {
  dataAggregation()
    .then(data => {
      res.status(200).json(data);
    })
    .catch(() => {
      res.status(500).json({ message: 'Internal Server Error' });
    });
});

if (require.main === module) {
  app.listen(port, () => {});
}

export default app;
