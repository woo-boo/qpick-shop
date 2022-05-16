import React, { FC } from 'react'

import AppRouter from './routes/AppRouter'
import './index.scss'
import HeaderMobile from './components/HeaderMobile'

import styles from './App.module.scss'


interface Props {}

const App = (props: Props) => {
  return (
    <div className={styles.App}>
      <HeaderMobile />
      <AppRouter />
    </div>
  )
}

export default App
