// VideoViewer.tsx
import React from 'react';
import './VideoViewer.css';

interface VideoViewerProps {
  isOpen: boolean;
  videoUrl: string;
  onClose: () => void;
}

const VideoViewer: React.FC<VideoViewerProps> = ({ isOpen, videoUrl, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="video-viewer-overlay" onClick={onClose}>
      <div className="video-viewer-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>
        <video controls className="video-viewer-video">
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

export default VideoViewer;
