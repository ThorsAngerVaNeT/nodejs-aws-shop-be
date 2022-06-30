import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { handler } from '../handlers/importProductsFile';
import { BUCKET_NAME, CORS_HEADER } from '../common/common';

jest.mock('@aws-sdk/s3-request-presigner');
jest.mock('@aws-sdk/client-s3');

const event = { queryStringParameters: { name: 'test.csv' } };
const params = {
  Bucket: BUCKET_NAME,
  Key: 'uploaded/test.csv',
  ContentType: 'text/csv',
};

const MOCKED_RESPONSE_URL = 'http://aws-mocked-signed-url-responce.com';

test('should call command with params', async () => {
  getSignedUrl.mockResolvedValue(MOCKED_RESPONSE_URL);
  const response = await handler(event);

  expect(PutObjectCommand).toHaveBeenCalledWith(params);
  expect(response).toEqual({
    statusCode: 200,
    headers: CORS_HEADER,
    body: JSON.stringify(MOCKED_RESPONSE_URL),
  });
});
