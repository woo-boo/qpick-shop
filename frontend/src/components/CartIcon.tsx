import React from 'react'
import { Link } from 'react-router-dom'
import { CART_ROUTE } from '../routes/consts'

import styles from './CartIcon.module.scss'


interface Props {
  amount: number
}

const CartIcon = ({amount}: Props) => {
  return (
    <Link className={styles.cartIcon} to={CART_ROUTE}>
      <img className={styles.cartIcon_img} src={require('../static/icons/cart.svg').default} />
      {amount !== 0 && 
        <div className={styles.cartIcon_marker}>{amount}</div>
      }
    </Link>
  )
}

export default CartIcon