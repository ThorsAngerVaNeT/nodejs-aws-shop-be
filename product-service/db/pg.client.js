import { Client } from 'pg';
import { PG_CONFIG } from '../common/config';

export const getQuery = async (query, params = []) => {
  const client = new Client(PG_CONFIG);
  await client.connect();

  const res = await client.query(query, params);

  await client.end();
  return res.rows;
};

export const insertProduct = async (productParams = [], stocksParams = []) => {
  const client = new Client(PG_CONFIG);
  try {
    await client.connect();
    console.log('client: ', client);

    const productQuery = 'insert into products (title, description, price, last, sole, image_url) values ($1,$2,$3,$4,$5,$6)';
    const stockQuery = 'insert into stocks (product_id, count) values ($1,$2)';

    await client.query('BEGIN');

    const queryText = `${productQuery} RETURNING id`;
    const res = await client.query(queryText, productParams);
    const productId = res.rows[0].id;
    await client.query(stockQuery, [productId, ...stocksParams]);

    await client.query('COMMIT');
    return productId;
  } catch (e) {
    if (client?._connected) await client.query('ROLLBACK');
    if (e?.severity === 'ERROR') e.statusCode = 400;

    throw e;
  } finally {
    await client.end();
  }
};
