import React, { useEffect } from 'react'
import CategoryMobile from '../components/CategoryMobile'
import HomeBanner from '../components/HomeBanner'
import { useActions } from '../hooks/useActions'
import { useTypedSelector } from '../hooks/useTypedSelector'

import styles from './Home.module.scss'

const bannerImage = require('../static/img/home-banner.png')


interface Props {}

const Home = (props: Props) => {

  const {setHeaderTitleAction, fetchCategoriesAction} = useActions()

  const categories = useTypedSelector(state => state.category.categories)

  useEffect(() => {
    setHeaderTitleAction(null)
    fetchCategoriesAction()
  },[])

  return (
    <div className={styles.home}>
      <HomeBanner 
        title='Аксессуары для Iphone 13 Pro Max'
        image={bannerImage}
      />
      {categories.map(category => (
        <CategoryMobile 
          key={category.id}
          category={category}
        />
      ))}
    </div>
  )
}

export default Home