import { getProductsList } from '../handlers/getProductsList';
import productList from '../db/productList.json';

test('getProductsList response should be equal to productList.json', async () => {
  const { body, statusCode } = await getProductsList();
  const result = JSON.parse(body);
  expect(result).toEqual(productList);
  expect(statusCode).toBe(200);
});
