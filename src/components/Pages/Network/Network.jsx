import React from "react";
import Header from "../../Header/Header";
import { Card, Nav } from "react-bootstrap";
import Title from "../Dashboard/Title";
import MenuPerso from "../../Card/MenuPerso/MenuPerso";
import FormExtractInfos from "./FormExtractInfos";

const Network = ()=> {
  
  const menuItemsNetwork = [
    {label: "GetInfos_HLR_IN New", link:"#"}
  ]

  return (
    <div>
      <Header/>
      <MenuPerso propsMenuItems={menuItemsNetwork} />
      <Card id="support">
          <Title text="NETWORK"/>
       </Card>
       <div>
        <FormExtractInfos />
      </div>
    </div>
  );
}

export default Network;
