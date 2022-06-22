'use strict';
import { constants as httpConstants } from 'http2';
import { createResponse } from '../common/common';
import { getAll } from '../db/product.pg.repository';

export const handler = async event => {
  try {
    const productList = (await getAll()) || [];

    return createResponse(httpConstants.HTTP_STATUS_OK, productList);
  } catch (error) {
    return createResponse(error.statusCode || httpConstants.HTTP_STATUS_INTERNAL_SERVER_ERROR, { error: error.message });
  }
};
