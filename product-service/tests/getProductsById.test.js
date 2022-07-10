import { handler as getProductsById } from '../handlers/getProductsById';
import productList from '../db/productList.json';

const WRONG_ID = { pathParameters: { productId: '773b03e8-e1f0-464a-bc50-cf48f36a942d' } };
const TLB_ID = { pathParameters: { productId: '7d386117-e576-4896-adf2-08c027e2ec15' } };
const TLB_TITLE = 'TLB Mallorca Artista Black Chelsea Boots';
const TLB_LAST = 'Picasso';

test('should return "Product not found"', async () => {
  const { body, statusCode } = await getProductsById(WRONG_ID);
  const result = JSON.parse(body);
  expect(result.error).toMatch(/not found/);
  expect(statusCode).toBe(404);
});

test('should return TLB product', async () => {
  const { body, statusCode } = await getProductsById(TLB_ID);
  const result = JSON.parse(body);
  
  expect(result.title).toEqual(TLB_TITLE);
  expect(result.last).toEqual(TLB_LAST);
  expect(statusCode).toBe(200);
});
