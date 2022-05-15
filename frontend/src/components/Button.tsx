import React, { FC } from 'react'

import styles from './Button.module.scss'


type ClickEventHandler = (e: React.MouseEvent<HTMLButtonElement>) => void


interface Props {
  text?: string,
  icon?: string,
  extStyles?: string,
  onClick?: ClickEventHandler
}

const Button: FC<Props> = ({text, icon, extStyles, onClick}) => {
  return (
    <button 
      className={`${styles.button} ${extStyles ? extStyles : ''}`}
      onClick={onClick}
    >
      <span>{text}</span>
      <img src={icon} alt="" />
    </button>
  )
}

export default Button