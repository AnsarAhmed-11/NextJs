import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
    const { id } = await params
    const data = await request
    return NextResponse.json({
        message: `Your id ${id} is received`,
    })
}

export async function DELETE(request,{ params }) {
    const { id } = await params
    return NextResponse.json({
        message: "delete id received",
        id
    })
}