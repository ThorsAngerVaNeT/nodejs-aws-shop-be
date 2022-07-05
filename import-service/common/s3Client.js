import { S3Client } from '@aws-sdk/client-s3';
import { REGION } from './common';

export const s3Client = new S3Client({ region: REGION });
