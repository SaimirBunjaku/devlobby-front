import React, { useEffect, useRef } from "react";
import Testimonial from "../../atoms/Testimonial";
import testimonialsData from "../../atoms/Testimonial/testimonialData";
import "./Testimonials.scss";

const Testimonials = () => {
  const containerRef = useRef();
  const animationRef = useRef(null);
  const isHovering = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    const scrollWidth = container.scrollWidth;
    const animationDuration = scrollWidth / 100;

    const keyframes = [
      { transform: "translateX(0)" },
      { transform: `translateX(-${scrollWidth}px)` },
    ];

    const options = {
      duration: animationDuration * 1000,
      iterations: Infinity,
    };

    animationRef.current = container.animate(keyframes, options);

    const handleMouseEnter = () => {
      isHovering.current = true;
      if (animationRef.current) {
        animationRef.current.playbackRate = 0.5; 
      }
    };

    const handleMouseLeave = () => {
      isHovering.current = false;
      if (animationRef.current) {
        animationRef.current.playbackRate = 1; 
      }
    };

    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mouseleave", handleMouseLeave);
      animationRef.current.cancel();
    };
  }, []);

  return (
    <div className="testimonials-section">
      <div className="rating-badge">
        <div className="star-container">
          <span className="star-icon">★</span>
        </div>
        <span className="rating-text">Rated 4/5 by developers</span>
      </div>

      <h1 className="testimonials-title">
        Words of Praise from others about our presence
      </h1>
      <div className="testimonials-wrapper">
        <div className="testimonials-container" ref={containerRef}>
          {testimonialsData.map((testimonial, index) => (
            <Testimonial
              key={index}
              quote={testimonial.quote}
              name={testimonial.name}
              title={testimonial.title}
              image={testimonial.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
