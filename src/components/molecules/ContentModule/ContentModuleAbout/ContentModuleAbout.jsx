import React from "react";
import "./ContentModuleAbout.scss";
import Magnifier from "../../../../assets/images/magnifier1.png";
import Screen from "../../../../assets/images/screen.png";
import Create from "../../../../assets/images/create.png";
import Analyze from "../../../../assets/images/analyze.png";

const ContentBlock = ({ icon, title, description, btndscp }) => {
  return (
    <div className="content-block">
      <div className="icon">{icon}</div>
      <h3 className="title">{title}</h3>
      <p className="description">{description}</p>
      <button className="more-info-btn">{btndscp}</button>
    </div>
  );
};

function ContentModuleAbout() {
  const contentBlocks = [
    {
      icon: (
        <img
          src={Magnifier}
          style={{ width: "55px", height: "50px" }}
          alt="Magnifier"
        />
      ),
      title: "Search",
      description:
        "Search and filter through the users and gain a chance to know more about your coworkers.",
      btndscp: "Discover More",
    },
    {
      icon: (
        <img
          src={Screen}
          style={{ width: "60px", height: "50px" }}
          alt="Screen"
        />
      ),
      title: "Compete and Connect",
      description:
        "Dive into a world of competitive gaming where every match is an opportunity to prove your skills.",
      btndscp: "Enter The Arena",
    },
    {
      icon: (
        <img
          src={Create}
          style={{ width: "60px", height: "50px" }}
          alt="Screen"
        />
      ),
      title: "Craft Your Thoughts",
      description:
        "Unleash your creativity and share your unique perspective with the world. Ready to make your mark?",
      btndscp: "Express Yourself",
    },
    {
      icon: (
        <img
          src={Analyze}
          style={{ width: "60px", height: "50px" }}
          alt="Screen"
        />
      ),
      title: "Level Up Your Game",
      description:
        "Engage in challenges that test your skills, and unlock achievements as you ascend to higher levels.",
      btndscp: "Climb The Ladder",
    },
  ];

  return (
    <>
      <h1
        style={{
          textAlign: "center",
          backgroundColor: "#282828",
          color: "white",
          fontFamily: "Poppins",
          paddingBottom: "10px",
          paddingTop: "20px",
        }}
      >
        What you're in for
      </h1>
      <div className="content-module-about">
        {contentBlocks.map((block, index) => (
          <ContentBlock
            key={index}
            icon={block.icon}
            title={block.title}
            description={block.description}
            btndscp={block.btndscp}
          />
        ))}
      </div>
    </>
  );
}

export default ContentModuleAbout;
