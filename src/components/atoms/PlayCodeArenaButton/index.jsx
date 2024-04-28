import React from "react";
import { Link } from "react-router-dom";
import "./PlayCodeArenaButton.scss";

function PlayCodeArenaButton() {
  return (
    <div className="playCodeArenaButton">
      <Link to="/playcodearena" className="playcodearena-button">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        PlayCode Arena
      </Link>
    </div>
  );
}

export default PlayCodeArenaButton;
