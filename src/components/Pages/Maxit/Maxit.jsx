import React,{useState} from "react";
import Header from "../../Header/Header";
import MenuPerso from "../../Card/MenuPerso/MenuPerso";
import Form from "../../Form/Form";
import { Card } from "@mui/material";
import Title from "../../Card/Title/Title";
import FormExportTrans from "./FormExportTrans";
import FormExportUser from "./FormExportUser";
import FormHistTrans from "./FormHistTrans";
import FormSupCompte from "./FormSupCompte";
import FormVerifCompte from "./FormVerifCompte";
import useAuth from "../Auth/useAuth";

const maxitItemsMenus = [
  { label: " Export Transaction MaxIT", link: "exportTrans" },
  { label: "Export Utilisateurs MaxIT", link: "exportUser" },
  { label: "Historique Transaction par ND", link: "histTrans" },
  { label: "Suppression Sous Compte", link: "supCompte" },
  { label: "Verification Existence Compte MaxIT", link: "verifCompte" },
];

function Maxit() {

  useAuth()
  const [currentForm, setCurrentForm] = useState("")

  const handleMenuClick = (link)=>{
    setCurrentForm(link);
    console.log(link);
  }



  return (
    <div>
      <Header />
      <MenuPerso propsMenuItems={maxitItemsMenus} onItemClick={handleMenuClick} />
      <Card id="support">
        <Title text={"MAXIT"}/>
      </Card>
      <div>
        {/* <FormExportTrans /> */}
        {currentForm === "exportTrans" ? <FormExportTrans /> : null}
        {currentForm === "exportUser" ? <FormExportUser /> : null}
        {currentForm === "histTrans" ? <FormHistTrans /> : null}
        {currentForm === "supCompte" ? <FormSupCompte /> : null}
        {currentForm === "verifCompte" ? <FormVerifCompte /> : null}

      </div>
    </div>
  );
}

export default Maxit;
