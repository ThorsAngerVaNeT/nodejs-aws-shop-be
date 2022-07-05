'use strict';
import { constants as httpConstants } from 'http2';
import { createResponse } from '../common/common';
import { create as createProduct } from '../db/product.pg.repository';

export const handler = async event => {
  try {
    const { Records: records } = event;

    const result = [];

    for ({ body } of records) {
      const productData = JSON.parse(body);
      const product = await createProduct(productData);
      if (product) result.push(product);
    }

    return createResponse(httpConstants.HTTP_STATUS_CREATED, result);
  } catch (error) {
    return createResponse(error.statusCode || httpConstants.HTTP_STATUS_INTERNAL_SERVER_ERROR, { error: error.message });
  }
};
