import React from 'react'
import { Card, Table } from 'react-bootstrap';

function FormSimplissimoClient({userSimplissimo}) {
  if (userSimplissimo.length === 0) {
    return <div>Aucune donnée à afficher.</div>;
  }

  return (
    <Card style={{ width: "350px", maxWidth: "100%", marginLeft: "30px" }}>
      <Card.Header className="text-center fs-4">Simplissimo</Card.Header>
      <Card.Body>
        <Table striped bordered hover>
          <tbody>
            <tr>
              <th>Identification:</th>
              {userSimplissimo.data.isIdentified ? (<td>OUI</td>):(<td>NON</td>)}
            </tr>
            <tr>
              <th>APNNOMAD:</th>
              <td>
                {userSimplissimo.data.services && userSimplissimo.data.services.some(service => service.code.includes("APNNOMAD")) ? (
                  userSimplissimo.data.services
                    .filter(service => service.code.includes("APNNOMAD"))
                    .map(service => (
                      <div key={service.statut}>
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