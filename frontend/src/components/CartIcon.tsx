import React from 'react'

import styles from './CartIcon.module.scss'


interface Props {
  amount: number
}

const CartIcon = ({amount}: Props) => {
  return (
    <div className={styles.cartIcon}>
      <img className={styles.cartIcon_img} src={require('../static/icons/cart.svg').default} />
      <div className={styles.cartIcon_marker}>{amount}</div>
    </div>
  )
}

export default CartIcon