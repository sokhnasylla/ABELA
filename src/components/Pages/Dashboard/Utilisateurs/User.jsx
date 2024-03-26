import React from 'react'
import Base from '../Base'
import Utulisateurs from './Utulisateurs'
import useAuth from '../../Auth/useAuth'


function User() {
  useAuth()
  return (
    <Base dynamicComponent={Utulisateurs}/>
  )
}

export default User