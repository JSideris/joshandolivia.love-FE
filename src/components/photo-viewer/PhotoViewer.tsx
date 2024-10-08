import React from 'react';
import './PhotoViewer.css'; // We'll create this CSS file for styling

interface PhotoViewerProps {
  isOpen: boolean;
  photoUrl: string;
  onClose: () => void;
}

const PhotoViewer: React.FC<PhotoViewerProps> = ({ isOpen, photoUrl, onClose }) => {
  if (!isOpen) return null; // Only render the component if it's open

  return (
    <div className="photo-viewer-overlay" onClick={onClose}>
      <div className="photo-viewer-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>
        <img src={photoUrl} alt="Full View" className="photo-viewer-image" />
      </div>
    </div>
  );
};

export default PhotoViewer;
