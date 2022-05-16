import React, { FC } from 'react'
import { useNavigate } from 'react-router-dom'

import styles from './ContactCard.module.scss'


interface Props {
  icon: string,
  href: string,
}

const ContactCard: FC<Props> = ({icon, href}) => {
  const navigate = useNavigate()

  return (
    <a className={styles.card} href={href}>
      <img className={styles.icon} src={icon} alt='' />
    </a>
  )
}

export default ContactCard