import 'dotenv/config';

export const { PG_HOST, PG_PORT, PG_DATABASE, PG_USER, PG_PASSWORD, REGION, SNS_ARN } = process.env;

export const PG_CONFIG = {
  user: PG_USER,
  host: PG_HOST,
  database: PG_DATABASE,
  password: PG_PASSWORD,
  port: PG_PORT,
  ssl: {
    rejectUnauthorized: false,
  },
  connectionTimeoutMillis: 5000,
};
