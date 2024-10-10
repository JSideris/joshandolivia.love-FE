import React, { useEffect, useState } from 'react';
import './MediaViewer.css';

// An array of image file extensions and video file extensions, respectively
import { imageFileTypes, videoFileFormats } from '../../scripts/constants';

interface MediaViewerProps {
  isOpen: boolean;
  mediaUrl: string;
  nextMediaUrl?: string; // Optional prop for the next media URL
  onClose: () => void;
  onSwipeLeft: () => void; // Notify parent to show next media
  onSwipeRight: () => void; // Notify parent to show previous media
}

const MediaViewer: React.FC<MediaViewerProps> = ({
  isOpen,
  mediaUrl,
  nextMediaUrl,
  onClose,
  onSwipeLeft,
  onSwipeRight,
}) => {
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);

  // Determine if the current URL is an image or video by checking the file extension
  const isImage = mediaUrl ? imageFileTypes.some((ext) => mediaUrl.toLowerCase().endsWith(ext)) : false;
  const isVideo = mediaUrl ? videoFileFormats.some((ext) => mediaUrl.toLowerCase().endsWith(ext)) : false;

  // Preload the next media if it's an image
  useEffect(() => {
    if (nextMediaUrl && imageFileTypes.some((ext) => nextMediaUrl.endsWith(ext))) {
      const img = new Image();
      img.src = nextMediaUrl; // Preload the next image
    }
  }, [nextMediaUrl]);

  // Handle touch start
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  // Handle touch move
  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.touches[0].clientX);
  };

  // Handle touch end
  const handleTouchEnd = () => {
    if (touchStartX !== null && touchEndX !== null) {
      const distance = touchStartX - touchEndX;

      // Define a threshold to determine if it was a swipe
      const swipeThreshold = 50; // Minimum swipe distance in pixels

      if (distance > swipeThreshold) {
        // Swipe left detected
        onSwipeLeft();
      } else if (distance < -swipeThreshold) {
        // Swipe right detected
        onSwipeRight();
      }
    }

    // Reset touch positions
    setTouchStartX(null);
    setTouchEndX(null);
  };

  if (!isOpen) return null;

  return (
    <div
      className="media-viewer-overlay"
      onClick={onClose}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="media-viewer-content">
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
