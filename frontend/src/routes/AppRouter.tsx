import React from 'react'
import { Route, Routes } from 'react-router-dom'
import NotFound from '../pages/NotFound'
import { publicRoutes } from './routes'


const AppRouter = () => {
  return (
    <Routes>
      {publicRoutes.map(({path, Component}) => 
        <Route key={path} path={path} element={<Component />} />
      )}
      <Route path='/*' element={<NotFound />} />
    </Routes>
  )
}

export default AppRouter