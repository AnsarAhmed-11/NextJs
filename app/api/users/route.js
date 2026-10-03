import { NextResponse } from "next/server";
import db from "../../config/db";
const { getUser, findByEmail ,createUser} = require("../../models/user.model")
/**
 *
 * -
 * -
 */

export async function GET(request) {
  try {
    const users = await getUser()
    return NextResponse.json({
      message: "Data Send SuccessFully",
      users,
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

