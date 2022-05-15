import React from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import { HOME_ROUTE } from '../routes/consts'

import styles from './Cart.module.scss'

const cartImage = require('../static/img/cart.svg').default


interface Props {}

const Cart = (props: Props) => {
  const navigate = useNavigate()

  return (
    <div className={styles.cart}>
      <div className={styles.empty}>
        <img className={styles.empty_image} src={cartImage}/>
        <div className={styles.empty_text}>Корзина пуста</div>
      </div>
      <Button text='В каталог товаров' onClick={() => navigate(HOME_ROUTE)}/>
    </div>
  )
}

export default Cart