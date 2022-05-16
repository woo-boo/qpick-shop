import React, { useState } from 'react'
import { useActions } from '../hooks/useActions'
import { useTypedSelector } from '../hooks/useTypedSelector'

import styles from './SideMenuItem.module.scss'

const arrowIcon = require('../static/icons/arrow.svg').default


interface Props {
  icon?: string,
  text: string,
  top?: boolean,
  children?: React.ReactNode
}

const SideMenuItem = ({icon, text, top, children}: Props) => {

  const [isOpen, setIsOpen] = useState(false)
  const [isActive, setIsActive] = useState(false)

  const {switchIsActiveAction} = useActions()

  const getArrowStyle = (): string => {
    let arrowStyle = styles.arrow

    if (isOpen) {
      arrowStyle += ` ${styles.arrow__open}`
    } else {
      arrowStyle += ` ${styles.arrow__closed}`
    }

    if (top) {arrowStyle += ` ${styles.arrow__right}`}

    return arrowStyle
  }

  const handleMenuClick = () => {
    setIsOpen(!isOpen)
    if (!children) {
      // switchIsActiveAction()
    }
  }

  return (
    <li className={styles.item}>
      <div className={styles.link} onClick={handleMenuClick}>
        {children && !top && <img src={arrowIcon} className={getArrowStyle()} />}
        {icon && <img className={styles.icon} src={icon} />}
        <span className={styles.text}>{text}</span>
        {children && top && <img src={arrowIcon} className={getArrowStyle()} />}
      </div>
      {children && isOpen && <ul className={styles.submenu}>{children}</ul>}
    </li>
  )
}

export default SideMenuItem