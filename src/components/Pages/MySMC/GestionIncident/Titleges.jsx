import React from 'react'
import { IoIosInformationCircle } from "react-icons/io";
import { Card } from "react-bootstrap";
import { FaArrowCircleDown ,FaBars} from "react-icons/fa";

function Titleges({ text ,probleme}) {

  if(probleme
    ){

      return(
        <Card className="titre" style={{marginBottom:"10px",marginTop:"10px",display:"flex",justifyContent:"space-around"}}>
        <p style={{textAlign:"center", textAlign: "center",display:"flex",justifyContent:"space-around",alignItems:"center"}}>
          <FaBars />
            {text}
          <FaArrowCircleDown />
        </p>
           </Card>
      )
      

    }
    else{
      return (
        <Card className="titre" style={{marginBottom:"5px",marginTop:"5px",display:"flex",justifyContent:"space-around"}}>
           <p style={{textAlign:"center"}}>
             <IoIosInformationCircle />
               {text}
             <FaArrowCircleDown />
           </p>
              </Card>)
      
    }

  }
   
  

export default Titleges