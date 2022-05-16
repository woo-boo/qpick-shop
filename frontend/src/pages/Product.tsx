import React, { FC, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Button from '../components/Button'
import CardDropdown from '../components/CardDropdown'
import ProductCard from '../components/ProductCard'
import { useActions } from '../hooks/useActions'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { BASE_URL } from '../http/urls'

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


interface RouteParams {
  readonly id: string
}

interface Props {}

const Product: FC<Props> = () => {
  const {setHeaderTitleAction, fetchProductAction} = useActions()
  const navigate = useNavigate()
  const params: any = useParams()
  const id: number = parseInt(params.id)

  const product = useTypedSelector(state => state.product.products[0])


  useEffect(() => {
    if (!id) {
      navigate('not_found')
    }
    setHeaderTitleAction('Продукт')
    fetchProductAction(id)
  }, [])

  if (product) {
    return (
      <div className={styles.wrapper}>
        <h2 className={styles.title}>Наушники</h2>
        <ProductCard
          id={product.id}
          title={product.productName}
          price={product.priceRub}
          image={BASE_URL + product.mainImage.url}
          imageList={product.images.map(obj => BASE_URL + obj.url)}
          extStyles={styles.product}
        />
        <CardDropdown 
          title='Описание и характеристики'
          text={product.description}
        />
        <div className={styles.buttons}>
          <Button icon={cartIcon} extStyles={styles.buttons_left} />
          <Button text='Купить сейчас' extStyles={styles.buttons_middle}/>
          <Button icon={whatsappIcon} extStyles={styles.buttons_right}/>
        </div>
      </div>
    )
  }

  return <></>
}

export default Product