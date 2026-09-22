import db from "../config/db";

const findByEmail = async (email) => {
  const query = "SELECT * FROM students WHERE email = ?";

  const [result] = await db.execute(query, [email]);

  return result;
};

const getUser = async () => {
  const sql = "SELECT * FROM students";
  const [result] = await db.execute(sql);
  return result;
};
const createUser = async (name, email, password) => {
  const sql = "insert into students (name,email,password) values(?,?,?)"
  const [result] = await db.execute(sql, [name, email, password])
  return result
}
export { findByEmail, getUser, createUser };
