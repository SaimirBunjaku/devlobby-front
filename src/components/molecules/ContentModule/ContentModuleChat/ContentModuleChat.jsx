import React from "react";
import "./ContentModuleChat.scss";
import HighTechGirl from "../../../../assets/images/hightechgirl.png";
import { Link } from "react-router-dom";

const ContentModuleChat = () => {
  return (
    <div className="content-module-chat">
      <div className="content-image">
        <img src={HighTechGirl} alt="High Technology Girl" />
      </div>
      <div className="content-info">
        <h1 className="chat-header">
          Communicate with all the devs. that chose
          <span className="devLobby">DevLobby</span> as their safe space
        </h1>
        <p>
          Your time here is valuable. Our comfort approach is designed to make
          you feel full with a crowded space of developers. With cutting-edge
          technology and an expert team, we ensure your peace of mind in the
          digital era.
        </p>
        <Link to="/chat" className="btn-chat">
          Start a Conversation
        </Link>
        <br /> <br />
        <p>Make yourself at home, dev.</p>
      </div>
    </div>
  );
};

export default ContentModuleChat;
