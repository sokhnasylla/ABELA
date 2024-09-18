import React, { useState, useEffect } from "react";
import { Container, Row, Col, Table, } from "react-bootstrap";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import "../../../Pages/MySMC/Menu/menumysmc.css";
import axios from "axios";
import Title from "../../../Card/Title/Title";
import { getTokenFromLocalStorage } from "../../Auth/authUtils";

function AddIncident({ formData, handleChange }) {
  const token = getTokenFromLocalStorage();
  const [error, setError] = useState("");
  const [typesAvis, setTypesAvis] = useState([]);
  const [serviceImpacte, setServiceImpacte] = useState([]);
  const [listValidation, setListValidation] = useState([]);
  const [listDiffusion, setListDiffusion] = useState([]);
  const [typeCause, setTypeCause] = useState([]);

  const handleServiceChange = (e) => {
    const selectedValue = e.target.value;
    if (selectedValue && !selectedServices.includes(selectedValue)) {
      const selectedServiceObject = serviceImpact.find(
        (service) => service.id === parseInt(selectedValue)
      );
      if (selectedServiceObject) {
        setSelectedServices([...selectedServices, selectedServiceObject]);
        handleChange({
          target: {
            name: "applicationSis",
            value: [...selectedServices, selectedServiceObject],
          },
        });
      }
    }
  };

  const handleRemoveService = (id) => {
    const updatedServices = selectedServices.filter(
      (service) => service.id !== id
    );
    setSelectedServices(updatedServices);
    handleChange({
      target: { name: "applicationSis", value: updatedServices },
    });
  };

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

    fetchData("http://localhost:8082/abela-mysmc/api/v1/gestionIncidents/typeavisincidents", setTypesAvis);
    fetchData("http://localhost:8082/abela-mysmc/api/v1/gestionIncidents/applicationSI/list", setServiceImpacte);
    fetchData("http://localhost:8082/abela-mysmc/api/v1/gestionIncidents/listValidations", setListValidation);
    fetchData("http://localhost:8082/abela-mysmc/api/v1/gestionIncidents/listDiffusions", setListDiffusion);
    fetchData("http://localhost:8082/abela-mysmc/api/v1/gestionIncidents/typeCauseAvis", setTypeCause);
  }, [token]);

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
                  value={formData.objet}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3 form-group">
                <label htmlFor="nature">Nature :</label>
                <select
                  name="nature"
                  id="nature"
                  className="form-control"
                  value={formData.nature}
                  onChange={handleChange}
                >
                  <option value="">Sélectionnez la nature</option>
                  <option value="SI">SI</option>
                  <option value="DATA">DATA</option>
                  <option value="CONTENU">CONTENU</option>
                </select>
              </div>
              <div className="mb-3 form-group">
                <label htmlFor="typeAvisIncident.id">Type avis :</label>
                <select
                  name="typeAvisIncident.id"
                  className="form-control"
                  value={formData.typeAvisIncident.id}
                  onChange={handleChange}
                >
                  <option value="">Sélectionnez le type</option>
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
                  value={formData.serviceImpacte}
                  onChange={handleChange}
                >
                  <option value="">Sélectionnez le service</option>
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
                  value={formData.valide}
                  onChange={handleChange}
                >
                  <option value="">Sélectionnez la validation</option>
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
                  value={formData.diffusion}
                  onChange={handleChange}
                >
                  <option value="">Sélectionnez la diffusion</option>
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
                  value={formData.dateDebut}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3 form-group">
                <label htmlFor="dateDetection">Date de détection :</label>
                <input
                  type="datetime-local"
                  name="dateDetection"
                  id="dateDetection"
                  className="form-control"
                  value={formData.dateDetection}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3 form-group">
                <label htmlFor="numTicketEZV">Ticket EZV :</label>
                <input
                  type="text"
                  name="numTicketEZV"
                  id="numTicketEZV"
                  className="form-control"
                  value={formData.numTicketEZV}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3 form-group">
                <label htmlFor="numTicketOceane">Ticket Océane :</label>
                <input
                  type="text"
                  name="numTicketOceane"
                  id="numTicketOceane"
                  className="form-control"
                  value={formData.numTicketOceane}
                  onChange={handleChange}
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
                  value={formData.impact}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3 form-group">
                <label htmlFor="causeRetardid">Cause du retard :</label>
              
                  
                <select
                  name="causeRetardid"
                  className="form-control"
                  value={formData.causeRetard}
                  onChange={handleChange}
                >
                  <option value="">Sélectionnez la cause</option>            
                  <option value="SI">Retard détection</option>
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
                  value={formData.typeCauseIncident.id}
                  onChange={handleChange}
                >

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
                  value={formData.causes}
                  onChange={handleChange}
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
                  value={formData.observations}
                  onChange={handleChange}
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

export default AddIncident;
