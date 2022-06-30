'use strict';
import { constants as httpConstants } from 'http2';
import { GetObjectCommand } from '@aws-sdk/client-s3';
import csv from 'csv-parser';
import { BUCKET_NAME, createResponse } from '../common/common';
import { s3Client } from '../common/s3Client';

export const handler = async event => {
  try {
    const params = {
      Bucket: BUCKET_NAME,
      Key: event.Records[0].s3.object.key,
    };

    const command = new GetObjectCommand(params);

    const { Body: s3Stream } = await s3Client.send(command);

    s3Stream
      .pipe(csv())
      .on('data', data => {
        console.log(data);
      })
      .on('end', () => {
        console.log('CSV parsing is done!');
        return createResponse(httpConstants.HTTP_STATUS_OK, 'CSV parsing is done!');
      })
      .on('error', err => {
        throw err;
      });
  } catch (error) {
    return createResponse(error.statusCode || httpConstants.HTTP_STATUS_INTERNAL_SERVER_ERROR, { error: error.message });
  }
};
