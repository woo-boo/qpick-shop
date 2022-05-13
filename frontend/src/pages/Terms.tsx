import React, { useEffect } from 'react'
import { useActions } from '../hooks/useActions'


interface Props {}

const Terms = (props: Props) => {
  const {setHeaderTitleAction} = useActions()

  useEffect(() => {
    setHeaderTitleAction('Условия сервиса')
  }, [])

  return (
    <div>Terms</div>
  )
}

export default Terms