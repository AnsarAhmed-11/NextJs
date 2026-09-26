"use client";

import { useRef, useState } from "react";
import {
  ArrowLeft,
  Bell,
  CheckCircle2,
  ChevronDown,
  Clock3,
  Database,
  ImagePlus,
  PackagePlus,
  Save,
  Shield,
  ShieldCheck,
  Upload,
  X,
} from "lucide-react";
import Link from "next/link";
import adminStyles from "../superAdmin.module.css";
import styles from "./productAdmin.module.css";
import axios from "axios";

const emptyProduct = {
  name: "",
  category: "Dresses",
  price: "",
  stock: "",
  color: "",
  slug: "",
  description: "",
  status: "Draft",
  featured: false,
};

export default function ProductAdminPage() {
  const [form, setForm] = useState(emptyProduct);
  const [image, setImage] = useState(null);
  const [products, setProducts] = useState([]);
  const [notice, setNotice] = useState("");
  const inputRef = useRef(null);

  function updateField(event) {
    const { name, value, type, checked } = event.target;
    setForm((current) => ({ ...current, [name]: type === "checkbox" ? checked : value }));
  }

  function createSlug(name) {
    return name.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  }

  function handleNameChange(event) {
    const name = event.target.value;
    setForm((current) => ({ ...current, name, slug: current.slug || createSlug(name) }));
  }

  function handleImage(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    setImage({ name: file.name, url: URL.createObjectURL(file) });
    event.target.value = "";
  }

async function submitProduct(event) {
  event.preventDefault();

  if (!form.name || !form.price || !form.stock || !image) {
    setNotice("Add a product name, price, stock quantity, and product image first.");
    return;
  }

  const productPayload = {
    ...form,
    price: Number(form.price),
    stock: Number(form.stock),
    imageName: image.name,
  };

  console.log("Product form payload:", productPayload);

  try {
    const response = await axios.post("/api/products", productPayload, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = response.data;
    console.log("Product API response:", result);

    setProducts((current) => [
      {
        ...productPayload,
        id: Date.now(),
        image: image.url,
      },
      ...current,
    ]);

    setNotice(`${form.name} was sent to /api/products and logged to the console.`);
    setForm(emptyProduct);
    setImage(null);
  } catch (error) {
    console.error("Product submission failed:", error);

    setNotice(
      error.response?.data?.message ||
      "The product could not be sent. Check the browser console."
    );
  }
}


  return (
    <main className={adminStyles.dashboard}>
      <aside className={adminStyles.sidebar}>
        <div className={adminStyles.brand}><ShieldCheck size={23} /><span>Control</span></div>
        <nav className={adminStyles.navigation} aria-label="Dashboard navigation">
          <Link href="/superAdmin" className={adminStyles.navItem}><Database size={18} />Overview</Link>
          <Link href="/superAdmin" className={adminStyles.navItem}><Shield size={18} />User access</Link>
          <Link href="/superAdmin/products" className={`${adminStyles.navItem} ${adminStyles.activeNav}`}><ImagePlus size={18} />Products</Link>
          <button className={adminStyles.navItem}><Clock3 size={18} />Activity log</button>
        </nav>
        <div className={adminStyles.sidebarBottom}>
          <div className={adminStyles.helpBox}><Shield size={18} /><p>Products remain drafts until your API is connected.</p></div>
          <button className={adminStyles.account}><span className={`${adminStyles.avatar} ${adminStyles.adminAvatar}`}>SA</span><span><strong>Super Admin</strong><small>admin@northstar.co</small></span><ChevronDown size={15} /></button>
        </div>
      </aside>

      <section className={adminStyles.content}>
        <header className={adminStyles.topbar}>
          <div className={adminStyles.breadcrumb}><span>Control center</span><span>/</span><strong>Products</strong></div>
          <div className={adminStyles.headerActions}><button className={adminStyles.iconButton} aria-label="Notifications"><Bell size={19} /><i /></button><span className={`${adminStyles.avatar} ${adminStyles.headerAvatar}`}>SA</span></div>
        </header>

        <div className={styles.pageIntro}>
          <div><Link href="/superAdmin" className={styles.backLink}><ArrowLeft size={15} /> Back to control center</Link><p className={adminStyles.eyebrow}>Product management</p><h1>Add a product</h1><p>Create product details, add an image, and save it as a draft or publish-ready entry.</p></div>
          <div className={styles.introBadge}><PackagePlus size={19} /><span>Manual product entry</span></div>
        </div>

        {notice && <div className={`${adminStyles.notice} ${styles.notice}`}><CheckCircle2 size={17} />{notice}<button onClick={() => setNotice("")} aria-label="Dismiss notice"><X size={16} /></button></div>}

        <form className={styles.productLayout} onSubmit={submitProduct}>
          <section className={styles.formPanel}>
            <div className={styles.panelHeading}><div><h2>Product information</h2><p>Fields marked with an asterisk are required.</p></div></div>
            <div className={styles.formBody}>
              <label className={styles.fullField}>Product name *<input name="name" value={form.name} onChange={handleNameChange} placeholder="e.g. Linen column dress" /></label>
              <div className={styles.fieldGrid}>
                <label>Category *<select name="category" value={form.category} onChange={updateField}><option>Dresses</option><option>Tops</option><option>Tailoring</option><option>Shirts</option><option>Accessories</option></select></label>
                <label>Colour<input name="color" value={form.color} onChange={updateField} placeholder="e.g. Bone" /></label>
              </div>
              <div className={styles.fieldGrid}>
                <label>Price (USD) *<div className={styles.currencyField}><span>$</span><input name="price" value={form.price} onChange={updateField} type="number" min="0" step="0.01" placeholder="0.00" /></div></label>
                <label>Stock quantity *<input name="stock" value={form.stock} onChange={updateField} type="number" min="0" placeholder="0" /></label>
              </div>
              <label className={styles.fullField}>Product slug<input name="slug" value={form.slug} onChange={updateField} placeholder="linen-column-dress" /><small>Used in the product URL. You can edit the generated value.</small></label>
              <label className={styles.fullField}>Description<textarea name="description" value={form.description} onChange={updateField} rows="5" placeholder="Write a short product description..." /></label>
            </div>
          </section>

          <aside className={styles.rightRail}>
            <section className={styles.formPanel}>
              <div className={styles.panelHeading}><div><h2>Product image *</h2><p>Use a clear product photograph.</p></div></div>
              <div className={styles.imageBody}>
                <input ref={inputRef} className={adminStyles.fileInput} type="file" accept="image/png,image/jpeg,image/webp" onChange={handleImage} />
                {image ? <div className={styles.imagePreview}><img src={image.url} alt={image.name} /><button type="button" onClick={() => setImage(null)} aria-label="Remove image"><X size={16} /></button><span>{image.name}</span></div> : <button type="button" className={styles.imageDropzone} onClick={() => inputRef.current?.click()}><span><Upload size={21} /></span><strong>Upload product image</strong><small>PNG, JPG or WEBP up to 10MB</small></button>}
                {image && <button type="button" className={styles.changeImage} onClick={() => inputRef.current?.click()}>Replace image</button>}
              </div>
            </section>
            <section className={styles.formPanel}>
              <div className={styles.panelHeading}><div><h2>Publishing</h2><p>Choose how this product should appear.</p></div></div>
              <div className={styles.publishBody}>
                <div className={styles.statusChoices}><label className={form.status === "Draft" ? styles.selectedStatus : ""}><input type="radio" name="status" value="Draft" checked={form.status === "Draft"} onChange={updateField} /><span><strong>Save as draft</strong><small>Visible only in the dashboard</small></span></label><label className={form.status === "Published" ? styles.selectedStatus : ""}><input type="radio" name="status" value="Published" checked={form.status === "Published"} onChange={updateField} /><span><strong>Ready to publish</strong><small>Will go live after API connection</small></span></label></div>
                <label className={styles.featuredToggle}><input type="checkbox" name="featured" checked={form.featured} onChange={updateField} /><span><strong>Feature on home page</strong><small>Mark this product as a storefront highlight.</small></span></label>
              </div>
            </section>
          </aside>

          <div className={styles.formActions}><button type="button" className={styles.cancelButton} onClick={() => { setForm(emptyProduct); setImage(null); }}>Clear form</button><button type="submit" className={styles.saveButton}><Save size={16} />Save product</button></div>
        </form>

        {products.length > 0 && <section className={styles.recentProducts}><div><p className={adminStyles.eyebrow}>This session</p><h2>Recently added</h2></div><div className={styles.recentGrid}>{products.map((product) => <article key={product.id}><img src={product.image} alt={product.name} /><div><span>{product.category} / {product.status}</span><h3>{product.name}</h3><p>${product.price} · {product.stock} in stock</p></div></article>)}</div></section>}
      </section>
    </main>
  );
}
