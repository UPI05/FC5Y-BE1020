import { knexInstanceConnect } from "./db_connect";

export const createTableIfNotExists = async () => {
   const res = await knexInstanceConnect.schema.createTableIfNotExists(process.env.TABLE, (table) => {
    table.increments('id')
    table.string('username')
    table.string('displayed_name')
    table.string('password')
  });
}