import React, { useState } from "react";
import "./EditProfileForm.scss";
import { AuthService } from "../../../services/AuthService";
import { FaUserEdit } from "react-icons/fa";
import { IoIosCloseCircleOutline } from "react-icons/io";

// convert selected profile pic to base64
function convertToBase64(file) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
}

// compress image using canvas and adjust JPEG quality
async function compressImage(file) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.src = URL.createObjectURL(file);
    image.onload = () => {
      const canvas = document.createElement("canvas");
      const MAX_WIDTH = 500;
      const MAX_HEIGHT = 500;
      let width = image.width;
      let height = image.height;

      // Resize logic
      if (width > MAX_WIDTH || height > MAX_HEIGHT) {
        if (width > height) {
          height *= MAX_WIDTH / width;
          width = MAX_WIDTH;
        } else {
          width *= MAX_HEIGHT / height;
          height = MAX_HEIGHT;
        }
      }

      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(image, 0, 0, width, height);

      canvas.toBlob((blob) => {
        resolve(blob);
      }, 'image/jpeg', 0.7);  // Lowering the quality to 0.7 per me e reduce size
    };
    image.onerror = (error) => {
      reject(error);
    };
  });
}

const EditProfileForm = ({ onClose, userId, onSuccess }) => {
  const [graduationYear, setGraduationYear] = useState("");
  const [education, setEducation] = useState("");
  const [skills, setSkills] = useState("");
  const [workExperience, setWorkExperience] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [bio, setBio] = useState("");
  const [fullName, setFullName] = useState ("")
  const [errorMsg, setErrorMsg] = useState("");
  
  // Update maximum file size limit in bytes for example 1MB
  const maxSize = 10485760; // (larger than 1MB for testing)

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (graduationYear.trim() !== "" && isNaN(graduationYear)) {
        setErrorMsg("Please enter a valid graduation year.");
        return;
      }

      if (profilePicture && profilePicture.size > maxSize) {
        setErrorMsg("File size exceeds the maximum limit. Please select a smaller image.");
        return;
      }

      const compressedProfilePicture = profilePicture ? await compressImage(profilePicture) : null;

      // Convert profile picture to base64 before passing it to updateUserProfile
      const base64ProfilePicture = compressedProfilePicture ? await convertToBase64(compressedProfilePicture) : null;

      const updatedUserData = {};

      if (graduationYear) {
        updatedUserData.expectedGraduationYear = graduationYear;
      }
      if (education) {
        updatedUserData.education = education;
      }
      if (skills) {
        updatedUserData.skills = skills.split(",").map((skill) => skill.trim());
      }
      if (workExperience) {
        updatedUserData.workExperience = workExperience.split(",").map((exp) => exp.trim());
      }
      if (base64ProfilePicture) {
        updatedUserData.profilePicture = base64ProfilePicture;
      }
      if (bio) {
        updatedUserData.bio = bio;
      }
      if (fullName) {
        updatedUserData.fullName = fullName;
      }

      if (Object.keys(updatedUserData).length === 0) {
        setErrorMsg("No changes detected.");
        return;
      }

      await AuthService.updateUserProfile(userId, updatedUserData);
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Error updating profile:", error);
      setErrorMsg("Failed to update profile. Please try again.");
    }
  };

  return (
    <div className="edit-profile-modal">
      <div className="icons">
        <FaUserEdit className="edit-profile-icon" />
        <div className="edit-profile-form-container">
          <button className="close-btn" onClick={onClose}>
            <IoIosCloseCircleOutline />
          </button>
        </div>
      </div>
      {errorMsg && <p className="error-msg">{errorMsg}</p>}
      <div className="profile-inputs-container">
        <form onSubmit={handleSubmit} className="edit-profile-form">
          <h3>Let's get to know you</h3>
          <div className="columns">
            <div className="left-column">
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label>Bio</label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="form-control"
                  rows="4"
                  placeholder="Tell us more about yourself, dev"
                />
              </div>
              <div className="form-group">
                <label>Profile Picture</label>
                <div className="file-input-container">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setProfilePicture(e.target.files[0])}
                    className="form-control"
                  />
                </div>
              </div>
            </div>
            <div className="right-column">
              <div className="form-group">
                <label>Graduation Year</label>
                <input
                  type="text"
                  value={graduationYear}
                  onChange={(e) => setGraduationYear(e.target.value)}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label>Education</label>
                <input
                  type="text"
                  value={education}
                  onChange={(e) => setEducation(e.target.value)}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label>Skills</label>
                <input
                  type="text"
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label>Work Experience</label>
                <input
                  type="text"
                  value={workExperience}
                  onChange={(e) => setWorkExperience(e.target.value)}
                  className="form-control"
                />
              </div>
            </div>
          </div>
          <center>
            <button type="submit" className="btn-save-changes">
              Save Changes
            </button>
          </center>
        </form>
      </div>
    </div>
  );
};

export default EditProfileForm;
