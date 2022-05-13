import React from 'react'
import { useNavigate } from 'react-router-dom'

import styles from './HeaderMobile.module.scss'
import Menu from './Menu'
import CartIcon from './CartIcon'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { HOME_ROUTE } from '../routes/consts'


const backIcon = require('../static/icons/back.svg').default


interface Props {
}

const Header = ({}: Props) => {

  const title = useTypedSelector(state => state.app.headerTitle)
  const navigate = useNavigate()

  const headerTitle = (
    <div className={styles.header_left}>
      <button
        className={styles.header_button}
        onClick={() => navigate(HOME_ROUTE)}
      >
        {/* <img src={backIcon} /> */}
      </button>
      <div className={styles.header_title}>{title}</div>
    </div>
  )

  const headerLogo = (
    <div className={styles.header_left}>
      <div className={styles.header_logo}>
          <span>qpick</span>
      </div>
    </div>
  )

  return (
    <header className={styles.header}>
      {title ? headerTitle : headerLogo}
      <div className={styles.header_right}>
        <CartIcon amount={1} />
        <Menu />
      </div>
    </header>
  )
}

export default Header