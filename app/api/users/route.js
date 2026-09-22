import { NextResponse } from "next/server";
import db from "../../config/db";
const { getUser, findByEmail ,createUser} = require("../../models/user.model")
/**
 *
 * @api/users/
 * User Register
 */
export async function POST(request) {
  try {
    const { name, email, password } = await request.json();
    const result = await findByEmail(email)
    if (result.length > 0) {
      return NextResponse.json({
        error: "user already exists"
      },{status:409})
    }
    const User = await createUser(name, email, password)
    console.log(User);

    return Response.json(
      {
        message: "User created successfully",
        id: result.insertId,
        status: "success"
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Database error:", error);

    return Response.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  try {
    const students = await getUser()
    return NextResponse.json({
      message: "done",
      students,
    });
  } catch (err) {
    console.log("here is err", err);

    return NextResponse.json(
      {
        message: "Something went wrong",
        error: err.message,
      },
      { status: 500 }
    );
  }
}

