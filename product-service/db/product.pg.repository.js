import { getQuery, insertProduct } from './pg.client';

export const getAll = async () => getQuery('SELECT p.*, s.count FROM products p INNER JOIN stocks s ON s.product_id = p.id');

export const getById = async id =>
  (await getQuery('SELECT p.*, s.count FROM products p INNER JOIN stocks s ON s.product_id = p.id WHERE p.id = $1', [id]))[0];
