import React from 'react'

import styles from './CategoryMobile.module.scss'
import ProductCard from './ProductCard'


const brandLogo = require('../static/img/brand-logo.png')
const productImage = require('../static/img/ProductCard-1.png')

interface Props {
  title: string,
  products?: any
}

const CategoryMobile = ({title, products}: Props) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <h2 className={styles.title_text}>{title}</h2>
        <div className={styles.title_counter}>2 из 3</div>
      </div>
      <div className={styles.products}>
        <ProductCard 
          title='Apple BYZ S852I'
          price={2927}
          image={productImage}
          logo={brandLogo}
        />
        <ProductCard 
          title='Apple BYZ S852I'
          price={2927}
          image={productImage}
          logo={brandLogo}
        />
        <ProductCard 
          title='Apple BYZ S852I'
          price={2927}
          image={productImage}
          logo={brandLogo}
        />
      </div>
    </div>
  )
}

export default CategoryMobile