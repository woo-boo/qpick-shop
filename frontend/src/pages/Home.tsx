import React, { useEffect } from 'react'
import CategoryMobile from '../components/CategoryMobile'
import HomeBanner from '../components/HomeBanner'
import { useActions } from '../hooks/useActions'

import styles from './Home.module.scss'

const bannerImage = require('../static/img/home-banner.png')


interface Props {}

const Home = (props: Props) => {

  const {setHeaderTitleAction} = useActions()

  useEffect(() => {
    setHeaderTitleAction(null)
  })

  return (
    <div className={styles.home}>
      <HomeBanner 
        title='Аксессуары для Iphone 13 Pro Max'
        image={bannerImage}
      />
      <CategoryMobile title='Категория 1' />
      <CategoryMobile title='Категория 2' />
      <CategoryMobile title='Категория 3' />
    </div>
  )
}

export default Home