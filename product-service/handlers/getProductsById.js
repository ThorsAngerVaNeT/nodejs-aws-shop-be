'use strict';
import { constants as httpConstants } from 'http2';
import { CORS_HEADER } from '../common/common';
import { getById } from '../db/product.json.repository';

export const handler = async event => {
  try {
    const { productId } = event.pathParameters || {};
    const product = await getById(productId);

    if (!product)
      return {
        statusCode: httpConstants.HTTP_STATUS_NOT_FOUND,
        headers: CORS_HEADER,
        body: JSON.stringify({ error: `Product with id "${productId}" not found!` }, null, 2),
      };

    return {
      statusCode: httpConstants.HTTP_STATUS_OK,
      headers: CORS_HEADER,
      body: JSON.stringify(product, null, 2),
    };
  } catch (error) {
    return {
      statusCode: error.statusCode || httpConstants.HTTP_STATUS_INTERNAL_SERVER_ERROR,
      headers: CORS_HEADER,
      body: JSON.stringify({ error: error.message }, null, 2),
    };
  }
};
