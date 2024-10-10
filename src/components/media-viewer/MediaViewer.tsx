import React, { useEffect, useState } from 'react';
import './MediaViewer.css';
import { imageFileTypes, videoFileFormats } from '../../scripts/constants';

interface MediaViewerProps {
  isOpen: boolean;
  mediaUrl: string;
  photographerName: string;
  hdPhotoUrl?: string;
  nextMediaUrl?: string;
  onClose: () => void;
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
}

const MediaViewer: React.FC<MediaViewerProps> = ({
  isOpen,
  mediaUrl,
  photographerName,
  nextMediaUrl,
  hdPhotoUrl,
  onClose,
  onSwipeLeft,
  onSwipeRight,
}) => {
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);
  const [scale, setScale] = useState(1);
  const [lastScale, setLastScale] = useState(1);
  const [touchStartDistance, setTouchStartDistance] = useState<number | null>(null);
  
  // Variables for dragging
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const [lastTranslate, setLastTranslate] = useState({ x: 0, y: 0 });

  const isImage = mediaUrl ? imageFileTypes.some((ext) => mediaUrl.toLowerCase().endsWith(ext)) : false;
  const isVideo = mediaUrl ? videoFileFormats.some((ext) => mediaUrl.toLowerCase().endsWith(ext)) : false;

  useEffect(() => {
    if (nextMediaUrl && imageFileTypes.some((ext) => nextMediaUrl.endsWith(ext))) {
      const img = new Image();
      img.src = nextMediaUrl;
    }
  }, [nextMediaUrl]);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      const distance = getDistance(e.touches);
      setTouchStartDistance(distance);
    } else if (e.touches.length === 1) {
      setTouchStartX(e.touches[0].clientX);
      setTranslate({
        x: e.touches[0].clientX - lastTranslate.x,
        y: e.touches[0].clientY - lastTranslate.y,
      });
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2 && touchStartDistance !== null) {
      const currentDistance = getDistance(e.touches);
      const newScale = (currentDistance / touchStartDistance) * lastScale;
      setScale(Math.max(1, newScale)); // Ensure the scale doesn’t go below 1
    } else if (e.touches.length === 1) {
      const deltaX = e.touches[0].clientX - translate.x;
      const deltaY = e.touches[0].clientY - translate.y;
      setTranslate({ x: deltaX, y: deltaY });
    }
  };

  const handleTouchEnd = () => {
    setLastScale(scale);
    setLastTranslate(translate);
    if (touchStartX !== null && touchEndX !== null) {
      const distance = touchStartX - touchEndX;
      const swipeThreshold = 50;

      if (distance > swipeThreshold) {
        onSwipeLeft();
      } else if (distance < -swipeThreshold) {
        onSwipeRight();
      }
    }
    setTouchStartX(null);
    setTouchEndX(null);
    setTouchStartDistance(null);
  };

  const getDistance = (touches: React.TouchList) => {
    const dx = touches[0].clientX - touches[1].clientX;
    const dy = touches[0].clientY - touches[1].clientY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const handleDownload = async () => {
    try {
      const response = await fetch(hdPhotoUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', hdPhotoUrl?.split("/").pop() || 'image');
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading the image:', error);
    }
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
            style={{
              transform: `scale(${scale}) translate(${translate.x}px, ${translate.y}px)`,
              transition: 'transform 0.1s ease-out',
            }}
          />
        )}

        {isVideo && (
          <video controls className="media-viewer-video">
            <source src={mediaUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}

        {(isVideo || isImage) && (
          <div className="photo-info" onClick={(e) => e.stopPropagation()}>
            <span>Captured by {photographerName}</span>
            <br />
            {hdPhotoUrl && (
              <span className="download-link" onClick={handleDownload}>
                Download HD
              </span>
            )}
          </div>
        )}

        {!isImage && !isVideo && (
          <div className="media-viewer-unsupported">Unsupported media type.</div>
        )}
      </div>
    </div>
  );
};

export default MediaViewer;
