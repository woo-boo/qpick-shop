import React, { FC, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useActions } from '../hooks/useActions'
import { useTypedSelector } from '../hooks/useTypedSelector'

import { HOME_ROUTE, PRODUCT_ROUTE } from '../routes/consts'
import Carousel from './Carousel'
import styles from './ProductCard.module.scss'


const productImage = require('../static/img/ProductCard-1.png')
const caseImage = require('../static/img/case.png')


interface Props {
  id: number,
  title: string,
  price: number,
  discount?: number,
  image: string,
  imageList?: string[],
  logo?: string,
  extStyles?: string,
}

const ProductCard: FC<Props> = (props) => {
  const [isLiked, setIsLiked] = useState(false)

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsLiked(prevState => !prevState)
  }

  return (
    <div className={`${styles.card} ${props.extStyles ? props.extStyles : ''}`}>
      <div className={styles.top}>
        <img className={styles.logo} src={props.logo} />
        <button 
          className={`${styles.like} ${isLiked ? styles.like__active : ''}`} 
          onClick={handleClick}
        />
      </div>
      {props.imageList ?
        <Carousel extStyles={styles.carousel}>
          <img src={props.image} alt='' />
          {props.imageList.map((url) => (
            <img src={url} alt='' key={url}/>
          ))}
        </Carousel>
      :
        <Carousel extStyles={styles.carousel}>
          <img src={props.image} alt="" />
        </Carousel>
      }
      <Link className={styles.bottom} to={PRODUCT_ROUTE + `/${props.id}`} >
        <span className={styles.title}>{props.title}</span>
        <div className={styles.bottom_right}>
          <span className={styles.price}>
            {props.price.toString() + ' ₽'}
          </span>
            <div className={styles.discount}>
              {/* <span className={styles.discount_price}>
                {(props.price*(props.discount / 100 + 1)).toFixed().toString() + ' ₽'}
              </span>
              <span className={styles.discount_perc}>
                {props.discount.toString() + ' %'}
              </span> */}
            </div>
        </div>
      </Link>
    </div>
  )
}

export default ProductCard