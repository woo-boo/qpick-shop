import React from 'react'

import styles from './ProductCard.module.scss'


interface Props {
  title: string,
  price: number,
  discount?: number,
  image: string,
  logo?: string,
}

const ProductCard = ({title, price, image, logo}: Props) => {
  return (
    <div className={styles.card}>
      <div className={styles.top}>
        <img className={styles.logo} src={logo} />
        <div className={`${styles.like} `} />
      </div>
      <div className={styles.image}>
        <img src={image} />
      </div>
      <div className={styles.bottom}>
        <span className={styles.title}>{title}</span>
        <div className={styles.bottom_right}>
          <span className={styles.price}>{price}</span>
          <div className={styles.discount}>
            <span className={styles.discount_price}>3527</span>
            <span className={styles.discount_perc}>-30 %</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductCard