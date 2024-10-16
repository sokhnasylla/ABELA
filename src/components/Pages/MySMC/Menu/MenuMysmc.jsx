import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import status from "../../../../assets/status.png";
import menupng from "../../../../assets/menu.png";
import problem from "../../../../assets/problem.jpg";
import analytic from "../../../../assets/analytics.png";
import diagram from "../../../../assets/diagram.png";
import homemysmc from "../../../../assets/homemysmc.png";
import './menumysmc.css';

function MenuMysmc() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
        <div className="menusmc">
          <div className="Ads" onClick={toggleSidebar}>
          <img  width="30px" height="30px" src={menupng} alt=''/>
          </div>
          <div className="Ad">
            <Link to="/mysmc/gestionincident">
              <img src={status} alt="Gestion Incidents" />
              <span className="text">Gestion Incidents</span>
            </Link>
          </div>
          <div className="Ad">
            <Link to="/mysmc/gestionprobleme">
              <img src={problem} alt="Gestion Problème" />
              <span className="text">Gestion Problème</span>
            </Link>
          </div>
          <div className="Ad">
            <Link to="/mysmc/etatsupervision">
              <img src={analytic} alt="Etat Supervision" />
              <span className="text">Etat Supervision</span>
            </Link>
          </div>
          <div className="Ad">
            <Link to="/mysmc/suivisactivites">
              <img src={diagram} alt="Suivi Activités" />
              <span className="text">Suivi Activités</span>
            </Link>
          </div>
          <div className="Ad">
            <Link to="/mysmc/">
              <img src={homemysmc} alt="Home" />
              <span className="text">Home MySMC</span>
            </Link>
          </div>
        </div>
      </div>
  );
}

export default MenuMysmc;
