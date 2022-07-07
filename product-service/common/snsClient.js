import { SNSClient } from '@aws-sdk/client-sns';
import { REGION } from './config';

export const snsClient = new SNSClient({ region: REGION });
