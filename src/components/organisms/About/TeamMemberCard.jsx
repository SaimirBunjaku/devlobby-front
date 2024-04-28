import React from 'react';
import { Link } from 'react-router-dom';
import "./About.scss"

const TeamMemberCard = ({ member, isLead  }) => (
  <div className="team-member-card">
    <Link to={`/user/${member.id}`} className="members">
      <div className={`avatar ${member.gender}`}></div>
      <div className="member-info">
        <h3>{member.name}</h3>
        <p>{member.position}</p>
      </div>
    </Link>
  </div>
);

export default TeamMemberCard;