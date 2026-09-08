"use client"
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Styles from "@/app/Components/layout/Header/navbar.module.css"
const Navbar = () => {
  const [value,setValue]=useState(null)
  useEffect(()=>{
    const loggedIn=localStorage.getItem("loggedin")
  },[])
  return (
    <>
      <nav className={Styles.navbar}>
        <Image src={"next.svg"} alt="logo" height={25} width={25} />
        <Link href="/">Home </Link>
        <Link href="/newcollections">New Collections</Link>
        <Link href="/catalog">Catalog</Link>
        <Link href="">New Arrival</Link>
        <Link href="">Shop</Link>
        {value ? (
          <Link href="">Cart</Link>
        ) : <Link href="/login">Login</Link>}
      </nav>
    </>
  )
}

export default Navbar