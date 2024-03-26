import React from 'react'
import Header from '../../Header/Header'
import MenuMysmc from './Menu/MenuMysmc'
import HomeSmc from './HomeSmc/HomeSmc'
import useAuth from '../Auth/useAuth'

function Mysmc() {
  useAuth()
  return (
    <div>
        <Header/>
        <MenuMysmc/>
        <HomeSmc/>
    </div>
  )
}

export default Mysmc