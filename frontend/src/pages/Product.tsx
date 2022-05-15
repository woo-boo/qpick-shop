import React, { useEffect } from 'react'
import Button from '../components/Button'
import CardDropdown from '../components/CardDropdown'
import Carousel from '../components/Carousel'
import ProductCard from '../components/ProductCard'
import { useActions } from '../hooks/useActions'

import styles from './Product.module.scss'


const productImage = require('../static/img/ProductCard-1.png')
const caseImage = require('../static/img/case.png')

const cartIcon = require('../static/icons/cart-white.svg').default
const whatsappIcon = require('../static/icons/whatsapp.png')

const imageList = [
  productImage,
  caseImage,
  caseImage,
  productImage
]

const text =
`Bluetooth: 5.0
Влагозащита: Да
Время работы: 6 ч
Время работы в режиме разговора: 4 ч
Емкость Кейса: 45 мАч
`


interface Props {}

const Product = (props: Props) => {
  const {setHeaderTitleAction} = useActions()

  useEffect(() => {
    setHeaderTitleAction('Продукт')
  }, [])

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Наушники</h2>
      <ProductCard
        title='Apple BYZ S852I'
        price={2927}
        image={productImage}
        imageList={imageList}
        extStyles={styles.product}
      />
      <CardDropdown 
        title='Описание и характеристики'
        text={text}
      />
      <div className={styles.buttons}>
        <Button icon={cartIcon} extStyles={styles.buttons_left} />
        <Button text='Купить сейчас' extStyles={styles.buttons_middle}/>
        <Button icon={whatsappIcon} extStyles={styles.buttons_right}/>
      </div>
    </div>
  )
}

export default Product