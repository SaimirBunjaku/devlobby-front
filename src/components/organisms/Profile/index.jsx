import React, { useContext, useState, useEffect } from "react";
import "./Profile.scss";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../utils/AuthContext";
import { FaTwitterSquare, FaLinkedin, FaGithubSquare } from "react-icons/fa";
import EditProfileForm from "../EditProfile";
import DefaultProfilePicture from "../../../assets/images/icon.png";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const ProfileCard = () => {
  const { userData, isLoggedIn } = useContext(AuthContext);
  const [showEditModal, setShowEditModal] = useState(false); 
  const navigate = useNavigate(); 


  const openEditModal = () => {
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
  };

  const handleProfileUpdate = () => {
    toast.success('Profile has been updated', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      });
  };

 // when user isnt logged in take them to login page
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login"); 
    }
  }, [isLoggedIn, navigate]);

  return (
    
    <div className="profile-container">
      <div className="profile-card">
        <header className="profile-header">
          {userData && (
            <>
              <img
                src={userData.profilePicture || DefaultProfilePicture}
                alt="Profile"
                className="profile-image"
                onError={(e) => {
                  e.target.src = DefaultProfilePicture;
                }}
              />
              <p className="profile-fullName">{userData.fullName}</p>
              <p className="profile-username">@{userData.username}</p>
              <p className="profile-description">{userData.email}</p>
              <p className="profile-bio">
                {userData.bio ? userData.bio : "Add a bio!"}
              </p>
            </>
          )}
          <div className="profile-social-links">
            <Link to="twitter">
              <FaTwitterSquare />
            </Link>
            <Link to="linkedin">
              <FaLinkedin />
            </Link>
            <Link to="github">
              <FaGithubSquare />
            </Link>
          </div>
          {!showEditModal && (
            <button className="edit-profile-btn" onClick={openEditModal}>
              Edit Profile
            </button>
          )}
        </header>
      </div>
      <div className="profile-body">
        {showEditModal && <EditProfileForm onClose={closeEditModal} userId={userData.userId}  onSuccess={handleProfileUpdate}/>}
        <section className="profile-about">
          <h2>About</h2>
          {userData && (  //check if userdata isnt null
            <>
              <p>
                {userData.expectedGraduationYear && parseInt(userData.expectedGraduationYear, 10) >= 2024 ? (
                  "Expected Year of Graduation"
                ) : (
                  "Year of Graduation"
                )}:{" "}
                {userData.expectedGraduationYear ? (
                  userData.expectedGraduationYear
                ) : (
                  <span className="empty-field-message">Please add your graduation year</span>
                )}
              </p>
              <p>
                Education:{" "}
                {userData.education ? (
                  userData.education
                ) : (
                  <span className="empty-field-message">Please add your education</span>
                )}
              </p>
            </>
          )}
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
            {userData && userData.skills && userData.skills.length > 0 ? ( //check if skills are not null
              userData.skills.map((skill, index) => (
                <div className="skill verified" key={index}>
                  {skill}
                </div>
              ))
            ) : (
              <span className="empty-field-message">Please add your skills</span>
            )}
          </div>
        </section>
        <section className="profile-experience">
          <h2>Work Experience</h2>
          <div className="experience-container">
            {userData && userData.workExperience && userData.workExperience.length > 0 ? ( //check if userData and userData.workExperience are not null
              userData.workExperience.map((experience, index) => <p key={index}>{experience}</p>)
            ) : (
              <span className="empty-field-message">Please add your work experience</span>
            )}
          </div>
        </section>
      </div>
      <ToastContainer />
    </div>
  );
};
//we check for when user data, grad year, skills, and experience are not null to avoid potential errors of trying to access properties of null objects
//so that we're taken to the login page, instead of showing the user error  messages when they try to access this component without logging in first
export default ProfileCard;