import React, { useEffect, useRef, useState, memo } from 'react';
import './MediaViewer.css';
import { imageFileTypes, videoFileFormats } from '../../scripts/constants';

interface MediaViewerProps {
  isOpen: boolean;
  mediaUrl: string;
  nextMediaUrl?: string;
  onClose: () => void;
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
}

const MediaViewer: React.FC<MediaViewerProps> = ({
  isOpen,
  mediaUrl,
  nextMediaUrl,
  onClose,
  onSwipeLeft,
  onSwipeRight,
}) => {
  const touchStartXRef = useRef<number | null>(null);
  const touchEndXRef = useRef<number | null>(null);
  const [loaded, setLoaded] = useState(false);

  const isImage = mediaUrl ? imageFileTypes.some((ext) => mediaUrl.toLowerCase().endsWith(ext)) : false;
  const isVideo = mediaUrl ? videoFileFormats.some((ext) => mediaUrl.toLowerCase().endsWith(ext)) : false;

  // Preload the next image if available
  useEffect(() => {
    if (nextMediaUrl && imageFileTypes.some((ext) => nextMediaUrl.endsWith(ext))) {
      const img = new Image();
      img.src = nextMediaUrl;
    }
  }, [nextMediaUrl]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const touchStartX = touchStartXRef.current;
    const touchEndX = touchEndXRef.current;

    if (touchStartX !== null && touchEndX !== null) {
      const distance = touchStartX - touchEndX;

      if (distance > 50) {
        onSwipeLeft();
      } else if (distance < -50) {
        onSwipeRight();
      }
    }

    touchStartXRef.current = null;
    touchEndXRef.current = null;
  };

  const handleImageClick = (e: React.MouseEvent) => {
    e.stopPropagation();
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
        <MediaContent
          mediaUrl={mediaUrl}
          isImage={isImage}
          isVideo={isVideo}
          loaded={loaded}
          setLoaded={setLoaded}
        />
      </div>
    </div>
  );
};

interface MediaContentProps {
  mediaUrl: string;
  isImage: boolean;
  isVideo: boolean;
  loaded: boolean;
  setLoaded: (loaded: boolean) => void;
}

const MediaContent: React.FC<MediaContentProps> = memo(
  ({ mediaUrl, isImage, isVideo, loaded, setLoaded }) => {
    if (isImage) {
      return (
        <img
          src={mediaUrl}
          alt="Full View"
          className={`media-viewer-image ${loaded ? 'loaded' : 'loading'}`}
          onClick={(e) => e.stopPropagation()}
          onLoad={() => setLoaded(true)}
          loading="lazy"
        />
      );
    }

    if (isVideo) {
      return (
        <video controls className="media-viewer-video">
          <source src={mediaUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      );
    }

    return (
      <div className="media-viewer-unsupported">
        Unsupported media type.
      </div>
    );
  }
);

export default MediaViewer;
