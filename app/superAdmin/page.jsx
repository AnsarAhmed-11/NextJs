"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  Bell,
  Check,
  ChevronDown,
  Clock3,
  Database,
  FolderOpen,
  ImagePlus,
  MoreHorizontal,
  Search,
  Shield,
  ShieldCheck,
  SlidersHorizontal,
  Upload,
  UserRound,
  UsersRound,
  X,
} from "lucide-react";
import styles from "./superAdmin.module.css";

const startingUsers = [
  { id: 1, name: "Olivia Bennett", email: "olivia.bennett@northstar.co", initials: "OB", tone: "coral", role: "Admin", status: "Active", lastActive: "Now" },
  { id: 2, name: "Ethan Walker", email: "ethan.walker@northstar.co", initials: "EW", tone: "blue", role: "User", status: "Active", lastActive: "12 min ago" },
  { id: 3, name: "Maya Patel", email: "maya.patel@northstar.co", initials: "MP", tone: "gold", role: "User", status: "Pending", lastActive: "Never" },
  { id: 4, name: "Noah Williams", email: "noah.williams@northstar.co", initials: "NW", tone: "green", role: "Admin", status: "Active", lastActive: "Yesterday" },
  { id: 5, name: "Sophia Kim", email: "sophia.kim@northstar.co", initials: "SK", tone: "lavender", role: "User", status: "Active", lastActive: "2 days ago" },
];

