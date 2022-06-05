'use strict';
const fs = require('fs/promises');
const path = require('path');

const getProductsListFromDB = async () => {
  try {
    const filePath = path.join(__dirname, '..', 'db', 'productList.json');
    return await fs.readFile(filePath, { encoding: 'utf-8' });
  } catch (error) {
    return JSON.stringify({ error: 'DB not found!' });
  }
};

module.exports.getProductsList = async event => {
  const productList = (await getProductsListFromDB()) || '[]';
  return {
    statusCode: 200,
    body: productList,
  };
};
