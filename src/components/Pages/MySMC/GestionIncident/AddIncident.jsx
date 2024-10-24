import React, { useState, useEffect } from "react";
import { Container, Row, Col, Table } from "react-bootstrap";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import "../../../Pages/MySMC/Menu/menumysmc.css";
import axios from "axios";
import Title from "../../../Card/Title/Title";
import { getTokenFromLocalStorage } from "../../Auth/authUtils";
import { abelaURL } from "../../../../config/global.constant";
import "./ajoutavis.css";
import Select from "react-select";
import makeAnimated from "react-select/animated";

function AddIncident({ formData, handleChange, handleServiceChange }) {
  const token = getTokenFromLocalStorage();
  const [error, setError] = useState("");
  const [typesAvis, setTypesAvis] = useState([]);
  const [listValidation, setListValidation] = useState([]);
  const [listDiffusion, setListDiffusion] = useState([]);
  const [typeCause, setTypeCause] = useState([]);
  const [serviceImpacte, setServiceImpacte] = useState([]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(""), 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const animatedComponents = makeAnimated();

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

    fetchData(`${abelaURL}/typeavisincidents`, setTypesAvis);
    fetchData(`${abelaURL}/applicationSI/list`, setServiceImpacte);
    fetchData(`${abelaURL}/listValidations`, setListValidation);
    fetchData(`${abelaURL}/listDiffusions`, setListDiffusion);
    fetchData(`${abelaURL}/typeCauseAvis`, setTypeCause);
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
        <Row className="text-center font-weight-bold">
          <p>
            <strong>Remarque :</strong> Les champs marqués d'une{" "}
            <strong className="text-danger">*</strong> sont obligatoires.
          </p>
        </Row>
        <Row>
          <Col sm={6}>
            <Title text="Correspondance avis" />
            <div className="mb-3 form-group">
              <label htmlFor="objet">
                Objet <strong className="text-danger">*</strong> :
              </label>
              <input
                id="objet"
                name="objet"
                type="text"
                autoFocus
                className="form-control"
                value={formData.objet}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3 form-group">
              <label htmlFor="nature">
                Nature <strong className="text-danger">*</strong> :
              </label>
              <select
                id="nature"
                name="nature"
                className="form-select"
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
              <label htmlFor="typeAvisIncident">
                Type avis <strong className="text-danger">*</strong> :
              </label>
              <select
                id="typeAvisIncident"
                name="typeAvisIncident"
                className="form-select"
                value={formData.typeAvisIncident?.id}
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
              <label htmlFor="serviceImpacte">
                Services impactés <strong className="text-danger">*</strong> :
              </label>
              <Select
                isMulti
                id="serviceImpacte"
                name="serviceImpacte"
                options={serviceImpacte.map((service) => ({
                  value: service.id,
                  label: service.nom,
                }))}
                components={animatedComponents}
                value={formData.serviceImpacte}
                onChange={handleServiceChange}
                placeholder="Sélectionnez le(s) service(s)"
              />
            </div>
            <div className="mb-3 form-group">
              <label htmlFor="listeValidation">
                Validation <strong className="text-danger">*</strong> :
              </label>
              <select
                id="listeValidation"
                name="listeValidation"
                className="form-select"
                value={formData.listeValidation?.id}
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
              <label htmlFor="listeDiffusion">
                Diffusion <strong className="text-danger">*</strong> :
              </label>
              <select
                id="listeDiffusion"
                name="listeDiffusion"
                className="form-select"
                value={formData.listeDiffusion?.id}
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
                id="dateDebut"
                type="datetime-local"
                name="dateDebut"
                className="form-control"
                value={formData.dateDebut}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3 form-group">
              <label htmlFor="dateDetection">Date de détection :</label>
              <input
                id="dateDetection"
                name="dateDetection"
                type="datetime-local"
                className="form-control"
                value={formData.dateDetection}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3 form-group">
              <label htmlFor="numTicketEZV">Ticket EZV :</label>
              <input
                id="numTicketEZV"
                name="numTicketEZV"
                type="text"
                className="form-control"
                value={formData.numTicketEZV}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3 form-group">
              <label htmlFor="numTicketOceane">Ticket Océane :</label>
              <input
                id="numTicketOceane"
                name="numTicketOceane"
                type="text"
                className="form-control"
                value={formData.numTicketOceane}
                onChange={handleChange}
              />
            </div>
          </Col>

          <Col sm={6}>
            <Title text="Causes et impacts" />
            <div className="form-group">
              <label htmlFor="impact">
                Impacts <strong className="text-danger">*</strong> :
              </label>
              <textarea
                id="impact"
                name="impact"
                className="form-control"
                value={formData.impact}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3 form-group">
              <label htmlFor="causeRetardNotification">Cause du retard :</label>
              <select
                id="causeRetardNotification"
                name="causeRetardNotification"
                className="form-select"
                value={formData.causeRetardNotification}
                onChange={handleChange}
              >
                <option value="">Sélectionnez la cause</option>
                <option value="Non Supervisé">Non supervisé</option>
                <option value="Retard Diffusion">Retard Diffusion</option>
              </select>
            </div>
            <div className="mb-3 form-group">
              <label htmlFor="typeCauseIncident">
                Origine Cause <strong className="text-danger">*</strong> :
              </label>
              <select
                id="typeCauseIncident"
                name="typeCauseIncident"
                className="form-select"
                value={formData.typeCauseIncident?.id}
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
              <label htmlFor="causeProbable">
                Cause probable <strong className="text-danger">*</strong> :
              </label>
              <textarea
                id="causeProbable"
                className="form-control"
                name="causeProbable"
                rows={4}
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
        {error && <p className="text-danger">{error}</p>}
      </Container>
    </div>
  );
}

export default AddIncident;
