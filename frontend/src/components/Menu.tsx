import React from 'react'
import { useActions } from '../hooks/useActions'
import { useTypedSelector } from '../hooks/useTypedSelector'

import styles from './Menu.module.scss'
import SideMenu from './SideMenu'


interface Props {}

const Menu = (props: Props) => {
  const isActive = useTypedSelector(state => state.menu.isActive)
  const {switchIsActiveAction} = useActions()

  const handleClick = () => {
    switchIsActiveAction()
  }

  return (
    <>
      <div className={styles.menu} onClick={handleClick}>
        <img className={styles.menu_icon} src={require('../static/icons/menu.svg').default} />
      </div>
      <SideMenu />
    </>
  )
}

export default Menu