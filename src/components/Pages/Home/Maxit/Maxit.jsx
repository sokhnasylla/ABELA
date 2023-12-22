import React from "react";
import Header from "../../../Header/Header";
import MenuPerso from "../../../Card/MenuPerso/MenuPerso";
import Form from "../../../Form/Form";
import { Card } from "@mui/material";
import Title from "../../../Card/Title/Title";
import FormExportTrans from "./FormExportTrans";
import FormExportUser from "./FormExportUser";
import FormHistTrans from "./FormHistTrans";
import FormSupCompte from "./FormSupCompte";
import FormVerifCompte from "./FormVerifCompte";

const maxitItemsMenus = [
  { label: " Export Transaction MaxIT", link: "#" },
  { label: "Export Utilisateurs MaxIT", link: "#" },
  { label: "Historique Transaction par ND", link: "#" },
  { label: "Suppression Sous Compte", link: "#" },
  { label: "Verification Existence Compte MaxIT", link: "#" },
];

function Maxit() {
  return (
    <div>
      <Header />
      <MenuPerso propsMenuItems={maxitItemsMenus} />
      <Card id="support">
        <Title text={"MAXIT"}/>
      </Card>
      <div>
        <FormSupCompte />
      </div>
    </div>
  );
}

export default Maxit;
