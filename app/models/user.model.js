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
export { findByEmail, getUser };
