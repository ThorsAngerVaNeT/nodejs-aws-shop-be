'use strict';
import { constants as httpConstants } from 'http2';
import AWS from 'aws-sdk';
import { createResponse } from '../common/common';

const { BUCKET_NAME, REGION } = process.env;

export const handler = async event => {
  try {
    const s3 = new AWS.S3({ region: REGION });
    const { name: fileName } = event.queryStringParameters;
    const catalogPath = `uploaded/${fileName}`;

    const params = {
      Bucket: BUCKET_NAME,
      Key: catalogPath,
      Expires: 60,
      ContentType: 'text/csv',
    };

    const url = await s3.getSignedUrlPromise('putObject', params);

    return createResponse(httpConstants.HTTP_STATUS_OK, url);
  } catch (error) {
    return createResponse(error.statusCode || httpConstants.HTTP_STATUS_INTERNAL_SERVER_ERROR, { error: error.message });
  }
};
