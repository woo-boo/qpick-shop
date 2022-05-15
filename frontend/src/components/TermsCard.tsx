import React, { FC } from 'react'

import styles from './TermsCard.module.scss'


interface Props {
  title: string,
  text: string
}

const TermsCard: FC<Props> = ({title, text}) => {
  return (
    <div className={styles.card}>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.text}>{text}</p>
    </div>
  )
}

export default TermsCard