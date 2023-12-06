import React from 'react'
import Header from '../../Header/Header'
import MenuPerso from '../../Card/MenuPerso/MenuPerso'
import RecoHlrIn from '../Reco_hlr_in/RecoHlrIn'
import { Card } from 'react-bootstrap'
import support from '../../../assets/support.jpg'
import Title from '../../Card/Title/Title'
import "./support.css"



function Support() {
  return (
    <div>
       <Header/>
       <MenuPerso/>
       <Card id="support">
          <Title text="SUPPORT TECHNIQUE"/>
          <Card.Img src={support} height={484}></Card.Img>
       </Card>
    </div>
  )
}

export default Support