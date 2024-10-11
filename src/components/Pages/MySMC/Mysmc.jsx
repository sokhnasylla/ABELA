import React from 'react'
import MenuMysmc from './Menu/MenuMysmc'
import HomeSmc from './HomeSmc/HomeSmc'
import useAuth from '../Auth/useAuth'

function Mysmc() {
  useAuth()
  return (
    <div style={{fontSize:"14px"}}>
        <MenuMysmc/>
        <HomeSmc/>
    </div>
  )
}

export default Mysmc