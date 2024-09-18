import React, { useEffect, useState } from "react";
import { Container, Row, Col, Table } from "react-bootstrap";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import "../../../Pages/MySMC/Menu/menumysmc.css";
import axios from "axios";
import Title from "../../../Card/Title/Title";
import "./ajoutavis.css";
import { getTokenFromLocalStorage } from "../../Auth/authUtils";
import { useLocation } from "react-router-dom";

function EditIncident({avis, formData, handleEditChange }) {
  const token = getTokenFromLocalStorage();
  const [error, setError] = useState("");
  const [typesAvis, setTypesAvis] = useState([]);
  const [serviceImpact, setServiceImpacte] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [listValidation, setListValidation] = useState([]);
  const [listDiffusion, setListDiffusion] = useState([]);
  const [typeCause, setTypeCause] = useState([]);
  const [serviceSup, setServiceSup] = useState([]); 

  const handleServiceChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions); // Get all selected options
    const selectedValues = selectedOptions.map(option => option.value); // Map them to an array of values (IDs)
    
    const selectedServiceObjects = selectedValues
      .map((selectedValue) => serviceImpact.find(service => service.id === parseInt(selectedValue))) // Find corresponding service objects
      .filter(Boolean); // Ensure no undefined services
  
    setSelectedServices(selectedServiceObjects); // Update selected services
  };
  

  const handleRemoveService = (serviceId) => {
    setSelectedServices(
      selectedServices.filter((service) => service.id !== serviceId)
    );
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

    fetchData(
      "http://localhost:8082/abela-mysmc/api/v1/gestionIncidents/typeavisincidents",
      setTypesAvis
    );
    fetchData(
      "http://localhost:8082/abela-mysmc/api/v1/gestionIncidents/applicationSI/list",
      setServiceImpacte
    );

    if (avis.applicationSis && avis.applicationSis.length > 0) {
      const selectedServiceObjects = avis.applicationSis
        .map((serviceId) => {
          return serviceImpact.find((service) => service.id === serviceId);
        })
        .filter(Boolean);
      setSelectedServices(selectedServiceObjects);
    }

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
    fetchData(
      "http://localhost:8082/abela-mysmc/api/v1/gestionIncidents/services",
      setServiceSup
    );
  }, [avis, token, serviceImpact]);

  const formatDateForInput = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);

    const formattedDate = date.toISOString().slice(0, 16);
    return formattedDate;
  };

  return (
    <div id="home">
     
      <Container className="body">
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
              <label htmlFor="objet">
                Objet <strong className="text-danger">*</strong> :
              </label>
              <input
                type="text"
                name="objet"
                id="objet"
                className="form-control"
                value={formData.objet}
                onChange={handleEditChange}
              />
            </div>
            <div className="mb-3 form-group">
              <label htmlFor="nature">
                Nature <strong className="text-danger">*</strong> :
              </label>
              <select
                name="nature"
                id="nature"
                className="form-control"
                value={formData.nature}
                onChange={handleEditChange}
              >
                <option>{avis.nature}</option>
                <option value="SI">SI</option>
                <option value="DATA">DATA</option>
                <option value="CONTENU">CONTENU</option>
              </select>
            </div>
            <div className="mb-3 form-group">
              <label htmlFor="typeAvisIncident.id">
                Type avis <strong className="text-danger">*</strong> :
              </label>
              <select
                name="typeAvisIncident.id"
                className="form-control"
                value={formData.typeAvisIncident.id}
                onChange={handleEditChange}
              >
                <option value={avis.typeAvisIncident.id}>
                  {avis.typeAvisIncident.nom}
                </option>
                {typesAvis.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.nom}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3 form-group">
              <div>
                <label htmlFor="applicationSis">
                  Services impactés <strong className="text-danger">*</strong> :
                </label>
                <select
                  name="applicationSis"
                  className="form-control"
                //   value={selectedServices.map((service) => service.id)}
                  onChange={handleServiceChange}
                >
                  <option value="">Sélectionnez le service</option>
                  {serviceImpact.map((service) => (
                    <option key={service.id} value={service.id}>
                      {service.nom}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mt-2 selected-services">
                {selectedServices.map((service) => (
                  <span key={service.id} className="badge bg-primary me-2">
                    {service.nom}{" "}
                    <button
                      type="button"
                      className="btn-close btn-close-white"
                      aria-label="Close"
                      onClick={() => handleRemoveService(service.id)}
                    ></button>
                  </span>
                ))}
              </div>
            </div>
            <div className="mb-3 form-group">
              <label htmlFor="valide">
                Liste Validation <strong className="text-danger">*</strong> :
              </label>
              <select
                name="valide"
                className="form-control"
                value={formData.valide}
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
              <label htmlFor="diffusion">
                Liste Diffusion <strong className="text-danger">*</strong> :
              </label>
              <select
                name="diffusion"
                className="form-control"
                value={formData.diffusion}
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
              <label htmlFor="dateDebut">
                Date de début <strong className="text-danger">*</strong> :
              </label>
              <input
                type="datetime-local"
                name="dateDebut"
                id="dateDebut"
                className="form-control"
                value={formatDateForInput(avis.dateDebut)}
                onChange={handleEditChange}
              />
            </div>
            <div className="mb-3 form-group">
              <label htmlFor="dateDetection">
                Date de détection <strong className="text-danger">*</strong> :
              </label>
              <input
                type="datetime-local"
                name="dateDetection"
                id="dateDetection"
                className="form-control"
                value={formatDateForInput(avis.dateDetection)}
                onChange={handleEditChange}
              />
            </div>
            <div className="mb-3 form-group">
              <label htmlFor="autoDateFP">
                Calcul Date FP <strong className="text-danger">*</strong> :
              </label>
              <select
                name="autoDateFP"
                className="form-control"
                value={formData.autoDateFP}
                onChange={handleEditChange}
              >
                <option value="Oui">Oui</option>
                <option value="Non">Non</option>
              </select>
            </div>

            <div className="mb-3 form-group">
              <label htmlFor="dateFinPrevisionnelle">
                Date Fin Previsionnelle :
              </label>
              <input
                type="datetime-local"
                name="dateFinPrevisionnelle"
                id="dateFinPrevisionnelle"
                className="form-control"
                value={formatDateForInput(avis.dateFinPrevisionnelle)}
                onChange={handleEditChange}
              />
            </div>
            <div className="mb-3 form-group">
              <label htmlFor="dateFermeture">Date Fermeture :</label>
              <input
                type="datetime-local"
                name="dateFermeture"
                id="dateFermeture"
                className="form-control"
                value={formData.dateFermeture}
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
                value={formData.numTicketEZV}
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
                value={formData.numTicketOceane}
                onChange={handleEditChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="commentaire">Commentaires :</label>
              <textarea
                id="commentaire"
                className="form-control"
                name="commentaire"
                placeholder="Indiquer le message en cas d'annulation ou de renvoi de l'avis"
                value={formData.commentaire}
                onChange={handleEditChange}
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
                className="form-control"
                name="impact"
                value={formData.impact}
                // value={formData.impact}
                onChange={handleEditChange}
              />
            </div>
            <div className="mb-3 form-group">
              <label htmlFor="causeRetardNotification">
                Cause Retard Notification :
              </label>
              <select
                name="causeRetardNotification"
                className="form-control"
                value={formData.causeRetardNotification}
                onChange={handleEditChange}
              >
                <option value="">Sélectionnez la cause</option>
                <option value="Non Supervisé">Non Supervisé</option>
                <option value="Retard Diffusion">Retard Diffusion</option>
              </select>
            </div>
            <div className="mb-3 form-group">
              <label htmlFor="typeCauseIncident.id">
                Origine cause <strong className="text-danger">*</strong> :
              </label>
              <select
                name="typeCauseIncident.id"
                className="form-control"
                value={formData.typeCauseIncident.id}
                onChange={handleEditChange}
              >
                <option value={avis.typeCauseIncident.id}>
                  {avis.typeCauseIncident.intitule}
                </option>
                {typeCause.map((cause) => (
                  <option key={cause.id} value={cause.id}>
                    {cause.intitule}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="causeProbable">
                Causes probables <strong className="text-danger">*</strong> :
              </label>
              <textarea
                id="causeProbable"
                className="form-control"
                name="causeProbable"
                value={formData.causes}
                onChange={handleEditChange}
                placeholder="(*) Demander systématiquement aux TMC(s) les causes probables
                          (*) Eviter les expressions « Investigations en Cours » ; « causes inconnues » et préférer mettre « constat : xxxxxxxx »"
              />
            </div>
            <div className="form-group">
              <label htmlFor="observations">
                Observations <strong className="text-danger">*</strong> :
              </label>
              <textarea
                id="observations"
                className="form-control"
                name="observations"
                value={formData.observations}
                onChange={handleEditChange}
                placeholder="Renseigner les observations"
              />
            </div>
            <div className="form-group">
              <label htmlFor="troubleshooting">Actions de relève :</label>
              <textarea
                id="troubleshooting"
                className="form-control"
                name="troubleshooting"
                value={formData.troubleshooting}
                onChange={handleEditChange}
                placeholder="Decrire les actions de relève"
              />
            </div>
            <div className="mb-3 form-group">
              <label htmlFor="entite">Entité Responsable :</label>
              <select
                name="entite"
                className="form-control"
                value={formData.entite?.id || ""}
                // value={formData.
                onChange={handleEditChange}
              >
                <option value="">Sélectionnez l'entité</option>
                {serviceSup.map((service) => (
                  <option key={service.id} value={service.id}>
                    {service.nom}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3 form-group">
              <label htmlFor="tcm">TMC qui a relevé :</label>
              <select
                name="tmc"
                className="form-control"
                value={formData.tmc?.id || ""}
                onChange={handleEditChange}
              >
                <option value="">Sélectionnez le TMC</option>
                {serviceSup.map((service) => (
                  <option key={service.id} value={service.id}>
                    {service.nom}
                  </option>
                ))}
              </select>
            </div>
          </Col>
        </Row>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </Container>
    </div>
  );
}

export default EditIncident;
