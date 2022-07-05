import { SQSClient } from '@aws-sdk/client-sqs';
import { REGION } from './common';

export const sqsClient = new SQSClient({ region: REGION });
