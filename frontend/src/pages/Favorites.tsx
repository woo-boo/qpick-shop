import React, { FC, useEffect } from 'react'

import styles from './Favorites.module.scss'
import { useActions } from '../hooks/useActions'
import ProductCard from '../components/ProductCard'

const caseImage = require('../static/img/case.png')
const phonesImage = require('../static/img/ProductCard-1.png')


interface Props {}

const Favorites: FC<Props> = (props) => {

  const {setHeaderTitleAction} = useActions()

  useEffect(() => {
    setHeaderTitleAction('Избранное')
  }, [])

  return (
    <div className={styles.favorites}>
      <div className={styles.products}>
        <ProductCard 
          title='Apple BYZ S852I'
          price={2927}
          image={phonesImage}
        />
        <ProductCard
          title='Apple BYZ S852I'
          price={2927}
          image={caseImage}
        />
      </div>
    </div>
  )
}

export default Favorites