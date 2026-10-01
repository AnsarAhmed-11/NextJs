import { NextResponse } from "next/server";
import imagekit from "../../config/imagekit";

export async function POST(request) {
    try {
        const formData = await request.formData();

        const file = formData.get("file");

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const uploadRes = await imagekit.upload({
            file: buffer,
            fileName: file.name,
            folder: "/products",
        });

        console.log("ImageKit:", uploadRes);

        return NextResponse.json({
            message: "Image uploaded successfully",
            imageUrl: uploadRes.url,
            status:"success",
        });

    } catch (error) {
        console.error("Product API error:", error);

        return NextResponse.json(
            { message: "Upload failed" },
            { status: 500 }
        );
    }
}