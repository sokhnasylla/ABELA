import React from 'react'
import { IoIosInformationCircle } from "react-icons/io";
import { Card } from "react-bootstrap";
import { FaArrowCircleDown } from "react-icons/fa";

function Titleges({ text }) {
    return (
      <Card className="titre" style={{marginBottom:"10px",display:"flex",justifyContent:"space-beetween"}}>
        <p style={{textAlign:"center"}}>
          <IoIosInformationCircle />
            {text}
          <FaArrowCircleDown />
        </p>
      </Card>
    );
  }

export default Titleges