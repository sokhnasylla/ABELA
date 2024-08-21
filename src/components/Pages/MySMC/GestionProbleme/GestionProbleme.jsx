import React from 'react'
import { Row,Col,Button } from 'react-bootstrap'
import MenuMysmc from '../Menu/MenuMysmc'
import Get from '../../../API/Get'
import Title from '../../../Card/Title/Title'
import { Link } from 'react-router-dom'
import { FaEye } from 'react-icons/fa'


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
        { name: 'N°Probleme', selector: 'id', sortable: true },
        { name: 'Application', selector: 'application', sortable: true },
        { name: 'Date Création',
          selector: 'dateCreation',
          sortable: true ,
          cell: row => row.dateCreation ? <span>{new Date(row.dateCreation).toLocaleDateString('fr-FR')}</span> : <span>N/A</span> },
        { name: 'Etat', selector: 'etat', sortable: true },
        { name: 'Action', sortable: true, cell: row => <CelluleAction id={row.id} /> },
    
      ];
    
  return (
    <div>
        <MenuMysmc/>
        {/* <Row>
        <Col sm={8} className='content'>
              <Title text="Liste des problémes en cours"/>
              <Get url="http://localhost:8082/abela-mysmc/api/v1/gestionproblemes/problemes/encours" columns={columns} />
            </Col>
        </Row> */}
    </div>
  )
}

export default GestionProbleme