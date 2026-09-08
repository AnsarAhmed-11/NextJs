"use client"
import Image from 'next/image'
import React, { useState } from 'react'
import styles from "../Sections/section.module.css"
const SectionFirst = ({ setValue }) => {
  return (
    <>
      <section className={styles.sectionFirst}>
        <h1>THE Fashion Hub</h1>
        <div className={styles.models}>
          <Image src={"/model1.jpeg"} alt='model' height={200} width={200} />
          <Image src={"/model2.jpeg"} alt='model' height={200} width={200} />
          <Image src={"/model3.jpeg"} alt='model' height={250} width={200} />
          <Image src={"/model4.jpeg"} alt='model' height={250} width={200} />
          <Image src={"/model5.jpeg"} alt='model' height={250} width={200} />
        </div>
      </section>
    </>
  )
}

export default SectionFirst
