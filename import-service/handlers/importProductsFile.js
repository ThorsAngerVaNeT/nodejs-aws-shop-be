'use strict';
import { constants as httpConstants } from 'http2';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { createResponse, BUCKET_NAME } from '../common/common';
import { s3Client } from '../common/s3Client';

export const handler = async event => {
  try {
    const { name: fileName } = event.queryStringParameters;
    const catalogPath = `uploaded/${fileName}`;

    const params = {
      Bucket: BUCKET_NAME,
      Key: catalogPath,
      ContentType: 'text/csv',
    };

    const command = new PutObjectCommand(params);

    const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 60 });

    return createResponse(httpConstants.HTTP_STATUS_OK, signedUrl);
  } catch (error) {
    return createResponse(error.statusCode || httpConstants.HTTP_STATUS_INTERNAL_SERVER_ERROR, { error: error.message });
  }
};
