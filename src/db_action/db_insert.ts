import { knexInstanceConnect } from "./db_connect";
import bcrypt from "bcryptjs";

type tableTypes = {
    username: string,
    displayed_name: string,
    password: string
}

type responseData = {
    "error": number
}

export const insertDb = async ({table, data}: {table: string, data: tableTypes}): Promise<responseData> => {
    try{
        if (!data.password) throw 'Password not found!';
        data.password = bcrypt.hashSync(data.password, 8);
        await knexInstanceConnect(table).insert(data);
        return Promise.resolve({"error": 0})
    } catch {
        return Promise.resolve({"error": 1});
    }
}