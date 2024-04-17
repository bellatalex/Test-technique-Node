import { Bridge } from './bridge';

const bridge = new Bridge();

describe('Bridge class tests', () => {
  let token: string;

  beforeAll(async () => {
    jest.setTimeout(5000);
    const authResponse = await bridge.getAuthenticate();
    token = authResponse.access_token;
  });

  test('getAuthenticate should return an access token', () => {
    expect(token).toBeDefined();
    expect(typeof token).toBe('string');
  });

  test('getAccounts should fetch accounts data', async () => {
    const accountsResponse = await bridge.getAccounts(token);
    expect(accountsResponse).toBeDefined();
    expect(Array.isArray(accountsResponse.resources)).toBe(true);
  });

  test('getTransactions should fetch transactions data', async () => {
    const transactionsResponse = await bridge.getTransactions(token);
    expect(transactionsResponse).toBeDefined();
    expect(Array.isArray(transactionsResponse.resources)).toBe(true);
    expect(transactionsResponse.resources[0]).toHaveProperty('date');
  });
  test('getItems should fetch items data', async () => {
    const itemsResponse = await bridge.getItems(token);
    expect(itemsResponse).toBeDefined();
    expect(Array.isArray(itemsResponse.resources)).toBe(true);
    expect(itemsResponse.resources[0]).toHaveProperty('id');
  });
});
