import React from 'react';
import './ImageZoomModal.scss';

const ImageZoomModal = ({ src, onClose }) => {
  return (
    <div className="imageZoomModal" onClick={onClose}>
      <div className="imageZoomModal-content" onClick={(e) => e.stopPropagation()}>
        <img src={src} alt="Zoomed In" />
        <button className="imageZoomModal-close" onClick={onClose}>X</button>
      </div>
    </div>
  );
};

export default ImageZoomModal;
