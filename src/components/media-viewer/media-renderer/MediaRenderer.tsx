import React, { useState } from 'react';
import './MediaRenderer.css';
import { imageFileTypes, videoFileFormats } from '../../../scripts/constants';

interface MediaRendererProps {
  mediaUrl: string;
  render: boolean;
}

const MediaRenderer: React.FC<MediaRendererProps> = ({ mediaUrl, render }) => {
  const [scale, setScale] = useState<number>(3); // Scale starts at 1
  const [initialDistance, setInitialDistance] = useState<number | null>(null);

  const isImage = imageFileTypes.some((ext) => mediaUrl.toLowerCase().endsWith(ext));
  const isVideo = videoFileFormats.some((ext) => mediaUrl.toLowerCase().endsWith(ext));

  // Calculate the distance between two touch points
  const calculateDistance = (touches: React.TouchList): number => {
    const touch1 = touches[0];
	const touch2 = touches[1];
    const dx = touch2.clientX - touch1.clientX;
    const dy = touch2.clientY - touch1.clientY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  // Handle touch start
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      const distance = calculateDistance(e.touches);
      setInitialDistance(distance);
    }
  };

  // Handle touch move (pinch gesture)
  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2 && initialDistance !== null) {
      const currentDistance = calculateDistance(e.touches);
      const zoomFactor = currentDistance / initialDistance;
      const newScale = Math.min(Math.max(1, zoomFactor), 2); // Bound between 1 and 2
      setScale(newScale);
    }
  };

  // Handle touch end
  const handleTouchEnd = () => {
    setInitialDistance(null); // Reset initial distance when the touch ends
  };

  if (!render) return <div className="spacer"></div>;
  if (isImage) {
    return (
      <div className="spacer">
      <img
        src={mediaUrl}
        loading="eager"
        alt="Full View"
        className="media-viewer-image"
        style={{ transform: `scale(${scale})` }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
		onClick={e=>e.stopPropagation()}
      />
      </div>
    );
  }

  if (isVideo) {
    return (
      <div className="spacer">
        <video
          controls
          className="media-viewer-video"
          style={{ transform: `scale(${scale})` }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
      onClick={e=>e.stopPropagation()}
        >
          <source src={mediaUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    );
  }

  return <div className="media-viewer-unsupported">Unsupported media type.</div>;
};

export default MediaRenderer;
