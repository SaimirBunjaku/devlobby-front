import React from "react";
import { useParams } from "react-router-dom";
import "../../organisms/Profile/Profile.scss";
import "./About.scss"
import AvatarMale from "../../../assets/images/male-avatar.jpg";
import { Link } from "react-router-dom";
import { FaTwitterSquare, FaLinkedin, FaGithubSquare } from "react-icons/fa";

const ProfileUser = () => {
  const { id } = useParams(); 

  const teamMembers = [
    { id: 1, name: 'Leonat Krasniqi', username:'leonat_krasniqi', position: 'Lead Team', gender: 'male' },
    { id: 2, name: 'Abedin Telaku', username:'abedin_telaku', position: 'Web Developer', gender: 'male' },
    { id: 3, name: 'Agnit Misini', username:'agnit_misini', position: 'Web Developer', gender: 'male' },
    { id: 4, name: 'Edber Vuçitërna', username:'edber_vuçitërna', position: 'Web Developer', gender: 'male' },
    { id: 5, name: 'Lisa Ramizi', username:'lisa_ramizi', position: 'Web Developer', gender: 'female' },
    { id: 6, name: 'Leon Miftari', username:'leon_miftari', position: 'Web Developer', gender: 'male' },
    { id: 7, name: 'Nol Ahmedi', username:'nol_ahmedi', position: 'Web Developer', gender: 'male' },
    { id: 8, name: 'Orges Isufi', username:'orges_isufi', position: 'Web Developer', gender: 'male' },
    { id: 9, name: 'Saimir Bunjaku', username:'saimir_bunjaku', position: 'Web Developer', gender: 'male' },
    { id: 10, name: 'Shpat Spahiu', username:'shpat_spahiu', position: 'Web Developer', gender: 'male' },
  ];

  const selectedUser = teamMembers.find(member => member.id.toString() === id);

  return (
    <div className="profile-container">
      <div className="profile-card">
        <header className="profile-header">
          <img src={AvatarMale} alt="Profile" className="profile-image" />
          {selectedUser ? (
            <>
              <h1 className="profile-name">{selectedUser.name}</h1>
              <p className="profile-username">@{selectedUser.username}</p>
            </>
          ) : (
            <p>User not found</p> 
          )}
          <div className="profile-social-links">
            <Link to="/twitter">
              <FaTwitterSquare />
            </Link>
            <Link to="/linkedin">
              <FaLinkedin />
            </Link>
            <Link to="/github">
              <FaGithubSquare />
            </Link>
          </div>
        </header>
      </div>
      <div className="profile-body">
        <section className="profile-about">
          <h2>About</h2>
          <p>Expected year of Graduation: 2024</p>
          <p>Education: University for Business and Technology (UBT)</p>
        </section>
        <section className="profile-badges">
          <h2>Badges</h2>
          <div className="badges-container">
            <div className="badge">C++</div>
            <div className="badge">Java</div>
            <div className="badge">Python</div>
            <div className="badge">30 Days of Code</div>
            <div className="badge">C Language</div>
          </div>
        </section>
        <section className="profile-skills">
          <h2>Verified Skills</h2>
          <div className="skills-container">
            <div className="skill verified">Python (Basic)</div>
            <div className="skill verified">React JS</div>
          </div>
        </section>
        <section className="profile-experience">
          <h2>Work Experience</h2>
          <button className="add-experience-btn">Starlabs</button>
        </section>
      </div>
    </div>
  );
};

export default ProfileUser;
