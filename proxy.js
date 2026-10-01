import { NextResponse } from "next/server";
import { verifyToken } from "./app/config/auth";

export async function proxy(request) {
    const token = request.cookies.get("token")?.value;
    const path = request.nextUrl.pathname;

    // Protected routes
    if (
        path.startsWith("/admin") ||
        path.startsWith("/superAdmin") ||
        path.startsWith("/dashboard")
    ) {
        // No token
        if (!token) {
            return NextResponse.redirect(
                new URL("/SignIn", request.url)
            );
        }

        // Verify JWT
        const user = await verifyToken(token);

        if (!user) {
            return NextResponse.redirect(
                new URL("/SignIn", request.url)
            );
        }
        console.log("user ",user);
        
        console.log("User role:", user.role);

        // Super Admin can access superAdmin
        if (
            path.startsWith("/superAdmin") &&
            user.role !== "SUPER_ADMIN"
        ) {
            return NextResponse.redirect(
                new URL("/unauthorized", request.url)
            );
        }

        // Admin can access admin
        if (
            path.startsWith("/admin") &&
            user.role !== "ADMIN" &&
            user.role !== "SUPER_ADMIN"
        ) {
            return NextResponse.redirect(
                new URL("/SignIn", request.url)
            );
        }

        return NextResponse.next();
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/admin/:path*",
        "/superAdmin/:path*",
        "/dashboard/:path*",
    ],
};
