'use strict';
import { constants as httpConstants } from 'http2';
import { GetObjectCommand, CopyObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import csv from 'csv-parser';
import { BUCKET_NAME, createResponse } from '../common/common';
import { s3Client } from '../common/s3Client';

export const handler = async event => {
  try {
    const { key: objectKey } = event.Records[0].s3.object;

    await parseCSV(objectKey);
    await moveFile(BUCKET_NAME, objectKey, 'parsed');

    return createResponse(httpConstants.HTTP_STATUS_OK, '');
  } catch (error) {
    console.error(error);
    return createResponse(error.statusCode || httpConstants.HTTP_STATUS_INTERNAL_SERVER_ERROR, { error: error.message });
  }
};

const parseCSV = async objectKey => {
  try {
    const params = {
      Bucket: BUCKET_NAME,
      Key: objectKey,
    };
    const command = new GetObjectCommand(params);

    const { Body: s3Stream } = await s3Client.send(command);

    s3Stream
      .pipe(csv())
      .on('data', data => {
        console.log(data);
      })
      .on('end', async () => {
        console.log('CSV parsing is done!');
      })
      .on('error', err => {
        console.error(err);
        throw err;
      });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const moveFile = async (bucketName, objectKey, destinationFolderName) => {
  try {
    const destinationKey = [destinationFolderName, ...objectKey.split('/').slice(1)].join('/');

    const copyParams = {
      Bucket: bucketName,
      CopySource: `/${bucketName}/${objectKey}`,
      Key: destinationKey,
    };

    const copyCommand = new CopyObjectCommand(copyParams);
    await s3Client.send(copyCommand);

    const deleteParams = {
      Bucket: bucketName,
      Key: objectKey,
    };

    const deleteCommand = new DeleteObjectCommand(deleteParams);
    await s3Client.send(deleteCommand);
  } catch (err) {
    console.log('Error', err);
    throw err;
  }
};
