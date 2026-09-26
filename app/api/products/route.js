const { NextResponse } = require("next/server")
const { getProducts, createProduct } = require("../../models/product.model")
const { prepareProductImageUpload } = require("../../services/imagekit.service")

export async function GET(request) {
    const products = await getProducts()
    console.log(products);

    if (products.length < 0) {
        return NextResponse.json({
            message: "not data Found",
        })
    }
    return NextResponse.json({
        message: "products fetch",
        products
    })

}

export async function POST(request) {
    const product = await request.json()
    // const imageKitUpload = prepareProductImageUpload({
    //     imageName: product.imageName,
    //     slug: product.slug,
    //     productName: product.name,
    // })

    console.log("Product form data:", product)
    // console.log("Prepared ImageKit upload:", imageKitUpload)
    const result = await createProduct(products)
    console.log("create result",result);

    return NextResponse.json({
        message: "Product and ImageKit upload metadata received and logged",
        product,
    })
}
