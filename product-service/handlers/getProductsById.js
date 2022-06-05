'use strict';
import { getById } from '../db/product.json.repository';

export const getProductsById = async event => {
  try {
    const { productId } = event.pathParameters || {};
    const product = await getById(productId);

    if (!product)
      return {
        statusCode: 404,
        body: JSON.stringify({ error: `Product with id "${productId}" not found!` }, null, 2),
      };

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'OPTIONS,GET',
      },
      body: JSON.stringify(product, null, 2),
    };
  } catch (error) {
    return {
      statusCode: error.statusCode || 500,
      body: JSON.stringify({ error: error.message }, null, 2),
    };
  }
};
