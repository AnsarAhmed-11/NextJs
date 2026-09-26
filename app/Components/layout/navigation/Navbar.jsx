"use client";

import { Menu, Search, ShoppingBag, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useCart } from "../../cart/CartContext";
import styles from "./navbar.module.css";

const links = [
  { href: "/", label: "Home" },
  { href: "/newcollections", label: "Collections" },
  { href: "/catalog", label: "Catalog" },
  { href: "/newarrival", label: "New arrival" },
  { href: "/shop", label: "Shop" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const { itemCount } = useCart();

  return (
    <header className={styles.header}>
      <nav className={styles.navbar} aria-label="Primary navigation">
        <Link href="/" className={styles.brand} onClick={() => setIsOpen(false)}><span>LF</span> Luma Form</Link>
        <div className={`${styles.links} ${isOpen ? styles.linksOpen : ""}`}>
          {links.map((link) => <Link key={link.href} href={link.href} onClick={() => setIsOpen(false)} className={pathname === link.href ? styles.active : ""}>{link.label}</Link>)}
          <Link href="/SignUp" className={styles.mobileJoin} onClick={() => setIsOpen(false)}>Join us</Link>
        </div>
        <div className={styles.actions}>
          <button className={styles.iconButton} aria-label="Search"><Search size={18} /></button>
          <Link href="/cart" className={styles.bagButton} aria-label={`Shopping bag with ${itemCount} items`}><ShoppingBag size={18} /><span>{itemCount}</span></Link>
          <Link href="/SignUp" className={styles.join}>Join us</Link>
          <button className={styles.menuButton} onClick={() => setIsOpen((open) => !open)} aria-label="Toggle menu" aria-expanded={isOpen}>{isOpen ? <X size={21} /> : <Menu size={21} />}</button>
        </div>
      </nav>
    </header>
  );
}
