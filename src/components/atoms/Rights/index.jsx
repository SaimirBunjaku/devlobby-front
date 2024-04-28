import React from "react";
import "./Rights.scss";
import { Link } from 'react-router-dom';

export default function Rights() {
    return(
        <div className="rights">
            <div className="container">
                <div>
                    <p>© 2021 DevLobby. All rights reserved.</p>
                </div>
                <div className="links">
                    <Link to="/">Privacy Policy</Link>
                    <Link to="/">Terms of Use</Link>
                    <Link to="">Cookies Policy</Link>
                </div>
            </div>
        </div>
    );
}