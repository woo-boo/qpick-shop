import React, { Children, FC, ReactNode, useEffect, useState } from 'react'
import { Swiper, SwiperSlide} from 'swiper/react'

import styles from './Carousel.module.scss'


const productImage = require('../static/img/ProductCard-1.png')

interface Props {
  extStyles?: string,
  children: ReactNode
}

const Carousel: FC<Props> = ({extStyles, children}) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [length, setLength] = useState(Children.count(children))
  const [touchPosition, setTouchPosition] = useState<number|null>(null)

  const indicators = new Array(length).fill(0)

  useEffect(() => {
    setLength(Children.count(children))
  },[children])

  const next = () => {
    if (currentIndex < (length - 1)) {
      setCurrentIndex(prevState => prevState + 1)
    }
  }

  const prev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prevState => prevState - 1)
    }
  }
  
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouchPosition(e.touches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (touchPosition === null) {
      return
    }

    const currentTouch = e.touches[0].clientX
    const diff = touchPosition - currentTouch

    if (diff > 5) {
      next()
    }

    if (diff < -5) {
      prev()
    }

    setTouchPosition(null)
  }

  return (
    <div 
      className={`${styles.carousel} ${extStyles ? extStyles : ''}`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
    >
      <div className={styles.wrapper}>
        <div 
          className={styles.content}
          style={{transform: `translateX(-${currentIndex*100}%)`}}
        >{children}</div>
      </div>
      {length > 1 && 
        <ol className={styles.indicators}>
          {indicators.map((_,index) => (
            <li 
              className={`${styles.indicator} ${index === currentIndex ? styles.indicator__active : ''}`}
            ></li>
          ))}
        </ol>
      }
    </div>
  )
}

export default Carousel