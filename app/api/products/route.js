import { NextResponse } from "next/server";
import imagekit from "../../config/imagekit";
import { createProduct } from "../../models/product.model";

export async function POST(request) {
    try {
        const formData = await request.formData();

        const file = formData.get("file");

        if (!file) {
            return NextResponse.json(
                { message: "Image file is required" },
                { status: 400 }
            );
        }

        // Get product fields from FormData
        const slug = formData.get("slug");
        const name = formData.get("name");
        const category = formData.get("category");
        const price = formData.get("price");
        const color = formData.get("color");
        const description = formData.get("description");
        const badge = formData.get("badge");
        const is_active = formData.get("is_active");
        const stock_quantity = formData.get("stock_quantity");

        // Validate required fields
        if (!slug || !name || !category || !price) {
            return NextResponse.json(
                {
                    message: "slug, name, category and price are required",
                },
                { status: 400 }
            );
        }

        // Upload image
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const uploadRes = await imagekit.upload({
            file: buffer,
            fileName: file.name,
            folder: "/products",
        });

        console.log("ImageKit:", uploadRes);

        // Now create the actual product object
        const product = {
            slug,
            name,
            category,
            price: Number(price),
            image: uploadRes.url,
            color,
            description,
            badge,
            is_active:
                is_active === null
                    ? true
                    : is_active === "true" || is_active === "1",
            stock_quantity:
                stock_quantity === null
                    ? 0
                    : Number(stock_quantity),
        };

        console.log("Product to insert:", product);

        const result = await createProduct(product);

        console.log("Product result:", result);

        return NextResponse.json({
            message: "Product created successfully",
            product: result,
            imageUrl: uploadRes.url,
            status: "success",
        });
    } catch (error) {
        console.error("Product API error:", error);

        return NextResponse.json(
            {
                message: "Product creation failed",
                error: error.message,
            },
            { status: 500 }
        );
    }
} 