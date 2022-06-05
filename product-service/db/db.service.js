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

module.exports = { getProductsListFromDB };
