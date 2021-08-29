import { knexInstanceConnect } from "./db_connect";


type responseData = {
    "error": number
};

export const deleteAll = async (table: string): Promise<responseData> => {
    try {
        await knexInstanceConnect(table).del();
        return Promise.resolve({"error": 0});
    } catch {
        return Promise.resolve({"error": 1});
    }
}