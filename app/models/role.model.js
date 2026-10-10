import db from "../config/db";

const allowedRoles = ["User", "Admin"];

export async function changeRole(id,role) {
  if (!id || !Number.isInteger(Number(id))) {
    throw new Error("Invalid user ID");
  }

  if (!allowedRoles.includes(role)) {
    throw new Error("Invalid role");
  }

  const query = "UPDATE users SET role = ? WHERE id = ?";

  const [result] = await db.execute(query, [role, id]);

  if (result.affectedRows === 0) {
    throw new Error("User not found");
  }

  return result;
}
