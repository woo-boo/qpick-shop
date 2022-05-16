import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import ContactCard from '../components/ContactCard'

import { useActions } from '../hooks/useActions'
import { HOME_ROUTE } from '../routes/consts'
import styles from './Contacts.module.scss'


const whatsappIcon = require('../static/icons/whatsapp.svg').default
const instagramIcon = require('../static/icons/instagram.svg').default
const telegramIcon = require('../static/icons/telegram.svg').default
const vkIcon = require('../static/icons/vk.svg').default


interface Props {}

const Contacts = (props: Props) => {
  const navigate = useNavigate()
  const {setHeaderTitleAction} = useActions()

  useEffect(() => {
    setHeaderTitleAction('Контакты')
  }, [])

  return (
    <div className={styles.contacts}>
      <div className={styles.cards}>
        <ContactCard icon={whatsappIcon} href='' />
        <ContactCard icon={instagramIcon} href='' />
        <ContactCard icon={telegramIcon} href='' />
        <ContactCard icon={vkIcon} href='' />
      </div>
      <a className={styles.phone} href='tel:+77777777777'>
        <div className={styles.phone_icon} />
        <span className={styles.phone_number}>+7 777 777 77 77</span>
      </a>
      <Button 
        text='На главную' 
        onClick={() => navigate(HOME_ROUTE)}
        extStyles={styles.button}
      />
    </div>
  )
}

export default Contacts