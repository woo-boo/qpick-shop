import React, { FC } from 'react'
import { BASE_URL } from '../http/urls'
import { CategoryInterface } from '../types/category'

import styles from './CategoryMobile.module.scss'
import ProductCard from './ProductCard'


const brandLogo = require('../static/img/brand-logo.png')
const productImage = require('../static/img/ProductCard-1.png')

interface Props {
  // title: string,
  // products?: any,
  category: CategoryInterface
}

const CategoryMobile: FC<Props> = ({category}) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <h2 className={styles.title_text}>{category.categoryName}</h2>
        {/* <div className={styles.title_counter}>2 из 3</div> */}
      </div>
      <div className={styles.products}>
        {category.products.slice(0,3).map((product) => (
          <ProductCard 
            key={product.id}
            id={product.id}
            title={product.productName}
            price={product.priceRub}
            image={product.mainImage ? BASE_URL+product.mainImage.url : ''}
            discount={product.discount}
          />
        ))}
      </div>
    </div>
  )
}

export default CategoryMobile