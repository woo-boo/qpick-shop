import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import { useActions } from '../hooks/useActions'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { HOME_ROUTE } from '../routes/consts'

import styles from './LogIn.module.scss'


interface Props {}

const LogIn = (props: Props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const isAuth = useTypedSelector(state => state.me.isAuth)

  const {logInAction} = useActions()

  const handleLogIn = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault()
    logInAction({email: email, password: password})
    if (isAuth) {
      navigate(HOME_ROUTE)
    }
  }

  return (
    <div className={styles.login}>
      <form className={styles.form}>
        <input
          type='text'
          placeholder='Имя пользователя'
          onChange={(e) => {setEmail(e.target.value)}}
        />
        <input 
          type='password'
          placeholder='Пароль'
          onChange={(e) => {setPassword(e.target.value)}}
        />
        <Button 
          text='Войти'
          onClick={handleLogIn}
        />
      </form>
    </div>
  )
}

export default LogIn