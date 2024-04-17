import React, { useState, useEffect } from 'react';
import { Card, Col, Container, Row, Table } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { FaBars, FaArrowCircleDown } from "react-icons/fa";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Header from '../../../../Header/Header';
import MenuDetails from './MenuDetails';
import NavigateMysmc from '../NavigateMysmc';
import Titleges from '../../GestionIncident/Titleges';

function DetailsProbleme() {
  const { id } = useParams();
  const [probleme, setProbleme] = useState(null);

  useEffect(() => {
    const fetchProbleme = async () => {
      try {
        const response = await fetch(`http://localhost:8082/abela-mysmc/api/v1/gestionproblemes/probleme/${id}`);
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des données');
        }
        const data = await response.json();
        setProbleme(data);
      } catch (error) {
        console.error('Erreur:', error);
      }
    };
    fetchProbleme();
  }, [id]);

  if(!probleme){
    return(<div>
      Aucun probleme
    </div>)
  }

  return (
    <div>
      <Header />
      <br />
      <Container className='body' style={{ fontSize: "14px" }}>
        <Row>
          <Col md={9} sm={12}>
            <Row>
              <Col sm={12}>
                <Card
                  style={{
                    display: 'flex',
                    flexDirection: "row",
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    color: "#148C8A",
                    border: "2px solid #148C8A",
                    marginTop: "5%"
                  }}>
                  <FaBars />
                  <p style={{ marginBottom: "10px" }}>Details de problème N°P_03022023_093438</p>
                  <FaArrowCircleDown />
                </Card>
              </Col>
              <Col sm={8}>
                <Titleges text='Prévisalusation du problème' probleme={true} />
                <div className="table-responsive">
                  <Table className="styled-table">
                    <tbody>
                      <tr>
                        <th className="styled-table-td">Date</th>
                        <th>{new Date(probleme.dateCreation).toLocaleDateString('fr-FR')}</th>
                      </tr>
                      <tr>
                        <th className="styled-table-td">Application</th>
                        <th style={{ backgroundColor: "#EA7714", color: "white" }}><strong>{probleme.application}</strong></th>
                      </tr>
                      <tr>
                        <th className="styled-table-td">Description</th>
                        <th><strong>{probleme.description }</strong></th>
                      </tr>
                      <tr>
                        <th className="styled-table-td">Priorité</th>
                        <th style={{ backgroundColor: "#ffd4b1", color: "black" }}><strong>{probleme.priorite && probleme.priorite.toUpperCase()}</strong></th>
                      </tr>
                      <tr>
                        <th className="styled-table-td">Equipe en charge</th>
                        <th>
                          OneTeamSIRelationClient &lt;OneTeamSIRelationClient@orange-sonatel.com&gt;
                        </th>
                      </tr>
                      <tr>
                        <th className="styled-table-td">Date de Fin</th>
                        <th>{probleme.dateCloture && 
                            new Date(probleme.dateCloture).toLocaleDateString('fr-FR', {
                              day: 'numeric',
                              month: 'numeric',
                              year: 'numeric',
                              hour: 'numeric',
                              minute: 'numeric',
                              second: 'numeric',
                            })}</th>
                      </tr>
                      <tr>
                        <th className="styled-table-td">Durée problème</th>
                        <th>{probleme.dureeProbleme &&
                          probleme.dureeProbleme}</th>
                      </tr>
                      <tr>
                        <th className="styled-table-td">Incidents liés</th>
                        <th>
                          DYSFONCTIONNEMENT SUR SMILE <br /> Numéro avis: 221102_094540 <br /> Date Debut: 31-10-2022 11:00:00 <br /> Date Fin: 03-02-2023 09:45:00
                        </th>
                      </tr>
                      <tr>
                        <th className="styled-table-td">Observations</th>
                        <th>{probleme.observation}</th>
                      </tr>
                      <tr>
                        <th className="styled-table-td">Troubleshooting</th>
                        <th>{probleme.troubleshooting}</th>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </Col>
              <Col sm={4}>
                <Titleges text=" Indicateurs clés " probleme={true} />
                <div className="table-responsive">
                  <Table className="table table-bordered table-striped">
                    <tbody>
                      <tr>
                        <th>Nombre incidents</th>
                        <th>1</th>
                      </tr>
                      <tr>
                        <th>Validation avis</th>
                        <th> <CheckCircleIcon sx={{ color: "green" }} /></th>
                      </tr>
                    </tbody>
                  </Table>
                </div>
                <Titleges text=" Autres infos " probleme={true} />
                <div className="table-responsive">
                  <Table className="table table-bordered table-striped">
                    <tbody>
                      <tr>
                        <th>N° probleme</th>
                        <th>{probleme.numProbleme}</th>
                      </tr>
                      <tr>
                        <th>Liste Validation</th>
                        <th>ONE TEAM SIRC</th>
                      </tr>
                      <tr>
                        <th>Liste Diffusion</th>
                        <th>Avisdeprobleme</th>
                      </tr>
                      <tr>
                        <th style={{ backgroundColor: "#EA7714", color: "white" }}>Etat</th>
                        <th style={{ backgroundColor: "#EA7714", color: "white" }}>{probleme.etat}</th>
                      </tr>
                      <tr>
                        <th>Crée par</th>
                        <th>admin</th>
                      </tr>
                      <tr>
                        <th>Modifié par</th>
                        <th>admin</th>
                      </tr>
                      <tr>
                        <th>Date demande validation</th>
                        <th>03/02/23 11:00:50</th>
                      </tr>
                      <tr>
                        <th>Validation demandée par</th>
                        <th>admin</th>
                      </tr>
                      <tr>
                        <th>Date validation</th>
                        <th>03/02/23 11:02:06</th>
                      </tr>
                      <tr>
                        <th>Validation par</th>
                        <th>Oumar SALL - 029168</th>
                      </tr>
                      <tr>
                        <th>Date diffusion</th>
                        <th>03/02/23 11:07:42</th>
                      </tr>
                      <tr>
                        <th>Diffusé par</th>
                        <th>admin</th>
                      </tr>
                      <tr>
                        <th>Nombre Etat Avancement</th>
                        <th>9</th>
                      </tr>
                      <tr>
                        <th>Date dernier Etat avancement</th>
                        <th>25/10/23 09:51:45</th>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </Col>
            </Row>
          </Col>
          <Col md={3} sm={12} sx={{ marginTop: "5px" }}>
            <MenuDetails />
            <NavigateMysmc />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default DetailsProbleme;
