import { NextResponse } from "next/server"
// not working...
export async function middleware(request) {
    const token = localStorage.getItem("token", true)
    if (!token) {
        return NextResponse.redirect("/SignIn", request.url)
    }
}

export const config ={
    matcher:['/Catalog'],
}