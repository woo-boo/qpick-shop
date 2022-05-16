import React, { useState } from 'react'
import { useActions } from '../hooks/useActions'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { CONTACTS_ROUTE, FAVORITES_ROUTE, TERMS_ROUTE } from '../routes/consts'

import styles from './SideMenu.module.scss'
import SideMenuItem from './SideMenuItem'
import SideMenuLink from './SideMenuLink'


const smartphoneIco = require('../static/icons/smartphone.svg').default
const favoritesIco = require('../static/icons/favorites.svg').default
const termsIco = require('../static/icons/terms.svg').default
const phoneIco = require('../static/icons/phone.svg').default


interface Props {}

const SideMenu = (props: Props) => {
  const isActive = useTypedSelector(state => state.menu.isActive)
  const {switchIsActiveAction} = useActions()

  const handleClick = () => {
    switchIsActiveAction()
  }
  
  return (
    <>
      <nav className={`${styles.menu} ${isActive ? styles.menu__active : ''}`}>
        <ul>
          <SideMenuItem icon={smartphoneIco} top={true} text='Выбрать модель телефона' >
            <SideMenuItem text='Apple'>
              <SideMenuItem text='IPhone 12' />
              <SideMenuItem text='IPhone 12 Max' />
            </SideMenuItem>
          </SideMenuItem>
          <SideMenuLink icon={favoritesIco} text='Избранное' href={FAVORITES_ROUTE}/>
          <SideMenuLink icon={termsIco} text='Условия сервиса' href={TERMS_ROUTE}/>
          <SideMenuLink icon={phoneIco} text='Контакты' href={CONTACTS_ROUTE}/>
        </ul>
      </nav>
      <div className={`${styles.menu_shadow} ${isActive ? styles.menu_shadow__active : ''}`} onClick={handleClick}/>
    </>
  )
}

export default SideMenu