'use strict';
import { constants as httpConstants } from 'http2';
import { createResponse } from '../common/common';
import { create as createProduct } from '../db/product.pg.repository';

export const handler = async event => {
  try {
    const productData = JSON.parse(event.body);
    const product = await createProduct(productData);

    if (!product) return createResponse(httpConstants.HTTP_STATUS_BAD_REQUEST, { error: `Product is not created. Unknown error!` });

    return createResponse(httpConstants.HTTP_STATUS_OK, product);
  } catch (error) {
    return createResponse(error.statusCode || httpConstants.HTTP_STATUS_INTERNAL_SERVER_ERROR, { error: error.message });
  }
};
