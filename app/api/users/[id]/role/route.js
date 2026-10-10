import { request } from "http";
import { changeRole } from "../../../../models/role.model";
import { NextResponse } from "next/server";

export async function PATCH(request, { params }) {
    const { id } = await params;
    const { role } = await request.json()

    const result = await changeRole(id,role)

    console.log("RESULT", result);

    return NextResponse.json({
        success: true,
        message: "User role updated successfully",
    });
}