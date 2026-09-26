import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import styles from "./section.module.css";

export default function SectionFirst() {
  return (
    <section className={styles.sectionFirst}>
      <div className={styles.copy}>
        <p className={styles.kicker}>The spring edit / 2026</p>
        <h1>Dress like<br /><em>you mean it.</em></h1>
        <p className={styles.description}>Thoughtfully chosen essentials for days that ask for a little more personality.</p>
        <div className={styles.ctas}><Link href="/newcollections">Shop the collection <ArrowRight size={16} /></Link><Link href="/catalog">Explore catalog</Link></div>
        <div className={styles.note}><span>01</span><p>New shapes, soft tailoring and expressive colour.</p></div>
      </div>
      <div className={styles.collage}>
        <div className={styles.imageOne}><Image src="/model3.jpeg" alt="Model wearing a contemporary look" fill priority sizes="(max-width: 850px) 75vw, 35vw" /></div>
        <div className={styles.imageTwo}><Image src="/model1.jpeg" alt="Editorial fashion portrait" fill sizes="(max-width: 850px) 40vw, 18vw" /></div>
        <span className={styles.edition}>LUMA<br />FORM</span>
      </div>
      <div className={styles.marquee}><span>Made for your every day</span><i /> <span>Made for your every day</span><i /> <span>Made for your every day</span></div>
    </section>
  );
}
