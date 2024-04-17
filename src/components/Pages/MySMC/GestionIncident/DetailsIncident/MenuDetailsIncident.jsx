import React from 'react'
import { Card } from 'react-bootstrap'
import { FaArrowCircleDown, FaBars } from 'react-icons/fa'

function MenuDetailsIncident() {
  return (
    <div>
        <Card>
            <FaBars/>
            <p style={{marginBottom: '10px' }}>Menu Personnalisé</p>
            <FaArrowCircleDown/>
            
        </Card>
    </div>
  )
}

export default MenuDetailsIncident