export default function SuperAdminPage() {
  const [users, setUsers] = useState(startingUsers);
  const [query, setQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("All roles");
  const [notice, setNotice] = useState("");
  const [uploads, setUploads] = useState([]);
  const inputRef = useRef(null);

  const filteredUsers = useMemo(() => users.filter((user) => {
    const matchesQuery = `${user.name} ${user.email}`.toLowerCase().includes(query.toLowerCase());
    const matchesRole = roleFilter === "All roles" || user.role === roleFilter;
    return matchesQuery && matchesRole;
  }), [users, query, roleFilter]);

  const adminCount = users.filter((user) => user.role === "Admin").length;

  function toggleRole(id) {
    setUsers((current) => current.map((user) => {
      if (user.id !== id) return user;
      const nextRole = user.role === "Admin" ? "User" : "Admin";
      setNotice(`${user.name} is now an ${nextRole}.`);
      return { ...user, role: nextRole };
    }));
  }

  function handleUpload(event) {
    const files = Array.from(event.target.files || []);
    if (!files.length) return;
    const images = files.map((file) => ({ name: file.name, url: URL.createObjectURL(file) }));
    setUploads((current) => [...images, ...current].slice(0, 4));
    setNotice(`${files.length} image${files.length > 1 ? "s" : ""} ready to upload.`);
    event.target.value = "";
  }

  return (
    <main className={styles.dashboard}>
      <aside className={styles.sidebar}>
        <div className={styles.brand}><ShieldCheck size={23} /><span>Control</span></div>
        <nav className={styles.navigation} aria-label="Dashboard navigation">
          <button className={styles.navItem}><Database size={18} />Overview</button>
          <button className={`${styles.navItem} ${styles.activeNav}`}><UsersRound size={18} />User access</button>
          <Link href="/superAdmin/products" className={styles.navItem}><ImagePlus size={18} />Products</Link>
          <button className={styles.navItem}><Clock3 size={18} />Activity log</button>
        </nav>
        <div className={styles.sidebarBottom}>
          <div className={styles.helpBox}><Shield size={18} /><p>Only super admins can change access levels.</p></div>
          <button className={styles.account}><span className={`${styles.avatar} ${styles.adminAvatar}`}>SA</span><span><strong>Super Admin</strong><small>admin@northstar.co</small></span><ChevronDown size={15} /></button>
        </div>
      </aside>

      <section className={styles.content}>
        <header className={styles.topbar}>
          <div className={styles.breadcrumb}><span>Control center</span><span>/</span><strong>User access</strong></div>
          <div className={styles.headerActions}><button className={styles.iconButton} aria-label="Notifications"><Bell size={19} /><i /></button><span className={`${styles.avatar} ${styles.headerAvatar}`}>SA</span></div>
        </header>

        <div className={styles.pageIntro}>
          <div><p className={styles.eyebrow}>Access management</p><h1>People & permissions</h1><p>Manage who can administer your workspace and update its image library.</p></div>
          <button className={styles.inviteButton} onClick={() => setNotice("Invite flow opened. Connect this button to your backend when ready.")}><UserRound size={17} />Invite user</button>
        </div>

        {notice && <div className={styles.notice}><Check size={17} />{notice}<button onClick={() => setNotice("")} aria-label="Dismiss notice"><X size={16} /></button></div>}

        <section className={styles.metrics} aria-label="Workspace statistics">
          <article><span className={`${styles.metricIcon} ${styles.blueIcon}`}><UsersRound size={19} /></span><div><p>Total users</p><strong>{users.length}</strong><small><ArrowUpRight size={13} />2 this month</small></div></article>
          <article><span className={`${styles.metricIcon} ${styles.violetIcon}`}><ShieldCheck size={19} /></span><div><p>Administrators</p><strong>{adminCount}</strong><small>Full workspace access</small></div></article>
          <article><span className={`${styles.metricIcon} ${styles.orangeIcon}`}><ImagePlus size={19} /></span><div><p>Media assets</p><strong>{18 + uploads.length}</strong><small>Images in library</small></div></article>
        </section>

        <div className={styles.workspaceGrid}>
          <section className={styles.panel}>
            <div className={styles.panelHeading}><div><h2>Workspace members</h2><p>Assign administrator privileges to trusted users.</p></div><button className={styles.moreButton} aria-label="Member options"><MoreHorizontal size={20} /></button></div>
            <div className={styles.tableTools}>
              <label className={styles.search}><Search size={17} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search people" aria-label="Search people" /></label>
              <label className={styles.filter}><SlidersHorizontal size={16} /><select value={roleFilter} onChange={(event) => setRoleFilter(event.target.value)} aria-label="Filter by role"><option>All roles</option><option>Admin</option><option>User</option></select></label>
            </div>
            <div className={styles.memberTable}>
              <div className={`${styles.tableRow} ${styles.tableHeader}`}><span>Member</span><span>Role</span><span>Status</span><span>Last active</span><span aria-label="Actions" /></div>
              {filteredUsers.map((user) => <div className={styles.tableRow} key={user.id}>
                <span className={styles.person}><i className={`${styles.avatar} ${styles[user.tone]}`}>{user.initials}</i><span><strong>{user.name}</strong><small>{user.email}</small></span></span>
                <span><button className={`${styles.roleBadge} ${user.role === "Admin" ? styles.adminRole : styles.userRole}`} onClick={() => toggleRole(user.id)}>{user.role === "Admin" ? <ShieldCheck size={14} /> : <UserRound size={14} />}{user.role}</button></span>
                <span className={`${styles.status} ${user.status === "Active" ? styles.statusActive : styles.statusPending}`}><i />{user.status}</span>
                <span className={styles.lastActive}>{user.lastActive}</span>
                <button className={styles.rowMenu} aria-label={`More options for ${user.name}`}><MoreHorizontal size={19} /></button>
              </div>)}
            </div>
            <div className={styles.tableFooter}><span>Showing {filteredUsers.length} of {users.length} members</span><div><button disabled>Previous</button><button>Next</button></div></div>
          </section>

          <aside className={styles.rightRail}>
            <section className={`${styles.panel} ${styles.uploadPanel}`}>
              <div className={styles.panelHeading}><div><h2>Image library</h2><p>Upload images for your site.</p></div></div>
              <input ref={inputRef} className={styles.fileInput} type="file" accept="image/*" multiple onChange={handleUpload} />
              <button className={styles.dropzone} onClick={() => inputRef.current?.click()}><span><Upload size={20} /></span><strong>Upload images</strong><small>PNG, JPG or WEBP up to 10MB</small></button>
              <div className={styles.assetRow}><span className={styles.assetPreview}><FolderOpen size={17} /></span><span><strong>{uploads.length ? `${uploads.length} new image${uploads.length > 1 ? "s" : ""}` : "18 images"}</strong><small>Available in the media library</small></span><ArrowUpRight size={17} /></div>
              {uploads.length > 0 && <div className={styles.previewGrid}>{uploads.map((image) => <img key={image.url} src={image.url} alt={image.name} />)}</div>}
            </section>

            <section className={`${styles.panel} ${styles.activityPanel}`}>
              <div className={styles.panelHeading}><div><h2>Recent activity</h2><p>Latest workspace changes</p></div><button className={styles.viewAll} onClick={() => setNotice("Activity log opened.")}>View all</button></div>
              <ul className={styles.activityList}>
                <li><span className={`${styles.activityIcon} ${styles.blueIcon}`}><ShieldCheck size={15} /></span><p><strong>Olivia Bennett</strong> was made an admin<small>10 minutes ago</small></p></li>
                <li><span className={`${styles.activityIcon} ${styles.orangeIcon}`}><ImagePlus size={15} /></span><p><strong>3 images</strong> were added to the library<small>Yesterday at 4:23 PM</small></p></li>
                <li><span className={`${styles.activityIcon} ${styles.violetIcon}`}><UserRound size={15} /></span><p><strong>Maya Patel</strong> joined the workspace<small>Yesterday at 11:08 AM</small></p></li>
              </ul>
            </section>
          </aside>
        </div>
      </section>
    </main>
  );
}
