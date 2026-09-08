"use client"
import Image from "next/image";
import Navbar from "./Components/layout/Header/Navbar";
import SectionFirst from "./Components/ui/Sections/SectionFirst";
import { useState } from "react";

export default function Home() {
  const [value,setValue]=useState(false)
  return (
    <>
    <Navbar/>
    <SectionFirst setValue={setValue}/>
    </>
  )
}
