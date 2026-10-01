import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
const { findByEmail, createUser } = require("../../models/user.model")
/**
 *
 * - / POST /api/auth
 * - / Create User Account
 */

export async function POST(request) {
    try {
        const { name, email, password } = await request.json();
        const result = await findByEmail(email)
        if (result.length > 0) {
            return NextResponse.json({
                error: "user already exists"
            }, { status: 409 })
        }
        const hashPassword = await bcrypt.hash(password, 10)
        const User = await createUser(name, email, hashPassword)

        return NextResponse.json(
            {
                message: "User created successfully",
                id: User.insertId,
                status: "success"
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("Database error:", error);

        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
}