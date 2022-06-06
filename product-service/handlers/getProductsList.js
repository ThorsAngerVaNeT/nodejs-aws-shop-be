'use strict';
import { CORS_HEADER } from '../common/common';
import { getAll } from '../db/product.json.repository';

export const handler = async event => {
  try {
    const productList = (await getAll()) || [];

    return {
      statusCode: 200,
      headers: CORS_HEADER,
      body: JSON.stringify(productList),
    };
  } catch (error) {
    return {
      statusCode: error.statusCode || 500,
      headers: CORS_HEADER,
      body: JSON.stringify({ error: error.message }, null, 2),
    };
  }
};
