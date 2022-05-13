import React, { useEffect } from 'react'
import { useActions } from '../hooks/useActions'


interface Props {}

const Contacts = (props: Props) => {

  const {setHeaderTitleAction} = useActions()

  useEffect(() => {
    setHeaderTitleAction('Контакты')
  }, [])

  return (
    <div>Contacts</div>
  )
}

export default Contacts