import React from "react";
import { Card } from "react-bootstrap";
import { FaBars, FaArrowCircleDown } from "react-icons/fa";
import "./title.css";

function Title({ text }) {
  return (
    <Card className="titre">
      <p>
        <FaBars style={{marginTop:'12px'}}  />
          {text}
        <FaArrowCircleDown style={{marginTop:'12px'}} />
      </p>
    </Card>
  );
}

export default Title;

