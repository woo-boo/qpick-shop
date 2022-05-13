import React, { useEffect } from 'react'
import { useActions } from '../hooks/useActions'

interface Props {}


const Favorites = (props: Props) => {

  const {setHeaderTitleAction} = useActions()

  useEffect(() => {
    setHeaderTitleAction('Избранное')
  }, [])

  return (
    <div>Favorites</div>
  )
}

export default Favorites