import React, { useEffect, useState } from "react";
import { Container, Row, Col, Table } from "react-bootstrap";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import "../../../Pages/MySMC/Menu/menumysmc.css";
import axios from "axios";
import Title from "../../../Card/Title/Title";
import { getTokenFromLocalStorage } from "../../Auth/authUtils";
import { useLocation } from "react-router-dom";

function EditIncident({avis, formData, handleEditChange }) {
  const token = getTokenFromLocalStorage();
  const [error, setError] = useState("");
  const [typesAvis, setTypesAvis] = useState([]);
  const [serviceImpacte, setServiceImpacte] = useState([]);
  const [listValidation, setListValidation] = useState([]);
  const [listDiffusion, setListDiffusion] = useState([]);
  const [typeCause, setTypeCause] = useState([]);
   console.log(avis);

  useEffect(() => {
    const fetchData = async (url, setter) => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.get(url, config);
        setter(response.data);
      } catch (error) {
        setError(`Erreur: ${error.message}`);
      }
    };

    fetchData(
      "http://localhost:8082/abela-mysmc/api/v1/gestionIncidents/typeavisincidents",
      setTypesAvis
    );
    fetchData(
      "http://localhost:8082/abela-mysmc/api/v1/gestionIncidents/applicationSI/list",
      setServiceImpacte
    );
    fetchData(
      "http://localhost:8082/abela-mysmc/api/v1/gestionIncidents/listValidations",
      setListValidation
    );
    fetchData(
      "http://localhost:8082/abela-mysmc/api/v1/gestionIncidents/listDiffusions",
      setListDiffusion
    );
    fetchData(
      "http://localhost:8082/abela-mysmc/api/v1/gestionIncidents/typeCauseAvis",
      setTypeCause
    );
    
  }, [token]);

  const formatDateForInput = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    
    const formattedDate = date.toISOString().slice(0, 16);
    return formattedDate;
  };

  return (
    <div id="home">
     
      <Container className="body">
        {/* Gestion des avis section */}
        <Row>
          <Col sm={12}>
            <Title text="Gestion des avis d'incidents - Formulaire de déclaration d'avis" />
            <Table className="custom-table" bordered striped id="ajoutavis">
              <thead>
                <tr>
                  <th colSpan={3} id="text">
                    <ReportProblemIcon sx={{ height: "18px" }} />
                    Consignes obligatoires à respecter
                  </th>
                </tr>
              </thead>
              <tbody style={{ fontSize: ".9em", fontWeight: "500" }}>
                <tr>
                  <td> Delai de diffusion</td>
                  <td colSpan={2}>
                    45 minutes après détection même si les TMC ne valident pas.
                  </td>
                </tr>
                <tr>
                  <td>Delai de traitement</td>
                  <td colSpan={2}>
                    4 heures après détection - Envoyez un état d'avancement
                    chaque 4h.
                  </td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
        <Row>
          <Col sm={6}>
            <Title text="Correspondance avis" />
            <div className="mb-3 form-group">
              <label htmlFor="objet">Objet :</label>
              <input
                type="text"
                name="objet"
                id="objet"
                className="form-control"
                defaultValue={formData.objet}
                // value={formData.objet}
                onChange={handleEditChange}
              />
            </div>
            <div className="mb-3 form-group">
              <label htmlFor="nature">Nature :</label>
              <select
                name="nature"
                id="nature"
                className="form-control"
                defaultValue={avis.nature}
                // value={formData.nature}
                onChange={handleEditChange}
              >
                <option>{avis.nature}</option>
                <option value="SI">SI</option>
                <option value="DATA">DATA</option>
                <option value="CONTENU">CONTENU</option>
              </select>
            </div>
            <div className="mb-3 form-group">
              <label htmlFor="typeAvisIncident">Type avis :</label>
              <select
                name="typeAvisIncident"
                className="form-control"
                // value={formData.typeAvisIncident || ""}
                onChange={handleEditChange}
              >
                <option value={avis.typeAvisIncident.nom}>{avis.typeAvisIncident.nom}</option>
                {typesAvis.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.nom}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3 form-group">
              <label htmlFor="serviceImpacte">Services impactés :</label>
              <select
                name="serviceImpacte"
                className="form-control"
                defaultValue={avis.serviceImpacte}
                // value={formData.serviceImpacte}
                onChange={handleEditChange}
              >
                <option>{avis.serviceImpacte}</option>
                {serviceImpacte.map((service) => (
                  <option key={service.id} value={service.id}>
                    {service.nom}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3 form-group">
              <label htmlFor="valide">Validation :</label>
              <select
                name="valide"
                className="form-control"
                defaultValue={avis.validation}
                // value={formData.valide}
                onChange={handleEditChange}
              >
                <option>{avis.valide}</option>
                {listValidation.map((validation) => (
                  <option key={validation.id} value={validation.id}>
                    {validation.nom}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3 form-group">
              <label htmlFor="diffusion">Diffusion :</label>
              <select
                name="diffusion"
                className="form-control"
                defaultValue={avis.diffusion}
                // value={formData.diffusion}
                onChange={handleEditChange}
              >
                <option >{avis.diffusion}</option>
                {listDiffusion.map((diff) => (
                  <option key={diff.id} value={diff.id}>
                    {diff.nom}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3 form-group">
              <label htmlFor="dateDebut">Date de début :</label>
              <input
                type="datetime-local"
                name="dateDebut"
                id="dateDebut"
                className="form-control"
                defaultValue={formatDateForInput(avis.dateDebut)}
                // value={formData.dateDebut}
                onChange={handleEditChange}
              />
            </div>
            <div className="mb-3 form-group">
              <label htmlFor="dateDetection">Date de détection :</label>
              <input
                type="datetime-local"
                name="dateDetection"
                id="dateDetection"
                className="form-control"
                defaultValue={formatDateForInput(avis.dateDetection)}
                // value={formData.dateDetection}
                onChange={handleEditChange}
              />
            </div>
            <div className="mb-3 form-group">
              <label htmlFor="ticketEzv">Ticket EZV :</label>
              <input
                type="text"
                name="ticketEzv"
                id="ticketEzv"
                className="form-control"
                defaultValue={avis.numTicketEZV}
                // value={formData.ticketEzv}
                onChange={handleEditChange}
              />
            </div>
            <div className="mb-3 form-group">
              <label htmlFor="ticketOceane">Ticket Océane :</label>
              <input
                type="text"
                name="ticketOceane"
                id="ticketOceane"
                className="form-control"
                defaultValue={avis.numTicketOceane}
                // value={formData.ticketOceane}
                onChange={handleEditChange}
              />
            </div>
          </Col>

          <Col sm={6}>
            <Title text="Causes et impacts" />
            <div className="form-group">
              <label htmlFor="impact">Impacts :</label>
              <textarea
                id="impact"
                className="form-control"
                name="impact"
                defaultValue={avis.impact}
                // value={formData.impact}
                onChange={handleEditChange}
              />
            </div>
            <div className="mb-3 form-group">
                <label htmlFor="causeRetard.id">Cause du retard :</label>
              
                  
                <select
                  name="causeRetard.id"
                  className="form-control"
                  value={formData.causeRetard.id}
                  onChange={handleEditChange}
                >
                  <option value="">{avis.causeProbable}</option>            
                  <option value="SI">Retard détecton</option>
                  <option value="DATA">Non supervisé</option>
                </select>
              </div> 
            <div className="mb-3 form-group">
              <label htmlFor="typeCauseIncident.id">
                Type de cause incident :
              </label>
              <select
                name="typeCauseIncident.id"
                className="form-control"
                defaultValue={avis.typeCauseIncident.id}
                // value={formData.
                onChange={handleEditChange}
              >
                <option value="">{avis.typeCauseIncident.nom}</option>   
                {typeCause.map((cause) => (
                  <option key={cause.id} value={cause.id}>
                    {cause.intitule}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="causeProbable">Cause probable :</label>
              <textarea
                id="causeProbable"
                className="form-control"
                name="causeProbable"
                defaultValue={avis.causes}
                onChange={handleEditChange}
                placeholder="(*) Demander systématiquement aux TMC(s) les causes probables
                          (*) Eviter les expressions « Investigations en Cours » ; « causes inconnues » et préférer mettre « constat : xxxxxxxx »"
              />
            </div>
            <div className="form-group">
              <label htmlFor="observations">Observations :</label>
              <textarea
                id="observations"
                className="form-control"
                name="observations"
                defaultValue={avis.observations}
                onChange={handleEditChange}
                placeholder="Renseigner les observations"
              />
            </div>
          </Col>
        </Row>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </Container>
    </div>
  );
}

export default EditIncident;
