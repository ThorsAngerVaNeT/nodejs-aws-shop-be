'use strict';
import { constants as httpConstants } from 'http2';
import { createResponse } from '../common/common';
import { getById } from '../db/product.json.repository';

export const handler = async event => {
  try {
    const { productId } = event.pathParameters || {};
    const product = await getById(productId);

    if (!product) return createResponse(httpConstants.HTTP_STATUS_NOT_FOUND, { error: `Product with id "${productId}" not found!` });

    return createResponse(httpConstants.HTTP_STATUS_OK, product);
  } catch (error) {
    return createResponse(error.statusCode || httpConstants.HTTP_STATUS_INTERNAL_SERVER_ERROR, { error: error.message });
  }
};
