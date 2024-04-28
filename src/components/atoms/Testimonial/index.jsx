import React from "react";
import "./Testimonial.scss";

const Testimonial = ({ quote, name, title, image}) => {
  return (
    <div className="testimonial">
      <blockquote>
        {quote}
        <div className="arrow"></div>
      </blockquote>
      <img src={image} alt="Example" />
      <div className="author">
        <h5>{name}<span>{title}</span></h5>
      </div>
    </div>
  );
};

export default Testimonial;
