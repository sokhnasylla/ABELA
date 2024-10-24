import React, { useEffect, useState } from "react";
import { Container, Row, Col, Table } from "react-bootstrap";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import "../../../Pages/MySMC/Menu/menumysmc.css";
import axios from "axios";
import Title from "../../../Card/Title/Title";
import "./ajoutavis.css";
import { getTokenFromLocalStorage } from "../../Auth/authUtils";
import makeAnimated from "react-select/animated";
import Select from "react-select";
import { abelaURL } from "../../../../config/global.constant";

function EditIncident({
  avis,
  formData,
  handleEditChange,
  handleServiceChange,
}) {
  const token = getTokenFromLocalStorage();
  const [error, setError] = useState("");
  const [typesAvis, setTypesAvis] = useState([]);
  const [serviceImpacte, setServiceImpacte] = useState([]);
  const [listValidation, setListValidation] = useState([]);
  const [listDiffusion, setListDiffusion] = useState([]);
  const [typeCause, setTypeCause] = useState([]);
  const [serviceSup, setServiceSup] = useState([]);
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
    fetchData(`${abelaURL}/services`, setServiceSup);
  }, [avis, token, serviceImpacte]);

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
                id="objet"
                name="objet"
                type="text"
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
                id="nature"
                name="nature"
                className="form-select"
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
              <label htmlFor="typeAvisIncident">
                Type avis <strong className="text-danger">*</strong> :
              </label>
              <select
                id="typeAvisIncident"
                name="typeAvisIncident.id"
                className="form-select"
                value={formData.typeAvisIncident?.id}
                onChange={handleEditChange}
                placeholder={avis.typeAvisIncident?.nom}
              >
                {typesAvis.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.nom}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3 form-group">
              <label htmlFor="applicationSis">
                Services impactés <strong className="text-danger">*</strong> :
              </label>
              <Select
                isMulti
                id="applicationSis"
                name="applicationSis"
                options={serviceImpacte.map((service) => ({
                  value: service.id,
                  label: service.nom,
                }))}
                components={animatedComponents}
                value={
                  formData.applicationSis
                    ? formData.applicationSis.map((service) => ({
                        value: service.id,
                        label: service.nom,
                      }))
                    : []
                }
                onChange={handleServiceChange}
                placeholder="Sélectionnez le(s) service(s)"
              />
            </div>
            <div className="mb-3 form-group">
              <label htmlFor="listeValidation">
                Liste Validation <strong className="text-danger">*</strong> :
              </label>
              <select
                id="listeValidation"
                name="listeValidation.id"
                className="form-select"
                value={formData.listValidation?.id}
                onChange={handleEditChange}
                placeholder={avis.listeValidation?.nom}
              >
                {listValidation.map((validation) => (
                  <option key={validation.id} value={validation.id}>
                    {validation.nom}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3 form-group">
              <label htmlFor="listeDiffusion">
                Liste Diffusion <strong className="text-danger">*</strong> :
              </label>
              <select
                id="listeDiffusion"
                name="listeDiffusion.id"
                className="form-select"
                value={formData.listDiffusion?.id}
                onChange={handleEditChange}
                placeholder={avis.listeDiffusion?.nom}
              >
                <option value={avis.listeDiffusion?.id}>
                  {avis.listeDiffusion?.nom}
                </option>
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
                id="dateDebut"
                name="dateDebut"
                type="datetime-local"
                className="form-control"
                value={formatDateForInput(formData.dateDebut)}
                onChange={handleEditChange}
              />
            </div>
            <div className="mb-3 form-group">
              <label htmlFor="dateDetection">
                Date de détection <strong className="text-danger">*</strong> :
              </label>
              <input
                id="dateDetection"
                name="dateDetection"
                type="datetime-local"
                className="form-control"
                value={formatDateForInput(formData.dateDetection)}
                onChange={handleEditChange}
              />
            </div>
            <div className="mb-3 form-group">
              <label htmlFor="autoDateFP">
                Calcul Date FP <strong className="text-danger">*</strong> :
              </label>
              <select
                id="autoDateFP"
                name="autoDateFP"
                className="form-select"
                value={formData.autoDateFP}
                onChange={handleEditChange}
              >
                <option value="true">Oui</option>
                <option value="false">Non</option>
              </select>
            </div>

            <div className="mb-3 form-group">
              <label htmlFor="dateFinPrevisionnelle">
                Date Fin Previsionnelle :
              </label>
              <input
                id="dateFinPrevisionnelle"
                name="dateFinPrevisionnelle"
                type="datetime-local"
                className="form-control"
                value={formatDateForInput(formData.dateFinPrevisionnelle)}
                onChange={handleEditChange}
              />
            </div>
            <div className="mb-3 form-group">
              <label htmlFor="dateFermeture">Date Fermeture :</label>
              <input
                id="dateFermeture"
                name="dateFermeture"
                type="datetime-local"
                className="form-control"
                value={formatDateForInput(formData.dateFermeture)}
                onChange={handleEditChange}
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
                onChange={handleEditChange}
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
                onChange={handleEditChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="commentaire">Commentaires :</label>
              <textarea
                id="commentaire"
                name="commentaire"
                className="form-control"
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
                name="impact"
                className="form-control"
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
                id="causeRetardNotification"
                name="causeRetardNotification"
                className="form-select"
                value={formData.causeRetardNotification}
                onChange={handleEditChange}
              >
                <option value="">Sélectionnez la cause</option>
                <option value="Non Supervisé">Non Supervisé</option>
                <option value="Retard Diffusion">Retard Diffusion</option>
              </select>
            </div>
            <div className="mb-3 form-group">
              <label htmlFor="typeCauseIncident">
                Origine cause <strong className="text-danger">*</strong> :
              </label>
              <select
                id="typeCauseIncident"
                name="typeCauseIncident.id"
                className="form-select"
                value={formData.typeCauseIncident?.id}
                onChange={handleEditChange}
              >
                <option value={avis.typeCauseIncident?.id}>
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
                name="causeProbable"
                className="form-control"
                rows={4}
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
                name="observations"
                className="form-control"
                value={formData.observations}
                onChange={handleEditChange}
                placeholder="Renseigner les observations"
              />
            </div>
            <div className="form-group">
              <label htmlFor="troubleshooting">Actions de relève :</label>
              <textarea
                id="troubleshooting"
                name="troubleshooting"
                className="form-control"
                value={formData.troubleshooting}
                onChange={handleEditChange}
                placeholder="Decrire les actions de relève"
              />
            </div>
            <div className="mb-3 form-group">
              <label htmlFor="entite">Entité Responsable :</label>
              <select
                id="entite"
                name="entite"
                className="form-select"
                value={formData.entite?.id || ""}
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
              <label htmlFor="tmc">TMC qui a relevé :</label>
              <select
                id="tmc"
                name="tmc"
                className="form-select"
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
