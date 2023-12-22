import React from 'react'
import { Card} from 'react-bootstrap'
import Header from '../../Header/Header'
import MenuPerso from '../../Card/MenuPerso/MenuPerso'
import Title from '../../Card/Title/Title'
import Get from '../../API/Get'
import { getTokenFromLocalStorage } from '../Auth/authUtils'

function RecoHlrIn() {
  const columns = [
    // Définissez les colonnes de votre DataTable
    { name: 'JOUR', selector: 'dateReco', sortable: true },
    { name: 'Total_HLR', selector: 'hlrParc', sortable: true },
    { name: 'Total_IN', selector: 'inParc', sortable: true },
    { name: 'Total_Match', selector: 'hlrMatchParc', sortable: true },
    { name: 'MISSING_HLR', selector: 'hlrInMissingParcHlr', sortable: true },
    { name: 'MISSING_IN', selector: 'hlrInMissingParcIn', sortable: true },
    { name: 'POSTPAID_ROAMING_PREPAID	', selector: 'hlrInInconformitePostpaidWithRoamingPrepaid', sortable: true },
    { name: 'PREPAID_ROAMING_POSTPAID', selector: 'hlrInInconformitePrepaidWithRoamingPostpaid', sortable: true },
    { name: 'KIRENE_WITH_ROAMING', selector: 'hlrNessicoInconformiteRoaming', sortable: true },




    // ... Ajoutez d'autres colonnes selon votre modèle de données
  ];
  
 

  return (
    <div>
        <Header/>
        <MenuPerso/>
        <Card id="support">
          <Title text="SUPPORT TECHNIQUE"/>
          <Get url="http://127.0.0.1:8000/api/tbrecoitn/month/?month=2023-10" columns={columns} token={getTokenFromLocalStorage()}/>
    
       </Card>
        
    </div>

  )
}

export default RecoHlrIn