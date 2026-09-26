"use client";

import { ArrowRight, ChevronLeft, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "../../Components/cart/CartContext";
import styles from "./cart.module.css";

export default function CartPage() {
  const { items, itemCount, subtotal, updateQuantity, removeItem } = useCart();
  const shipping = subtotal >= 150 || subtotal === 0 ? 0 : 12;
  const total = subtotal + shipping;

  if (!items.length) return <main className={styles.emptyCart}><span><ShoppingBag size={29} /></span><p className={styles.eyebrow}>Your bag</p><h1>Nothing here yet.</h1><p>Find something that feels like you, then it will be waiting right here.</p><Link href="/catalog">Explore the catalog <ArrowRight size={16} /></Link></main>;

  return <main className={styles.cartPage}>
    <div className={styles.cartHeading}><Link href="/catalog"><ChevronLeft size={16} /> Continue shopping</Link><p className={styles.eyebrow}>Your selection</p><h1>Your bag <span>({itemCount})</span></h1></div>
    <div className={styles.cartLayout}>
      <section className={styles.items} aria-label="Bag items">{items.map((item) => <article className={styles.cartItem} key={item.id}>
        <div className={styles.itemImage}><Image src={item.image} alt={item.name} fill sizes="(max-width: 640px) 30vw, 130px" /></div>
        <div className={styles.itemDetails}><div><p>{item.category}</p><h2>{item.name}</h2><small>{item.color}</small></div><strong>${item.price}</strong><div className={styles.itemActions}><div className={styles.quantity} aria-label={`Quantity for ${item.name}`}><button aria-label={`Decrease ${item.name} quantity`} onClick={() => updateQuantity(item.id, item.quantity - 1)}><Minus size={14} /></button><span>{item.quantity}</span><button aria-label={`Increase ${item.name} quantity`} onClick={() => updateQuantity(item.id, item.quantity + 1)}><Plus size={14} /></button></div><button className={styles.removeButton} onClick={() => removeItem(item.id)}><Trash2 size={15} /> Remove</button></div></div>
      </article>)}</section>
      <aside className={styles.summary}><h2>Order summary</h2><div><p>Subtotal <strong>${subtotal}</strong></p><p>Shipping <strong>{shipping ? `$${shipping}` : "Free"}</strong></p></div><div className={styles.total}><p>Total <small>USD</small></p><strong>${total}</strong></div><button className={styles.checkoutButton}>Proceed to checkout <ArrowRight size={16} /></button><p className={styles.shippingNote}>Shipping is complimentary on orders over $150.</p></aside>
    </div>
  </main>;
}
