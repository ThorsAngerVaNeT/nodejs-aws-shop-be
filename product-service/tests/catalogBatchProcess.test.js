import { Client } from 'pg';
import { PublishCommand, SNSClient } from '@aws-sdk/client-sns';
import { mockClient } from 'aws-sdk-client-mock';
import { handler as catalogBatchProcess } from '../handlers/catalogBatchProcess';
import { insertProduct } from '../db/pg.client';
import { PG_CONFIG } from '../common/config';

const EVENT = {
  Records: [
    {
      body: JSON.stringify({
        title: 'Test product 1 title',
        description: 'Test product 1 desc',
        last: 'Test product 1 last',
        sole: 'Test product 1 sole',
        price: '196',
        count: '5',
        image_url: null,
      }),
    },
    {
      body: JSON.stringify({
        title: 'Test product 2 title',
        description: 'Test product 2 desc',
        last: 'Test product 2 last',
        sole: 'Test product 2 sole',
        price: '296',
        count: '15',
        image_url: null,
      }),
    },
    {
      body: JSON.stringify({
        title: 'Test product 3 title',
        description: 'Test product 3 desc',
        last: 'Test product 3 last',
        sole: 'Test product 3 sole',
        price: '396',
        count: '25',
        image_url: null,
      }),
    },
  ],
};

jest.mock('pg', () => {
  const mClient = {
    connect: jest.fn(),
    query: jest.fn(),
    end: jest.fn(),
  };
  return { Client: jest.fn(() => mClient) };
});

jest.mock('../db/pg.client', () => {
  return {
    insertProduct: jest.fn(),
  };
});

const snsMock = mockClient(SNSClient);

describe('should insert product and use SNS PublishCommand same times as EVENT.Records.length', () => {
  let client;

  beforeEach(() => {
    client = new Client();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should success', async () => {
    snsMock.on(PublishCommand).resolves({
      message: 'Email is sended',
    });
    await catalogBatchProcess(EVENT);
    expect(insertProduct).toBeCalledTimes(EVENT.Records.length);
    expect(snsMock).toHaveReceivedCommand(PublishCommand);
    expect(snsMock).toHaveReceivedCommandTimes(PublishCommand, EVENT.Records.length);
  });
});
