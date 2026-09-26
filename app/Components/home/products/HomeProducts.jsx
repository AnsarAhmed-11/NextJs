"use client";

import { ArrowRight, Heart, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "../../cart/CartContext";
import { products } from "./productData";
import styles from "./homeProducts.module.css";

export default function HomeProducts() {
  const { addItem } = useCart();

  return <section className={styles.productsSection}>
    <div className={styles.sectionHeading}><div><p>Selected for now</p><h2>Everyday, elevated.</h2></div><Link href="/catalog">View the full catalog <ArrowRight size={15} /></Link></div>
    <div className={styles.productGrid}>{products.map((product, index) => <article className={styles.product} key={product.id}>
      <div className={styles.productImage}><span className={styles.productNumber}>0{index + 1}</span><button className={styles.heart} aria-label={`Save ${product.name}`}><Heart size={17} /></button><Image src={product.image} alt={product.name} fill sizes="(max-width: 680px) 50vw, (max-width: 1000px) 33vw, 25vw" /></div>
      <div className={styles.productDetails}><div><p>{product.category}</p><h3>{product.name}</h3><small>{product.color}</small></div><strong>${product.price}</strong></div>
      <button className={styles.addButton} onClick={() => addItem(product)}><ShoppingBag size={16} /> Add to bag</button>
    </article>)}</div>
  </section>;
}
