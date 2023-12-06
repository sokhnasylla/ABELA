import React from 'react'
import { Button, Card, Col, Container,Row } from 'react-bootstrap'
import menupng from "../../../../assets/menu.png"
import MenuLeft from '../../../Card/MenuLeft/MenuLeft'
import { TfiBlackboard } from "react-icons/tfi";
import { FaLink ,FaSignal} from "react-icons/fa";
import "./homesmc.css"

const submenu=[
    {'text':"Information","icon":TfiBlackboard
  },
    {'text':"Liens Utiles",'icon':FaLink
  },
    {'text':"Automatique Reporting", 'icon':FaSignal}
  ]

function HomeSmc() {
  return (
   <div id='homsmc'>
        <Row>
            
            <Col>
            <fieldset>
				<legend>
                    <span style={{float:"left",marginRight: "10px"}}>
                        <img src={menupng}/>
                    </span> Rubrique des informations utiles
                </legend>
			</fieldset>
            <br/>
            </Col>
        </Row>
        <Row>
            <Col>
                <MenuLeft submenu={submenu}/>
            </Col>
            <Col xs={9}>
            <Container className='blockinf'>
                <Button variant='success'> + Partager une information</Button>
                <Card>
                <ul className="timeline" style={{overflowY:"scroll",height:"280px"}}>
					<li>
						<h5>
                            <b>nouveau lien ELK
                                <span className="backgroundbleu colorwhite infoForm"> Criticité : Faible</span>
                            </b>
                        </h5>
						<h6 className="float-right; colororange">2023-05-10 19:11:47, TMP_CISSE58568</h6>			
                        <p class="label-sucess"><i>https://observability.seetlu.orange-sonatel.com/spaces/space_selector</i></p>
					</li>	
				</ul>
                </Card>
            </Container>
            </Col>
        </Row>
   </div>
  )
}

export default HomeSmc