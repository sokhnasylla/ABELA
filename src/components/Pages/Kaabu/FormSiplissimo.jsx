import React from 'react'
import { Card,Table} from 'react-bootstrap';

function FormSiplissimo() {
  return (
    <Card style={{width:"350px",maxWidth:"100%",marginLeft:"30px"}}>
      <Card.Header className="text-center fs-4">Simplissimo</Card.Header>
      <Card.Body>
        <Table striped bordered hover>
          <tbody>
            <tr>
              <th>Login:</th>
              <th></th>
              </tr>
              <tr>
              <th>Nom:</th>
              <th></th>
              </tr>
            <tr>
              <th>Prenom:</th>
              <th></th>
            </tr>
            <tr>
              <th>Contact:</th>
              <th></th>
            </tr>
            <tr>
              <th>Statut:</th>
              <th></th>
            </tr>
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  )
}

export default FormSiplissimo