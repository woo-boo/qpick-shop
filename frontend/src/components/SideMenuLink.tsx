import React, { useState } from 'react'

import { Link } from 'react-router-dom'
import { useActions } from '../hooks/useActions'
import styles from './SideMenuItem.module.scss'


interface Props {
  icon?: string,
  text: string,
  href: string
}

const SideMenuLink = ({icon, text, href}: Props) => {
  const {switchIsActiveAction} = useActions()

  const handleClick = () => {
    switchIsActiveAction()
  }

  return (
    <li className={styles.item}>
      <Link className={styles.link} to={href} onClick={handleClick}>
        {icon && <img className={styles.icon} src={icon} />}
        <span className={styles.text}>{text}</span>
      </Link>
    </li>
  )
}

export default SideMenuLink