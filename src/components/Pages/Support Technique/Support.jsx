import React from 'react'
import Header from '../../Header/Header'
import { Card } from 'react-bootstrap'
import support from '../../../assets/support.jpg'
import Title from '../../Card/Title/Title'
import "./support.css"
import MenuPerso from '../../Card/MenuPerso/MenuPerso'
import useAuth from '../Auth/useAuth'
import Get from '../../API/Get'
import MenuPersoGesIncident from '../MySMC/GestionIncident/MenuPersoGesIncident'


const Support = () =>{
  useAuth()
  const menuItems = [
    {label: "Reconciliation HLR vs IN", link:"/support/reco_hlr_in"},
    {label: "Reconciliation HLR vs NESSICO", link:"#"},
    {label: "Reconciliation IN vs NESSICO", link:"#"}
  ];


  const columns = [
    // Définissez les colonnes de votre DataTable
    { name: 'N°Probleme', selector: 'id', sortable: true },
    { name: 'Application', selector: 'application', sortable: true },
    { name: 'Date Création', selector: 'dateCreation', sortable: true },
    { name: 'Etat', selector: 'etat', sortable: true },
    { name: 'Action', selector: 'av', sortable: true },





    // ... Ajoutez d'autres colonnes selon votre modèle de données
  ];


  return (
    <div>
       <Header/>
        <MenuPersoGesIncident propsMenuItems={ menuItems  }/>
       <Card id="support">
          <Title text="SUPPORT TECHNIQUE"/>

          <Get url="http://localhost:8085/api/gestionproblemes/problemes/clos" columns={columns} />

       </Card>
    </div>
  )
}

export default Support