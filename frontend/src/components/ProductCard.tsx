import React, { FC, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { HOME_ROUTE, PRODUCT_ROUTE } from '../routes/consts'
import Carousel from './Carousel'
import styles from './ProductCard.module.scss'


const productImage = require('../static/img/ProductCard-1.png')
const caseImage = require('../static/img/case.png')


interface Props {
  title: string,
  price: number,
  discount?: number,
  image: string,
  imageList?: string[],
  logo?: string,
  extStyles?: string,
}

const ProductCard: FC<Props> = ({title, price, image, imageList, logo, extStyles}) => {
  const [isLiked, setIsLiked] = useState(false)

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsLiked(prevState => !prevState)
  }

  return (
    <div className={`${styles.card} ${extStyles ? extStyles : ''}`}>
      <div className={styles.top}>
        <img className={styles.logo} src={logo} />
        <button 
          className={`${styles.like} ${isLiked ? styles.like__active : ''}`} 
          onClick={handleClick}
        />
      </div>
      {imageList ?
        <Carousel extStyles={styles.carousel}>
          <img src={image} alt='' />
          {imageList.map((url, idx) => (
            <img src={url} alt='' key={url}/>
          ))}
        </Carousel>
      :
        <Carousel>
          <img src={image} alt="" />
        </Carousel>
      }
      <Link className={styles.bottom} to={PRODUCT_ROUTE + '/1'} >
        <span className={styles.title}>{title}</span>
        <div className={styles.bottom_right}>
          <span className={styles.price}>{price}</span>
          <div className={styles.discount}>
            <span className={styles.discount_price}>3527</span>
            <span className={styles.discount_perc}>-30 %</span>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default ProductCard