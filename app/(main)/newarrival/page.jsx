import { ArrowRight, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import styles from "../storefront.module.css";

const arrivals = [
  { image: "/model2.jpeg", name: "The off-duty set", price: "$174" },
  { image: "/model5.jpeg", name: "Gathered poplin skirt", price: "$118" },
  { image: "/model3.jpeg", name: "Fine knit cardigan", price: "$104" },
];

export default function NewArrivalPage() {
  return <main className={styles.storefront}><section className={styles.arrivalHero}><div className={styles.arrivalImage}><Image src="/model4.jpeg" alt="New arrival statement look" fill priority sizes="(max-width: 800px) 100vw, 52vw" /></div><div className={styles.arrivalCopy}><p className={styles.eyebrow}><Sparkles size={14} /> Just landed</p><h1>Fresh, without<br />trying too hard.</h1><p>The latest arrivals bring quiet confidence to your everyday wardrobe.</p><Link href="/shop" className={styles.lightLink}>Shop new arrivals <ArrowRight size={16} /></Link></div></section><section className={styles.arrivalSection}><div className={styles.arrivalLead}><p className={styles.eyebrow}>This week&apos;s drop</p><h2>Worth a closer look.</h2><p>Small-batch pieces designed for repeat wear.</p></div><div className={styles.arrivalGrid}>{arrivals.map((item) => <article key={item.name}><div><Image src={item.image} alt={item.name} fill sizes="(max-width: 700px) 85vw, 28vw" /></div><h3>{item.name}</h3><p>{item.price}</p></article>)}</div></section></main>;
}
