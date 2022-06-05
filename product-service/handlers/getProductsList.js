'use strict';
const fs = require('fs/promises');
const path = require('path');

const getProductsListFromDB = async () => {
  try {
    const filePath = path.join(__dirname, '..', 'db', 'productList.json');
    return await fs.readFile(filePath, { encoding: 'utf-8' });
  } catch (error) {
    const err = new Error('DB not found!');
    err.statusCode = 404;
    throw err;
  }
};

const getProductsList = async event => {
  try {
    const productList = (await getProductsListFromDB()) || '[]';

    return {
      statusCode: 200,
      body: productList,
    };
  } catch (error) {
    return {
      statusCode: err.statusCode || 500,
      body: JSON.stringify({ error: error.message }, null, 2),
    };
  }
};

module.exports = { getProductsList, getProductsListFromDB };
