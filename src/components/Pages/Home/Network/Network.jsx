import React, { useState }  from "react";
import Support from "../../Support Technique/Support";
import Header from "../../../Header/Header";
import { Card, Nav } from "react-bootstrap";
import Title from "../../../Card/Title/Title";
import MenuPerso from "../../../Card/MenuPerso/MenuPerso";
import FormArchiveCompteur from "./FormArchiveCompteur";
import FormCheckSousOffre from "./FormCheckSousOffre";
import FormConversion from "./FormConversion";
import FormGetInfoNew from "./FormGetInfoNew";
import FormGetInfoHlr from "./FormGetInfoHlr";
import FormGetInfoHlrSim from "./FormGetInfoHlrSim";
import FormGeTInfoHlrIN from "./FormGeTInfoHlrIN";
import FormHistBmp from "./FormHistBmp";
import FormHistKassai from "./FormHistKassai";
import FormLoadZsmart from "./FormLoadZsmart";
import FormMasseGetABS from "./FormMasseGetABS";
import FormMasseGetCUG from "./FormMasseGetCUG";
import FormMasseGetInfo from "./FormMasseGetInfoHlr";
import FormMasseInfoHlrSim from "./FormMasseInfoHlrSim";
import FormNaHlr from "./FormNaHlr";
import FormServiceLTE from "./FormServiceLTE";


  
  const menuItemsNetwork = [
    {label: " Archive_Compteur_IN", link:"archiveCompteur"},
    {label: " Check_Souscription_Offre_IN", link:"checkSous"},
    {label: " Conversion_Format_ICB", link:"conversion"},
    {label: " GetInfo_IN New", link:"getInfoIn"},
    {label: " GetInfo_HLR", link:"getInfoHlr"},
    {label: " GetInfos_HLR BYSIM", link:"getInfoHlrSim"},
    {label: " GetInfos_HLR_IN New", link:"getInfoHlrIn"},
    {label: " Historique BMP", link:"histBmp"},
    {label: " Historique_Kassai_OptimaPRO", link:"histKassai"},
    {label: " Load_Zsmart IN", link:"loadZsmart"},
    {label: " Masse GetABS", link:"masseGetAbs"},
    {label: " Masse GetCUG", link:"masseGetCug"},
    {label: " Masse GetInfoHLR", link:"masseGetInfoHlr"},
    {label: " Masse GetInfoHLR bySIM", link:"masseGetInfoHlrSim"},
    {label: " NA_HLR_PREPAID", link:"naHlr"},
    {label: " Service_LTE Actif", link:"serviceLte"},
  ];
  function Network (){
    const [currentForm, setCurrentForm] = useState("")

    const handleMenuClick = (link)=>{
      setCurrentForm(link);
      console.log(link);
    }
  
  return (
    
    <div>
      <Header/>
      <MenuPerso propsMenuItems={menuItemsNetwork} onItemClick={handleMenuClick} />
      <Card id="support">
          <Title text={"NETWORK"}/>
       </Card>
       <div>
       {currentForm === "archiveCompteur" ? <FormArchiveCompteur /> : null}
       {currentForm === "checkSous" ? <FormCheckSousOffre /> : null}
       {currentForm === "conversion" ? <FormConversion /> : null}
       {currentForm === "getInfoIn" ? <FormGetInfoNew /> : null}
       {currentForm === "getInfoHlr" ? <FormGetInfoHlr /> : null}
       {currentForm === "getInfoHlrSim" ? <FormGetInfoHlrSim /> : null}
       {currentForm === "getInfoHlrIn" ? <FormGeTInfoHlrIN /> : null}
       {currentForm === "histBmp" ? <FormHistBmp /> : null}
       {currentForm === "histKassai" ? <FormHistKassai /> : null}
       {currentForm === "loadZsmart" ? <FormLoadZsmart /> : null}
       {currentForm === "masseGetAbs" ? <FormMasseGetABS /> : null}
       {currentForm === "masseGetCug" ? <FormMasseGetCUG /> : null}
       {currentForm === "masseGetInfoHlr" ? <FormMasseGetInfo /> : null}
       {currentForm === "masseGetInfoHlrSim" ? <FormMasseInfoHlrSim /> : null}
       {currentForm === "naHlr" ? <FormNaHlr /> : null}
       {currentForm === "serviceLte" ? <FormServiceLTE /> : null}
      </div>
    </div>
  );
}

export default Network;
