import React from 'react'
import { Card } from 'react-bootstrap'

function Taux({taux,text,background,color}) {
  return (
          <Card style={{ width: '13rem' ,height:"8rem",backgroundColor:background,color:color,fontFamily:"inherit"}}>
                  <Card.Body style={{textAlign:"right"}}>
                    <Card.Title style={{fontSize:"36px"}} >{taux}</Card.Title>
                    <Card.Text style={{fontSize:"14px"}}>
                    {text}
                    </Card.Text>
                  </Card.Body>
          </Card>
     )
}

export default Taux