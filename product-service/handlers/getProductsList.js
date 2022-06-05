'use strict';
const { getProductsListFromDB } = require('../db/db.service');

const getProductsList = async event => {
  try {
    const productList = (await getProductsListFromDB()) || '[]';

    return {
      statusCode: 200,
      body: productList,
    };
  } catch (error) {
    return {
      statusCode: error.statusCode || 500,
      body: JSON.stringify({ error: error.message }, null, 2),
    };
  }
};

module.exports = { getProductsList, getProductsListFromDB };
