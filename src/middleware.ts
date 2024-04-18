import {
  Bridge,
  AuthResponse,
  TransactionResponse,
  ItemResponse,
  AccountsResponse,
} from './bridge/bridge';
const bridgeInstance = new Bridge();
import dotenv from 'dotenv';
import { Request, Response, NextFunction } from 'express';
import logger from './logger';

dotenv.config();
const masterToken = process.env.KEY || '';

interface DataAggregationResult {
  auth: AuthResponse;
  items: ItemResponse[];
  accounts: AccountsResponse[];
  transactions: TransactionResponse[];
}

function dataAggregation(): Promise<DataAggregationResult> {
  return bridgeInstance.getAuthenticate().then((auth: AuthResponse) => {
    const promises = [
      bridgeInstance.getItems(auth.access_token).catch(error => {
        logger.error('Failed to get items:', error);
        return [] as ItemResponse[];
      }),
      bridgeInstance.getAccounts(auth.access_token).catch(error => {
        logger.error('Failed to get accounts:', error);
        return [] as AccountsResponse[];
      }),
      bridgeInstance.getTransactions(auth.access_token).catch(error => {
        logger.error('Failed to get transactions:', error);
        return [] as TransactionResponse[];
      }),
    ];
    return Promise.all(promises).then(([items, accounts, transactions]) => {
      return {
        auth: auth,
        items: items as ItemResponse[],
        accounts: accounts as AccountsResponse[],
        transactions: transactions as TransactionResponse[],
      };
    });
  });
}

function authenticateToken(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const tokenHeader = req.headers['token'];
  if (tokenHeader == masterToken) {
    return next();
  }
  res.status(401).json({ error: 'Unauthorized' });
}

export { dataAggregation, authenticateToken };
