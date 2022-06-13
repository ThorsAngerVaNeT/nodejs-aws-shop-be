'use strict';
import { constants as httpConstants } from 'http2';
import { CORS_HEADER } from '../common/common';
import { getAll } from '../db/product.json.repository';

export const handler = async event => {
  try {
    const productList = (await getAll()) || [];

    return {
      statusCode: httpConstants.HTTP_STATUS_OK,
      headers: CORS_HEADER,
      body: JSON.stringify(productList),
    };
  } catch (error) {
    return {
      statusCode: error.statusCode || httpConstants.HTTP_STATUS_INTERNAL_SERVER_ERROR,
      headers: CORS_HEADER,
      body: JSON.stringify({ error: error.message }, null, 2),
    };
  }
};
