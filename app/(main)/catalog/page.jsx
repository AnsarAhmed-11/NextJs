import { ArrowRight, Heart, SlidersHorizontal } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import styles from "../storefront.module.css";

const products = [
  { image: "/model1.jpeg", name: "Linen column dress", price: "$148", tag: "New" },
  { image: "/model2.jpeg", name: "The everyday blazer", price: "$198", tag: "Bestseller" },
  { image: "/model3.jpeg", name: "Ribbed square-neck top", price: "$76", tag: "New" },
  { image: "/model4.jpeg", name: "Wide leg tailored trouser", price: "$128", tag: "" },
  { image: "/model5.jpeg", name: "Sculpted jersey dress", price: "$116", tag: "" },
  { image: "/model6.jpeg", name: "Relaxed cotton shirt", price: "$92", tag: "" },
];

export default function CatalogPage() {
  return <main className={styles.storefront}><section className={styles.catalogHeader}><p className={styles.eyebrow}>Shop all</p><h1>The catalog</h1><p>Thoughtful pieces, built to be part of your regular rotation.</p></section><section className={styles.catalogControls}><p>Showing <strong>{products.length} pieces</strong></p><div><button><SlidersHorizontal size={15} /> Filter</button><button>Sort by <span>Featured</span></button></div></section><section className={styles.productGrid}>{products.map((product) => <article className={styles.productCard} key={product.name}><div className={styles.productImage}>{product.tag && <span className={styles.productTag}>{product.tag}</span>}<button aria-label={`Save ${product.name}`}><Heart size={18} /></button><Image src={product.image} alt={product.name} fill sizes="(max-width: 700px) 50vw, 33vw" /></div><div className={styles.productInfo}><div><h2>{product.name}</h2><p>Core collection</p></div><strong>{product.price}</strong></div></article>)}</section><div className={styles.moreProducts}><Link href="/shop">View all pieces <ArrowRight size={16} /></Link></div></main>;
}
