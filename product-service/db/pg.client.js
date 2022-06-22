import { Client } from 'pg';
import { PG_CONFIG } from '../common/config';

export const getQuery = async (query, params = []) => {
  const client = new Client(PG_CONFIG);
  await client.connect();

  const res = await client.query(query, params);

  await client.end();
  return res.rows;
};
