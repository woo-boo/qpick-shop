import React, { FC, ReactNode, useState } from 'react'

import styles from './CardDropdown.module.scss'


interface Props {
  title: string,
  text?: string
}

const CardDropdown: FC<Props> = ({title, text}) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleClick = () => {
    setIsOpen(prevState => !prevState)
  }

  return (
    <div className={styles.card}>
      <div className={styles.top} onClick={handleClick}>
        <div className={styles.top_left}>
          <span className={styles.title}>{title}</span>
        </div>
        <div className={styles.top_right}>
          <div className={`${styles.arrow} ${!isOpen ? styles.arrow__closed : ''}`} />
        </div>
      </div>
      <div className={`${styles.content} ${isOpen ? styles.content__open : ''}`}>
        <pre className={styles.text}>{text}</pre>
      </div>
    </div>
  )
}

export default CardDropdown