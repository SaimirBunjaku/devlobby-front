import React from "react";
import "./StatsComponent.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFlag,
  faCalendar,
  faCloud,
  faShieldAlt,
} from "@fortawesome/free-solid-svg-icons";

const StatsComponent = () => {
  return (
    <center>
      <div className="stats-container">
        <div className="stat first">
          <div className="stat-icon">
            <FontAwesomeIcon icon={faFlag} />
          </div>
          <div className="stat-value">18+</div>
          <div className="stat-description">Nation Services</div>
        </div>
        <div className="stat">
          <div className="stat-icon">
            <FontAwesomeIcon icon={faCalendar} />
          </div>
          <div className="stat-value">10+</div>
          <div className="stat-description">Years Experience</div>
        </div>
        <div className="stat">
          <div className="stat-icon">
            <FontAwesomeIcon icon={faCloud} />
          </div>
          <div className="stat-value">400+</div>
          <div className="stat-description">Cloud Protection</div>
        </div>
        <div className="stat">
          <div className="stat-icon">
            <FontAwesomeIcon icon={faShieldAlt} />
          </div>
          <div className="stat-value">99%</div>
          <div className="stat-description">Protection Rate</div>
        </div>
      </div>
    </center>
  );
};

export default StatsComponent;
