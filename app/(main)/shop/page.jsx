import { ArrowRight, Check, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import styles from "../storefront.module.css";

const picks = [
  { image: "/model6.jpeg", name: "Relaxed cotton shirt", price: "$92" },
  { image: "/model1.jpeg", name: "Linen column dress", price: "$148" },
  { image: "/model4.jpeg", name: "Wide leg trouser", price: "$128" },
  { image: "/model5.jpeg", name: "Sculpted jersey dress", price: "$116" },
];

export default function ShopPage() {
  return <main className={styles.storefront}><section className={styles.shopHero}><div><p className={styles.eyebrow}>The Luma selection</p><h1>Designed for<br />the real world.</h1><p>Wearable, expressive and made to feel like you.</p><Link href="/catalog" className={styles.darkLink}>Browse everything <ArrowRight size={16} /></Link></div><div className={styles.shopHeroImage}><Image src="/pic3.jpg" alt="Luma Form curated fashion" fill priority sizes="(max-width: 800px) 100vw, 50vw" /></div></section><section className={styles.shopBenefits}><p><Check size={16} /> Small-batch collections</p><p><Check size={16} /> Easy 30-day returns</p><p><Check size={16} /> Complimentary shipping over $150</p></section><section className={styles.pickSection}><div className={styles.sectionTitle}><p className={styles.eyebrow}>Curated for now</p><h2>Most wanted</h2><Link href="/catalog">See catalog <ArrowRight size={14} /></Link></div><div className={styles.productGrid}>{picks.map((pick) => <article className={styles.productCard} key={pick.name}><div className={styles.productImage}><button aria-label={`Add ${pick.name} to bag`}><ShoppingBag size={17} /></button><Image src={pick.image} alt={pick.name} fill sizes="(max-width: 700px) 50vw, 25vw" /></div><div className={styles.productInfo}><div><h2>{pick.name}</h2><p>Core collection</p></div><strong>{pick.price}</strong></div></article>)}</div></section></main>;
}
