'use strict';
import { PublishCommand } from '@aws-sdk/client-sns';
import { create as createProduct } from '../db/product.pg.repository';
import { snsClient } from '../common/snsClient.js';
import { NORMAL_STOCK, OVERSTOCKED, OVERSTOCKED_COUNT, SNS_ARN } from '../common/config';

export const handler = async event => {
  try {
    const records = event.Records.map(({ body }) => JSON.parse(body));

    for (const record of records) {
      const product = await createProduct(record);
      if (product) {
        const input = {
          Subject: 'Product was added to the DB',
          Message: JSON.stringify(record),
          TopicArn: SNS_ARN,
          MessageAttributes: {
            Count: {
              DataType: 'String',
              StringValue: +product.count >= +OVERSTOCKED_COUNT ? OVERSTOCKED : NORMAL_STOCK,
            },
          },
        };

        const command = new PublishCommand(input);
        await snsClient.send(command);
      }
    }
  } catch (error) {
    console.log('error: ', error);
  }
};
