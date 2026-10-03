import db from "../config/db";

const findByEmail = async (email) => {
  const query = "SELECT * FROM users WHERE email = ?";

  const [result] = await db.execute(query, [email]);

  return result;
};

const getUser = async () => {
  const sql = "SELECT * FROM users";
  const [result] = await db.execute(sql);
  return result;
};

const createUser = async (name, email, password) => {
  const sql = "insert into users (user_name,email,password_hash) values(?,?,?)"
  const [result] = await db.execute(sql, [name, email, password])
  return result
}
export { findByEmail, getUser, createUser };
