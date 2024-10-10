import React, { useEffect } from 'react';
import './MediaViewer.css';

// An array of image file extensions and video file extensions, respectively
import { imageFileTypes, videoFileFormats } from '../../scripts/constants';

interface MediaViewerProps {
  isOpen: boolean;
  mediaUrl: string;
  nextMediaUrl?: string; // Optional prop for the next media URL
  onClose: () => void;
}

const MediaViewer: React.FC<MediaViewerProps> = ({ isOpen, mediaUrl, nextMediaUrl, onClose }) => {
  // Determine if the current URL is an image or video by checking the file extension
  const isImage = mediaUrl ? imageFileTypes.some((ext) => mediaUrl.endsWith(ext)) : false;
  const isVideo = mediaUrl ? videoFileFormats.some((ext) => mediaUrl.endsWith(ext)) : false;

  // Preload the next media if it's an image
  useEffect(() => {
    if (nextMediaUrl && imageFileTypes.some((ext) => nextMediaUrl.endsWith(ext))) {
      const img = new Image();
      img.src = nextMediaUrl; // Preload the next image
    }
  }, [nextMediaUrl]);

  if (!isOpen) return null;

  return (
    <div className="media-viewer-overlay" onClick={onClose}>
      <div className="media-viewer-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>

        {isImage && (
          <img
            src={mediaUrl}
            alt="Full View"
            className="media-viewer-image"
            onClick={(e) => e.stopPropagation()}
          />
        )}

        {isVideo && (
          <video controls className="media-viewer-video">
            <source src={mediaUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}

        {!isImage && !isVideo && (
          <div className="media-viewer-unsupported">
            Unsupported media type.
          </div>
        )}
      </div>
    </div>
  );
};

export default MediaViewer;
