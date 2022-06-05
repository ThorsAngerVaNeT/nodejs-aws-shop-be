'use strict';
import { getAll } from '../db/product.json.repository';

export const getProductsList = async event => {
  try {
    const productList = (await getAll()) || [];

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'OPTIONS,GET',
      },
      body: JSON.stringify(productList),
    };
  } catch (error) {
    return {
      statusCode: error.statusCode || 500,
      body: JSON.stringify({ error: error.message }, null, 2),
    };
  }
};
