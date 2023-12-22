import React from 'react'
import Header from '../../Header/Header'
import { Card } from 'react-bootstrap'
import support from '../../../assets/support.jpg'
import Title from '../../Card/Title/Title'
import "./support.css"
import MenuPerso from '../../Card/MenuPerso/MenuPerso'


const Support = () =>{
  const menuItems = [
    {label: "Reconciliation HLR vs IN", link:"/support/reco_hlr_in"},
    {label: "Reconciliation HLR vs NESSICO", link:"#"},
    {label: "Reconciliation IN vs NESSICO", link:"#"}
  ];

  return (
    <div>
       <Header/>
        <MenuPerso propsMenuItems={ menuItems  }/>
       <Card id="support">
          <Title text="SUPPORT TECHNIQUE"/>
       </Card>
    </div>
  )
}

export default Support