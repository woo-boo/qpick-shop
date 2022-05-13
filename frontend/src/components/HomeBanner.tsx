import React from 'react'

import styles from './HomeBanner.module.scss'


interface Props {
  title: string,
  image: string
}

const HomeBanner = ({title, image}: Props) => {
  return (
    <div className={styles.banner}>
      <div className={styles.title}>{title}</div>
      <img className={styles.image} src={image} />
    </div>
  )
}

export default HomeBanner