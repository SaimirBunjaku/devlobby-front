import React from "react";
import "./ContentModuleContactUs.scss";
import ContactUsRobot from "../../../../assets/images/ContactUsRobot-removebg.png";
import { Link } from "react-router-dom";
import Idea from "../../../../assets/images/idea.gif";

const ContentModuleContactUs = () => {
  return (
    <div className="content-module-contact-us">
      <div className="content-image">
        <img src={ContactUsRobot} alt="Contact Us Robot" />
      </div>
      <div className="content-info">
        <div className="idea-pic">
          <img src={Idea} alt="idea" />
          <h1>
            Get in
            <span className="devLobby">Touch</span>.
          </h1>
        </div>
        <br />
        <p>
          Whether you're stuck on a problem or just want to chat about the
          latest in tech, our doors are always open. Connect with our team and
          let us help you navigate through the tech landscape with ease.
        </p>
        <p>
          Our team is ready and eager to provide the support, answers, and
          conversation you need to make your tech journey smooth and enjoyable.
        </p>
        <Link to="/contactus" className="btn-contact">
          Contact Us Now
        </Link>
        <br /> <br />
        <p>Great minds think alike!</p>
      </div>
    </div>
  );
};

export default ContentModuleContactUs;
