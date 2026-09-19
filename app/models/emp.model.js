import db from "../config/db"

export const findByEmail = async (email) => {
    const sql = "select * from emp where email=?"
    const [result] = await db.execute(sql, [email])
    return result
}
export const getUser = async () => {
    const sql = "SELECT * FROM emp";
    const [result] = await db.execute(sql);
    return result;
};