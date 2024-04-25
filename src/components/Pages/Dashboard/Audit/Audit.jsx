import React from 'react'
import Base from '../Base';
import Utulisateurs from '../Utilisateurs/Utulisateurs';
import MyAudit from './MyAudit';

function Audit() {
    const name='Fama';
    console.log(name);
  return (
    <Base dynamicComponent={MyAudit}/>
  )
}

export default Audit