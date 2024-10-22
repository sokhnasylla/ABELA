import React, { memo, useState } from "react";
import { Link } from "react-router-dom";
import status from "../../../../assets/status.png";
import menupng from "../../../../assets/menu.png";
import problem from "../../../../assets/problem.jpg";
import analytic from "../../../../assets/analytics.png";
import diagram from "../../../../assets/diagram.png";
import homemysmc from "../../../../assets/homemysmc.png";
import cross from "../../../../assets/cross.jpg";
import "./menumysmc.css";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

const MenuMysmc = memo(function MenuMysmc() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
      <div className="menusmc">
        <div className="Ads d-flex justify-content-end" onClick={toggleSidebar}>
          {isOpen ? (
            <img
              width="30px"
              height="30px"
              src={cross}
              alt="Close Icon"
              aria-label="Close Sidebar"
            />
          ) : (
            <img
              width="30px"
              height="30px"
              src={menupng}
              alt="Menu Icon"
              aria-label="Open Sidebar"
            />
          )}
        </div>
        <div className="Ad">
          <OverlayTrigger
            placement="right"
            overlay={
              <Tooltip id={`tooltip-gestion-incident`}>
                Gestion Incidents
              </Tooltip>
            }
          >
            <Link to="/mysmc/gestionincident">
              <img src={status} alt="Gestion Incidents" />
              <span className="text">Gestion Incidents</span>
            </Link>
          </OverlayTrigger>
        </div>
        <div className="Ad">
          <OverlayTrigger
            placement="right"
            overlay={
              <Tooltip id={`tooltip-gestion-probleme`}>
                Gestion Problème
              </Tooltip>
            }
          >
            <Link to="/mysmc/gestionprobleme">
              <img src={problem} alt="Gestion Problème" />
              <span className="text">Gestion Problème</span>
            </Link>
          </OverlayTrigger>
        </div>
        <div className="Ad">
          <OverlayTrigger
            placement="right"
            overlay={
              <Tooltip id={`tooltip-etat-supervision`}>
                Etat Supervision
              </Tooltip>
            }
          >
            <Link to="/mysmc/etatsupervision">
              <img src={analytic} alt="Etat Supervision" />
              <span className="text">Etat Supervision</span>
            </Link>
          </OverlayTrigger>
        </div>
        <div className="Ad">
          <OverlayTrigger
            placement="right"
            overlay={
              <Tooltip id={`tooltip-suivi-activites`}>Suivi Activités</Tooltip>
            }
          >
            <Link to="/mysmc/suivisactivites">
              <img src={diagram} alt="Suivi Activités" />
              <span className="text">Suivi Activités</span>
            </Link>
          </OverlayTrigger>
        </div>
        <div className="Ad">
          <OverlayTrigger
            placement="right"
            overlay={<Tooltip id={`tooltip-home-mysmc`}>Home MySMC</Tooltip>}
          >
            <Link to="/mysmc/">
              <img src={homemysmc} alt="Home" />
              <span className="text">Home MySMC</span>
            </Link>
          </OverlayTrigger>
        </div>
      </div>
    </div>
  );
});

export default MenuMysmc;
