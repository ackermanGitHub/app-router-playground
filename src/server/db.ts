import { Pool } from 'pg';

const getPostgresUser = () => {
  if (!process.env.POSTGRES_USER) {
    throw new Error('POSTGRES_USER is not defined');
  }
  return process.env.POSTGRES_USER;
};
const getPostgresHost = () => {
  if (!process.env.POSTGRES_HOST) {
    throw new Error('POSTGRES_HOST is not defined');
  }
  return process.env.POSTGRES_HOST;
};
const getPostgresDatabase = () => {
  if (!process.env.POSTGRES_DATABASE) {
    throw new Error('POSTGRES_DATABASE is not defined');
  }
  return process.env.POSTGRES_DATABASE;
};
const getPostgresPassword = () => {
  if (!process.env.POSTGRES_PASSWORD) {
    throw new Error('POSTGRES_PASSWORD is not defined');
  }
  return process.env.POSTGRES_PASSWORD;
};
const getPostgresPort = () => {
  if (!process.env.POSTGRES_PORT) {
    throw new Error('POSTGRES_PORT is not defined');
  }
  return parseInt(process.env.POSTGRES_PORT);
};

export const pool = new Pool({
  user: getPostgresUser(),
  host: getPostgresHost(),
  database: getPostgresDatabase(),
  password: getPostgresPassword(),
  port: getPostgresPort(),
});
