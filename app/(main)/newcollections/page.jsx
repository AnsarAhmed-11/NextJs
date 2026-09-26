import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import styles from "../storefront.module.css";

const edits = [
  { image: "/model1.jpeg", title: "Soft structure", text: "Easy layers that move from morning to late plans." },
  { image: "/model4.jpeg", title: "Modern classics", text: "Clean lines, familiar shapes and considered details." },
  { image: "/model5.jpeg", title: "After hours", text: "A bolder point of view for every invitation." },
];

export default function NewCollectionsPage() {
  return <main className={styles.storefront}>
    <section className={styles.collectionHero}>
      <div><p className={styles.eyebrow}>Collection 01 / Spring 2026</p><h1>New forms<br />for right now.</h1><p>Pieces with room for everyday life, designed to be reached for again and again.</p><Link href="/shop" className={styles.darkLink}>Shop the edit <ArrowRight size={16} /></Link></div>
      <div className={styles.heroImage}><Image src="/model6.jpeg" alt="New collection fashion look" fill priority sizes="(max-width: 800px) 100vw, 48vw" /></div>
    </section>
    <section className={styles.editSection}><div className={styles.sectionTitle}><p className={styles.eyebrow}>Choose your mood</p><h2>The new collection</h2></div><div className={styles.editGrid}>{edits.map((edit, index) => <article key={edit.title} className={styles.editCard}><div className={styles.editImage}><Image src={edit.image} alt={edit.title} fill sizes="(max-width: 700px) 100vw, 33vw" /><span>0{index + 1}</span></div><h3>{edit.title}</h3><p>{edit.text}</p><Link href="/shop">Discover <ArrowRight size={14} /></Link></article>)}</div></section>
  </main>;
}
