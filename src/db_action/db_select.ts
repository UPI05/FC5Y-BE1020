import { knexInstanceConnect } from "./db_connect";

type responseData = {
    "error": number,
    "data"?: any
};

export const selectAll = async (table: string): Promise<responseData> => {
    try {
        return await knexInstanceConnect(table).then((data) => {
            return Promise.resolve({
                "error": 0,
                "data": data
            });
        });
    } catch {
        return Promise.resolve({"error": 1});
    }
}