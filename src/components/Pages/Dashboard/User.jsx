import React from 'react'
import Base from './Base'
import Utulisateurs from './Utulisateurs'


function User() {
  return (
    <Base dynamicComponent={Utulisateurs}/>
  )
}

export default User