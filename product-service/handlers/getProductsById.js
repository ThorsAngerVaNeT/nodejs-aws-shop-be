'use strict';
import { CORS_HEADER } from '../common/common';
import { getById } from '../db/product.json.repository';

export const handler = async event => {
  try {
    const { productId } = event.pathParameters || {};
    const product = await getById(productId);

    if (!product)
      return {
        statusCode: 404,
        headers: CORS_HEADER,
        body: JSON.stringify({ error: `Product with id "${productId}" not found!` }, null, 2),
      };

    return {
      statusCode: 200,
      headers: CORS_HEADER,
      body: JSON.stringify(product, null, 2),
    };
  } catch (error) {
    return {
      statusCode: error.statusCode || 500,
      headers: CORS_HEADER,
      body: JSON.stringify({ error: error.message }, null, 2),
    };
  }
};
