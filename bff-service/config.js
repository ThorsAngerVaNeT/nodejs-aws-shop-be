import dotenv from 'dotenv';

dotenv.config();

export const PORT = process.env.PORT || 3001;

export const SERVICES = Object.fromEntries(
  Object.keys(process.env)
    .filter(key => key.endsWith('_SERVICE'))
    .map(key => [key.replace('_SERVICE', '').toLowerCase(), process.env[key]])
);
