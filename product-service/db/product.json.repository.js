import { readFile } from 'fs/promises';
import { join } from 'path';
import productList from './productList.json';

export const getAll = async () => productList;

export const getById = async id => productList.find(product => product.id === id);
