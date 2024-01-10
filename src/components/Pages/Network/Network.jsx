import React ,{useState} from "react";
import Header from "../../Header/Header";
import { Card } from "react-bootstrap";
import Title from "../Dashboard/Title";
import MenuPerso from "../../Card/MenuPerso/MenuPerso";
import FormExtractInfos from "./FormExtractInfos";
import useAuth from "../Auth/useAuth";  
import FormArchiveCompteur from "./FormArchiveCompteur";
import FormCheckSousOffre from "./FormCheckSousOffre";
import FormConversion from "./FormConversion";
import FormGetInfoHlr from "./FormGetInfoHlr";
import FormGeTInfoHlrIN from "./FormGeTInfoHlrIN";
import FormGetInfoHlrSim from "./FormGetInfoHlrSim";
import FormGetInfoNew from "./FormGetInfoNew";
import FormHistBmp from "./FormHistBmp";
import FormHistKassai from "./FormHistKassai";
import FormLoadZsmart from "./FormLoadZsmart";
import FormMasseGetABS from "./FormMasseGetABS";
import FormMasseGetCUG from "./FormMasseGetCUG";
import FormMasseGetInfoHlr from "./FormMasseGetInfoHlr";
import FormMasseInfoHlrSim from "./FormMasseInfoHlrSim";
import FormNaHlr from "./FormNaHlr";
import FormServiceLTE from "./FormServiceLTE";

  const menuItemsNetwork = [
    {label: "Archive_Compteur_IN", link:"archiveCompte"},
    {label: "Check-Souscription_Offre_IN", link:"checkSous"},
    {label: "Conversion_Format_ICB", link:"conversionForm"},
    {label: "GetInfo_IN_New", link:"getInfoIn"},
    {label: "GetInfos_HLR" , link:"getInfoHlr"},
    {label: "GetInfos_HLR_BySim", link:"getInfoBysim"},
    {label: "GetInfos_HLR_IN_New", link:"getInfoHlrIn"},
    {label: "Historique_BMP", link:"histBmp"},
    {label: "Historique_Kassai_OptimaPRO", link:"histKassai"},
    {label: "Load_Zsmart_IN", link:"loadZsmart"},
    {label: "Masse_Get_ABS", link:"masseAbs"},
    {label: "Masse_GetInfo_CUG", link:"masseCug"},
    {label: "Masse_GetInfo_HLR_BySim", link:"masseHlr"},
    {label: "Na_HLR_Prepaid", link:"naHlr"},
    {label: "Service_LTE_Actif", link:"serviceLte"},
   
  ];
  function Network() {

    useAuth()

    const [currentForm, setCurrentForm] = useState("")
  
    const handleMenuClick = (link)=>{
      setCurrentForm(link);
      console.log(link);
    }
  
  
  
    return (
      <div>
        <Header />
        <MenuPerso propsMenuItems={menuItemsNetwork} onItemClick={handleMenuClick} />
        <Card id="support">
          <Title text={"NETWORK"}/>
        </Card>
        <div>
          
          {currentForm === "archiveCompte" ? <FormArchiveCompteur /> : null}
          {currentForm === "checkSous" ? <FormCheckSousOffre /> : null}
          {currentForm === "conversionForm" ? <FormConversion /> : null}
          {currentForm === "getInfoIn" ? <FormGetInfoNew /> : null}
          {currentForm === "getInfoHlr" ? <FormGetInfoHlr /> : null}
          {currentForm === "getInfoHlrIn" ? <FormGeTInfoHlrIN /> : null}
          {currentForm === "getInfoBysim" ? <FormGetInfoHlrSim /> : null}
          {currentForm === "histBmp" ? <FormHistBmp /> : null}
          {currentForm === "histKassai" ? <FormHistKassai /> : null}
          {currentForm === "loadZsmart" ? <FormLoadZsmart /> : null}
          {currentForm === "masseAbs" ? <FormMasseGetABS /> : null}
          {currentForm === "masseCug" ? <FormMasseGetCUG /> : null}
          {currentForm === "masseHlr" ? <FormMasseGetInfoHlr /> : null}
          {currentForm === "naHlr" ? <FormNaHlr /> : null}
          {currentForm === "serviceLte" ? <FormServiceLTE /> : null}
        </div>
      </div>
    );
  }

export default Network;
