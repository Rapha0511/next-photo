import React from 'react'
import styles from "../styles/ImageNotFound.module.css"
export default function ImageNotFoundComponent() {
  return (
    <div className={styles.ImageNotFoundComponent}>
        <h1 className={styles.titre}><a className={styles.code} href="#">404</a></h1>
        <p className={styles.text}>There's nothing here.</p>
        <div className={styles.travolta}></div>
    </div>
  )
}
