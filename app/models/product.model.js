import db from "../config/db";

export const getProducts = async () => {
    const sql = "select * from products"
    const [result] = await db.execute(sql)
    return result;
}
export const createProduct = async (product) => {
    console.log("create p",products);

    const sql = `INSERT INTO products (
      slug,
      name,
      category,
      price,
      image,
      color,
      description,
      badge,
      is_active,
      stock_quantity
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

    const values = [
        product.slug,
        product.name,
        product.category,
        product.price,
        product.image,
        product.color,
        product.description,
        product.badge,
        product.is_active ?? true,
        product.stock_quantity ?? 0,
    ];

    const [result] = await db.execute(sql, values);

    return {
        id: result.insertId,
        ...product,result    };
};
