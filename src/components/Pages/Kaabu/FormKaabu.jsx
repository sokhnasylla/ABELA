import { Button } from '@mui/material';
import { green } from '@mui/material/colors';
import React, { Component } from 'react';
import { Card, Table, Modal } from 'react-bootstrap';
import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
import { sendMessageService } from './kaabu.service';
import { AlertService } from '../../../utils/alert.service';

function getStatusText(status) {
  switch (status) {
    case "0":
      return { text: "Activer", backgroundColor: "#40E0D0", color: "white" };
    case "-1":
      return { text: "Désactiver", backgroundColor: "#DC143C", color: "white" };
    case "1":
      return { text: "Suspendre", backgroundColor: "#DC143C", color: "white" };
    case "2":
      return { text: "Cloturer", backgroundColor: "#DC143C", color: "white" };
    default:
      return { text: "Inconnu", backgroundColor: "black", color: "white" };
  }
}

class FormKaabu extends Component {
 alertService = new AlertService();

  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      message: "Bjr. Si vous avez des difficultes pour utiliser KAABU sur ANDROID, desinstallez votre version actuelle et installez la nouvelle version de KAABU 0.x.x Lien Telechargement: "
    };
  }

  handleShowModal = () => {
    this.setState({ showModal: true });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false });
  };

  handleSendMessage = () => {
    const sms = {telephone: this.props.userkaabu.telephone, contact: this.props.userkaabu.contact, message: this.state.message }
    console.log("------------MESSAGE ------------ ", sms);
    sendMessageService(sms).then(response => {
      if (response) {
        if (response.success) {
          this.alertService.showNotificationAlertSuccess(response.data);
        }else {
          this.alertService.showNotificationAlertError(response.message);
        }
      }
    }).finally(() => {
      this.setState({ showModal: false });
    })
  };

  handleChangeMessage = (event) => {
    this.setState({ message: event.target.value });
  };

  render() {
    const { userkaabu } = this.props;
    const { showModal, message } = this.state;

    return (
      <Card style={{ marginTop: "50px", borderRadius: "1px" }}>
        <Card.Header style={{ backgroundColor: "#F0F8FF", borderRadius: "0px" }} className="text-center fs-4">Kaabu</Card.Header>
        <Card.Body style={{ padding: "0px" }}>
          <Table striped bordered hover style={{ margin: "0px" }}>
            {userkaabu && (
              <tbody>
                <tr>
                  <th style={{ width: "170px" }}>Prénom:</th>
                  <td>{userkaabu.prenom}</td>
                </tr>
                <tr>
                  <th>Nom:</th>
                  <td>{userkaabu.nom}</td>
                </tr>
                <tr>
                  <th>Login:</th>
                  <td>{userkaabu.username}</td>
                </tr>
                <tr>
                  <th>Statut:</th>
                  <td style={{ backgroundColor: userkaabu.status ? getStatusText(userkaabu.status).backgroundColor : "", color: "white", fontWeight: "bold" }}>
                    {userkaabu.status && getStatusText(userkaabu.status).text}
                  </td>
                </tr>
                <tr>
                  <th>Numéro Vendeur:</th>
                  <td>{userkaabu.telephone}</td>
                </tr>
                <tr>
                  <th>Contact:</th>
                  <td>
                    {userkaabu.contact}
                    {userkaabu.telephone === userkaabu.contact ? (
                      <FaCheckCircle style={{ float: "right", color: "#40E0D0", fontSize: '125%' }} />
                    ) : (
                      <FaExclamationCircle style={{ float: "right", color: "#FFD700", fontSize: '125%' }} />
                    )}
                  </td>
                </tr>
                <tr>
                  <th>TypeUser:</th>
                  <td>{userkaabu.typeuser}</td>
                </tr>
                <tr>
                  <th>Date Création:</th>
                  <td>
                    {new Date(userkaabu.dateCreation).toLocaleDateString(
                      "fr-FR",
                      {
                        day: "numeric",
                        month: "numeric",
                        year: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                        second: "numeric",
                      }
                    )}
                  </td>
                </tr>
                <tr>
                  <th>Role:</th>
                  <td style={{
                    backgroundColor: userkaabu.role === "Vendeur" ? "#40E0D0" : "#DC143C",
                    color: userkaabu.role === "Vendeur" ? "white" : "white",
                    fontWeight: userkaabu.role === "Vendeur" ? "bold" : "bold"
                  }}>
                    {userkaabu.role}
                  </td>
                </tr>
                <tr>
                  <th>Profil:</th>
                  <td>
                    <ul>
                      {userkaabu.profils.map((profil, index) => (
                        <li key={index}>{profil}</li>
                      ))}
                    </ul>
                  </td>
                </tr>
                <tr>
                  <th>Opérations:</th>
                  <td>
                    <ul>
                      {userkaabu.operations.map((operation, index) => (
                        <li key={index}>{operation}</li>
                      ))}
                    </ul>
                  </td>
                </tr>
                <tr>
                  <th>Versions Disponibles:</th>
                  <td>
                    <ul>
                      {userkaabu.versionsDisponible.map((version, index) => (
                        <li key={index}>{version}</li>
                      ))}
                    </ul>
                    <Button variant="primary" size="sm" onClick={this.handleShowModal} style={{ marginTop: '1px', fontSize: '90%', fontWeight: 'bold', color: "white", backgroundColor: "black", borderColor: " black" }}>
                      Envoyer un message
                    </Button>
                  </td>
                </tr>
                <tr>
                  <th>Version Installée:</th>
                  {userkaabu.versionsInstalle ? (<td>
                    <ul>
                      <li>{userkaabu.versionsInstalle} </li>
                      <li>
                        <span>{new Date(userkaabu.dateLastTransaction).toLocaleDateString("fr-FR", { day: "numeric", month: "numeric", year: "numeric", hour: "numeric", minute: "numeric", second: "numeric", })}</span>
                      </li>
                    </ul>
                  </td>) : (<td>Pas de demande</td>)}
                </tr>
              </tbody>
            )}
          </Table>
          {!userkaabu && (<div style={{ top: "20px" }} className="alert alert-danger" role="alert">L'utilisateur n'existe pas sur Kaabu</div>)}
        </Card.Body>

        <Modal show={showModal} onHide={this.handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Envoyer un message</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <div className="mb-3">
                <label htmlFor="message" className="form-label">Message:</label>
                <textarea className="form-control" id="message" rows="3" value={message} onChange={this.handleChangeMessage}></textarea>
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" sx={{color: "red"}} onClick={this.handleCloseModal}>
              Fermer
            </Button>
            <Button variant="primary" sx={{color: "#FF6600"}} onClick={this.handleSendMessage}>
              Envoyer
            </Button>
          </Modal.Footer>
        </Modal>
      </Card>
    );
  }
}

export default FormKaabu;
