import React from "react";
import "./ContentModuleBlog.scss";
import HighTechBoy from "../../../../assets/images/hightechboy.png";
import { Link } from "react-router-dom";

const ContentModuleBlog = () => {
  return (
    <>
      <div className="content-module-blog">
        <div className="content-info">
          <h1>
            Step into the Spotlight of<span className="devLobby">DevLobby</span>{" "}
            with Your First Blog Post.
          </h1>
          <p>
            Our platform is more than just a forum—it's a dynamic space where
            each post you publish enriches a tapestry of tech narratives. From
            snippets of code to comprehensive tutorials, your knowledge can
            empower a legion of developers.
          </p>
          <Link to="/blog" className="btn-blog">
            Post your first Blog
          </Link>
          <br /> <br />
          <p>Your DevLobby desk is set, your audience is ready.</p>
        </div>
        <div className="content-image">
          <img src={HighTechBoy} alt="High Technology Girl" />
        </div>
      </div>
    </>
  );
};

export default ContentModuleBlog;
