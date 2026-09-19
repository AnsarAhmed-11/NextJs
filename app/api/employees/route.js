const { NextResponse } = require("next/server")
const { findByEmail, getUser } = require("../../models/emp.model")

// EMP ROUTE

export async function GET(request) {
    const employees = await getUser()
    console.log(employees);

    if (employees.length < 0) {
        return NextResponse.json({
            message: "not data Found",
        })
    }
    return NextResponse.json({
        message: "user fetch successfully"
        ,employees
    })

}