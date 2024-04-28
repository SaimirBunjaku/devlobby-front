import React from "react";
import "./Footer.scss";
import { Link } from "react-router-dom";
import logo from "../../../assets/images/devlobby-logo-cut.png";
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaPhone } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

export default function Footer() {
  return (
    <div className="footer">
      <div className="container">
        <div className="footer-dev">
          <img src={logo} alt="DevLobby Logo" />
          <p>
            If you have a strong interest in addressing compelling challenges,
            we welcome the opportunity to connect with you.
          </p>
          <div className="links">
            <Link to="">
              <FaFacebook />
            </Link>
            <Link to="">
              <FaTwitter />
            </Link>
            <Link to="">
              <FaGithub />
            </Link>
            <Link to="">
              <FaInstagram />
            </Link>
          </div>
        </div>
        <div className="socials">
          <h2>Company</h2>
          <Link to="/about">About</Link>
          <Link to="/services">Services</Link>
          <Link to="/contact">Community</Link>
        </div>
        <div className="socials">
          <h2>Support</h2>
          <Link to="/contact">Contact</Link>
          <Link to="/faq">FAQ</Link>
          <Link to="/privacy">Feedback</Link>
        </div>
        <div className="socials">
          <h2>Links</h2>
          <Link to="/playcodearena">Playcode Arena</Link>
          <Link to="">Chat</Link>
          <Link to="/blog">Blog</Link>
        </div>
        <div className="socials">
          <h2 className="contact">Contact Us</h2>
          <p>
            <FaPhone /> (383)-44-123-123
          </p>
          <p>
            <MdEmail /> email@mail.com
          </p>
        </div>
      </div>
    </div>
  );
}
