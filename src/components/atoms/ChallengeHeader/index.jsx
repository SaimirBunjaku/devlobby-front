import React from "react";
import "./ChallengeHeader.scss";


export default function ChallengeHeader() {
    return (
        <div className="challenge-header">
            <div className="challenge-header__title">
                <h1>Challenges</h1>
            </div>
            <div className="challenge-header__subtitle">
                <h5>Select a challenge to solve</h5>
            </div>
        </div>
    );
}