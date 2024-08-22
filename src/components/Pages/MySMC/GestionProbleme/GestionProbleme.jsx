import React from 'react'
import { Row,Col,Button,Container } from 'react-bootstrap'
import MenuMysmc from '../Menu/MenuMysmc'
import Title from '../../../Card/Title/Title'
import { Link } from 'react-router-dom'
import { FaEye } from 'react-icons/fa'
import Get from '../../../API/Get'



function GestionProbleme() {

   // Composant de cellule personnalisé pour la colonne "Action"
    const CelluleAction = ({ id }) => (
    <div>
        {/* Votre bouton avec le composant fourni */}
        <Link to={`/mysmc/gestionprobleme/details/${id}`}> {/* Rediriger vers "/details/id" au clic */}
        <Button variant="info" 
            style={{backgroundColor: "#31B0D5",padding:"1px 5px",lineHeight:"1.2",borderRadius:"3px"}}
            title="Voir les détails du problème"
            
            >
            <FaEye color='white' />
        </Button>
        </Link>
    </div>
    );



    const columns = [
      // Définissez les colonnes de votre DataTable
      { name: 'N°Probleme', selector: 'numProbleme', sortable: true },
      { name: 'Application', selector: 'application', sortable: true },
      { name: 'Date Création',
        selector: 'dateCreation',
        sortable: true ,
        cell: row => row.dateCreation ? <span>{new Date(row.dateCreation).toLocaleDateString('fr-FR')}</span> : <span>N/A</span> },
      { name: 'Etat', selector: 'etat', sortable: true },
      { name: 'Action', sortable: true, cell: row => <CelluleAction id={row.id} /> },
  
    ];
  
  return (
    <Container>
        <MenuMysmc/>
        <Container>
        <Row>
        <Col sm={9}>
           <Title text="Liste des Problemes"/>
           get
        </Col>
       </Row>
       <Row></Row>
    </Container>
    </Container>
  )
}

export default GestionProbleme