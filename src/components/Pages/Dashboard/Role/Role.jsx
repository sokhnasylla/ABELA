import React from 'react'
import Base from '../Base'
import useAuth from '../../Auth/useAuth'
import RoleTabs from './RoleTab'


function Role() {
  useAuth()
  return (
    <Base dynamicComponent={RoleTabs}/>
  )
}

export default Role