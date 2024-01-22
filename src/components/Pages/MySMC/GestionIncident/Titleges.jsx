import React from 'react'
import { IoIosInformationCircle } from "react-icons/io";
import { Card } from "react-bootstrap";
import { FaArrowCircleDown } from "react-icons/fa";
import '../../../Card/Title/title.css'

function Titleges({ text }) {
    return (
      <Card className="titre" style={{width:"40%",marginBottom:"10px"}}>
        <p>
          <IoIosInformationCircle />
            {text}
          <FaArrowCircleDown />
        </p>
      </Card>
    );
  }

export default Titleges