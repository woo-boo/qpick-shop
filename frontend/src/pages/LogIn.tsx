import React, { useState } from 'react'
import { useActions } from '../hooks/useActions'


interface Props {}

const LogIn = (props: Props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {logInAction} = useActions()

  const handleLogIn = () => {
    logInAction({email: email, password: password})
  }

  return (
    <div>
      <input 
        type='text'
        onChange={(e) => {setEmail(e.target.value)}}
      />
      <input 
        type='password'
        onChange={(e) => {setPassword(e.target.value)}}
      />
      <button 
        onClick={handleLogIn}
      >
        Log In
      </button>
    </div>
  )
}

export default LogIn