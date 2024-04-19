import React from 'react'
import { Card, Table } from 'react-bootstrap';

function FormSimplissimoClient({userSimplissimo}) {
  if (userSimplissimo.length === 0) {
    return <div></div>;
  }

  return (
    <Card >
      <Card.Header className="text-center fs-4">Simplissimo</Card.Header>
      <Card.Body>
        <Table striped bordered hover>
          <tbody>
            <tr>
              <th>Identification:</th>
              {userSimplissimo.data.isIdentified ? (<td style={{backgroundColor:"green",color:"white",fontWeight:"bold"}}>OUI</td>)
              :(<td style={{backgroundColor:"red",color:"white",fontWeight:"bold"}}>NON</td>)}
            </tr>
            <tr>
              <th>APNNOMAD:</th>
              <td style={{ padding: "0"}}>
                {userSimplissimo.data.services && userSimplissimo.data.services.some(service => service.code.includes("APNNOMAD")) ? (
                  userSimplissimo.data.services
                    .filter(service => service.code.includes("APNNOMAD"))
                    .map(service => (
                      <div key={service.statut} style={{ backgroundColor: service.statut === "Active" ? "green" : "red", color: "white", fontWeight: "bold", padding: "10px" }}>
                        {service.statut === "Active" || service.statut === "Desactive" ? (
                          service.statut
                        ) : (
                          "Service non disponible"
                        )}
                      </div>
                    ))
                ) : (
                  "Service non disponible"
                )}
              </td>
            </tr>



          </tbody>
        </Table>
      </Card.Body>
    </Card>
  )
}

export default FormSimplissimoClient