'use strict';
const fs = require('fs/promises');
const path = require('path');
const { getProductsListFromDB } = require('./getProductsList');

module.exports.getProductsById = async event => {
  try {
    const { productId } = event.pathParameters || {};
    const productList = JSON.parse((await getProductsListFromDB()) || '[]');
    const product = productList.find(p => p.id === productId);

    if (!product)
      return {
        statusCode: 404,
        body: JSON.stringify({ error: `Product with id ${productId} not found!` }, null, 2),
      };

    return {
      statusCode: 200,
      body: JSON.stringify(product, null, 2),
    };
  } catch (error) {
    return {
      statusCode: error.statusCode || 500,
      body: JSON.stringify({ error: error.message }, null, 2),
    };
  }
};
