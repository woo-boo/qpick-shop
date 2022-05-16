import React, { FC, useEffect } from 'react'

import styles from './Terms.module.scss'
import { useActions } from '../hooks/useActions'
import TermsCard from '../components/TermsCard'
import Button from '../components/Button'
import { useNavigate } from 'react-router-dom'
import { HOME_ROUTE } from '../routes/consts'


interface Props {}

const Terms: FC<Props> = () => {
  const {setHeaderTitleAction} = useActions()
  const navigate = useNavigate()

  useEffect(() => {
    setHeaderTitleAction('Условия сервиса')
  }, [])

  const handleClick = () => {
    navigate(HOME_ROUTE)
  }


  return (
    <div className={styles.terms}>
      <TermsCard
        title='Условия сервиса'
        text={`Задача организации, в особенности же курс на социально-ориентированный 
              национальный проект требует от нас системного анализа модели развития! 
              Таким образом, постоянное информационно-техническое обеспечение нашей деятельности требует 
              от нас анализа системы масштабного изменения ряда параметров! 
              С другой стороны социально-экономическое развитие напрямую зависит от всесторонне 
              сбалансированных нововведений?`}
      />
      <TermsCard
        title='Условия сервиса'
        text={`Задача организации, в особенности же курс на социально-ориентированный 
              национальный проект требует от нас системного анализа модели развития! 
              Таким образом, постоянное информационно-техническое обеспечение нашей деятельности требует 
              от нас анализа системы масштабного изменения ряда параметров! 
              С другой стороны социально-экономическое развитие напрямую зависит от всесторонне 
              сбалансированных нововведений?`}
      />
      <TermsCard
        title='Условия сервиса'
        text={`Задача организации, в особенности же курс на социально-ориентированный 
              национальный проект требует от нас системного анализа модели развития! 
              Таким образом, постоянное информационно-техническое обеспечение нашей деятельности требует 
              от нас анализа системы масштабного изменения ряда параметров! 
              С другой стороны социально-экономическое развитие напрямую зависит от всесторонне 
              сбалансированных нововведений?`}
      />
      <Button
        text='На главную'
        extStyles={styles.button}
        onClick={handleClick}
      />
    </div>
  )
}

export default Terms