import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
const { findByEmail } = require("../../../models/user.model");
const { createToken } = require("../../../config/auth");

export async function POST(request) {
    try {
        const { email, password } = await request.json();

        if (!email || !password) {
            return NextResponse.json(
                {
                    error: "Fields are required",
                    status: false
                },
                { status: 400 }
            );
        }

        const [user] = await findByEmail(email);

        if (!user) {
            return NextResponse.json(
                {
                    error: "Invalid Email",
                    status: false
                },
                { status: 401 }
            );
        }

        // Check password here
        console.log("user password",user.password_hash);
        console.log("ui password",password);

        const isPassword = await bcrypt.compare(password,user.password_hash)
        if (!isPassword) {
            return NextResponse.json(
                {
                    error: "Incorrect password",
                    status: false
                },
                { status: 401 }
            );
        }
        // Create JWT
        const token = await createToken(user.id,user.role);

        // Create response first
        const response = NextResponse.json({
            message: "Login successful",
            status: true,
            user: {
                id: user.id,
                name: user.user_name,
                email: user.email,
                role:user.role
            }
        });

        // Then attach cookie

        response.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 60*60*24,
            path: "/"
        });

        return response;

    } catch (err) {
        console.error(err);

        return NextResponse.json(
            {
                error: "Backend catch error",
                status: false
            },
            { status: 500 }
        );
    }
}
