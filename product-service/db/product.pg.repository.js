import { getQuery, insertProduct } from './pg.client';

export const getAll = async () => getQuery('SELECT p.*, s.count FROM products p INNER JOIN stocks s ON s.product_id = p.id');

export const getById = async id =>
  (await getQuery('SELECT p.*, s.count FROM products p INNER JOIN stocks s ON s.product_id = p.id WHERE p.id = $1', [id]))[0];

export const create = async product => {
  const PRODUCT_FIELDS = ['title', 'description', 'price', 'last', 'sole', 'image_url'];
  const STOCKS_FIELDS = ['count'];

  const productParams = PRODUCT_FIELDS.map(field => product[field] ?? null);
  const stockParams = STOCKS_FIELDS.map(field => product[field] ?? null);

  const res = await insertProduct(productParams, stockParams);
  
  return { ...product, id: res };
};
