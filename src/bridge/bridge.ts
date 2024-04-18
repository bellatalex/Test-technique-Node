import * as superagent from 'superagent';
import dotenv from 'dotenv';

dotenv.config();
const bridgeVersion = process.env.BRIDGE_VERSION || '2021-06-01';
const clientId = process.env.CLIENT_ID || '';
const clientSecret = process.env.CLIENT_SECRET || '';
const userUuid = process.env.USER_UUID || '';
const email = process.env.EMAIL || '';
const password = process.env.PASSWORD || '';

interface Account {
  id: number;
  name: string;
  balance: number;
  status: number;
  status_code_info: string | null;
  status_code_description: string | null;
  is_paused: boolean;
  updated_at: string;
  type: string;
  currency_code: string;
  item_id: number;
  bank_id: number;
  iban: string | null;
  is_pro: boolean;
}

export interface AccountsResponse {
  resources: Account[];
  generated_at: string;
  pagination: Pagination;
}

interface Pagination {
  next_uri: string | null;
}

interface Resource {
  id: number;
  status: number;
  status_code_info: string | null;
  status_code_description: string | null;
  bank_id: number;
}

interface Pagination {
  next_uri: string | null;
}

export interface ItemResponse {
  resources: Resource[];
  generated_at: string;
  pagination: Pagination;
}

export interface AuthResponse {
  access_token: string;
  expires_at: string;
}
export interface TransactionResponse {
  resources: Transaction[];
  generated_at: string;
  pagination: {
    next_uri: string;
  };
}

interface Transaction {
  id: number;
  clean_description: string;
  bank_description: string;
  amount: number;
  date: string;
  updated_at: string;
  currency_code: string;
  category_id: number;
  account_id: number;
  show_client_side: boolean;
  is_deleted: boolean;
  is_future: boolean;
}

export class Bridge {
  public async getAuthenticate(): Promise<AuthResponse> {
    try {
      const response = await superagent
        .post('https://api.bridgeapi.io/v2/authenticate')
        .set('Bridge-Version', bridgeVersion)
        .set('Content-Type', 'application/json')
        .set('Client-Id', clientId)
        .set('Client-Secret', clientSecret)
        .send({
          userUuid: userUuid,
          email: email,
          password: password,
        });

      return response.body;
    } catch (error) {
      throw new Error('Failed to fetch transactions');
    }
  }
  public async getItems(token: string): Promise<ItemResponse> {
    try {
      const response = await superagent
        .get('https://api.bridgeapi.io/v2/items')
        .set('Bridge-Version', bridgeVersion)
        .set('Content-Type', 'application/json')
        .set('Client-Id', clientId)
        .set('Client-Secret', clientSecret)
        .set('Authorization', `Bearer ${token}`)
        .send();

      return response.body;
    } catch (error) {
      throw new Error('Failed to fetch transactions');
    }
  }
  public async getAccounts(token: string): Promise<AccountsResponse> {
    try {
      const response = await superagent
        .get('https://api.bridgeapi.io/v2/accounts')
        .set('Bridge-Version', bridgeVersion)
        .set('Client-Id', clientId)
        .set('Client-Secret', clientSecret)
        .set('Authorization', `Bearer ${token}`)
        .send();

      return response.body;
    } catch (error) {
      throw new Error('Failed to fetch transactions');
    }
  }
  public async getTransactions(token: string): Promise<TransactionResponse> {
    try {
      const response = await superagent
        .get('https://api.bridgeapi.io/v2/transactions?limit=2')
        .set('Bridge-Version', bridgeVersion)
        .set('Content-Type', 'application/json')
        .set('Client-Id', clientId)
        .set('Client-Secret', clientSecret)
        .set('Authorization', `Bearer ${token}`)
        .send();

      return response.body;
    } catch (error) {
      throw new Error('Failed to fetch transactions');
    }
  }
}
