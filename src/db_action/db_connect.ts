import { Knex, knex } from "knex";

const config: Knex.Config = {
  client: 'sqlite3',
  connection: {
    filename: process.env.DB || '',
  },
  useNullAsDefault: true
}

export const knexInstanceConnect = knex(config);