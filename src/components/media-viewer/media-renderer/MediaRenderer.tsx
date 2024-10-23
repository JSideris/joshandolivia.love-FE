import React, { useState, useRef, useEffect } from 'react';
import './MediaRenderer.css';
import { imageFileTypes, videoFileFormats } from '../../../scripts/constants';

interface MediaRendererProps {
  mediaUrl: string;
  render: boolean;
  onNext: () => void;
  onPrev: () => void;
}

const MediaRenderer: React.FC<MediaRendererProps> = ({ mediaUrl, render, onNext, onPrev }) => {
  const [scale, setScale] = useState<number>(1);
  // const [initialDistance, setInitialDistance] = useState<number | null>(null);
  const [translation, setTranslation] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement | HTMLVideoElement | null>(null);
  const momentumCorrectionRef = useRef<number | null>(null);

  const initialTouchPositionRef = useRef<{ x: number; y: number } | null>(null);
  const previousDistance = useRef<number>(0);

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
    if (momentumCorrectionRef.current) {
      cancelAnimationFrame(momentumCorrectionRef.current);
    }
    if (e.touches.length === 2) {
      const distance = calculateDistance(e.touches);
      previousDistance.current = distance;
      // setInitialDistance(distance);
    } 
    if (e.touches.length >= 1) {
      // initialTouchPositionRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      initialTouchPositionRef.current = { 
        x: Array.from(e.touches).reduce((acc, touch) => acc + touch.clientX, 0) / e.touches.length, 
        y: Array.from(e.touches).reduce((acc, touch) => acc + touch.clientY, 0) / e.touches.length 
      };
    }
  };

  // Handle touch move (pinch or drag gesture)
  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      const currentDistance = calculateDistance(e.touches);
      const lastDistance = previousDistance.current;
      const delta = currentDistance - lastDistance;
      previousDistance.current = currentDistance;
      // const zoomFactor = currentDistance / initialDistance;
      // const newScale = Math.min(Math.max(1, zoomFactor), 4);
      setScale(oldScale=>{
        return Math.min(4, Math.max(1, oldScale + delta / window.innerWidth));
      });
      e.preventDefault();
    } 
    
    if (e.touches.length >= 1 && initialTouchPositionRef.current) {
      let avgX = Array.from(e.touches).reduce((acc, touch) => acc + touch.clientX, 0) / e.touches.length;
      let avgY = Array.from(e.touches).reduce((acc, touch) => acc + touch.clientY, 0) / e.touches.length;

      const deltaX = (avgX - initialTouchPositionRef.current.x) / scale;
      const deltaY = (avgY - initialTouchPositionRef.current.y) / scale;
      setTranslation((prev) => ({ x: prev.x + deltaX, y: prev.y + deltaY }));
      initialTouchPositionRef.current = { x: avgX, y: avgY };
      e.preventDefault();
    }
  };

  // Handle touch end
  const handleTouchEnd = () => {
    // setInitialDistance(null); // Reset initial distance when the touch ends
    initialTouchPositionRef.current = null;
    applyBoundaryCorrection();
    startMomentumCorrection();
    // isZooming.current = false;
  };

  // Handle mouse drag start
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    if (momentumCorrectionRef.current) {
      cancelAnimationFrame(momentumCorrectionRef.current);
    }
    initialTouchPositionRef.current = { x: e.clientX, y: e.clientY };
    // window.addEventListener('mousemove', handleMouseMove);
    // window.addEventListener('mouseup', handleMouseUp);
  };

  // Handle mouse drag move
  const handleMouseMove = (e: MouseEvent) => {
    if (initialTouchPositionRef.current) {
      const deltaX = (e.clientX - initialTouchPositionRef.current.x) / scale;
      const deltaY = (e.clientY - initialTouchPositionRef.current.y) / scale;
      setTranslation((prev) => ({ x: prev.x + deltaX, y: prev.y + deltaY }));
      initialTouchPositionRef.current = { x: e.clientX, y: e.clientY };
    }
  };

  // Handle mouse drag end
  const handleMouseUp = () => {
    initialTouchPositionRef.current = null;
    // window.removeEventListener('mousemove', handleMouseMove);
    // window.removeEventListener('mouseup', handleMouseUp);
    startMomentumCorrection();
  };

  // Start checking for momentum and apply correction when stopped
  const startMomentumCorrection = () => {
    const element = imgRef.current;
    if (!element) return;
    let lastTranslation = getTranslationFromElement(element);
    const checkMomentum = () => {
      const currentTranslation = getTranslationFromElement(element);
      if (
        lastTranslation.x === currentTranslation.x &&
        lastTranslation.y === currentTranslation.y
      ) {
        // No more momentum, apply correction
        applyBoundaryCorrection();
      } else {
        // Update lastTranslation and continue checking
        lastTranslation = { ...currentTranslation };
        momentumCorrectionRef.current = requestAnimationFrame(checkMomentum);
      }
    };
    momentumCorrectionRef.current = requestAnimationFrame(checkMomentum);
  };

  // Get the current translation from the element's transform property
  const getTranslationFromElement = (element: HTMLElement) => {
    const style = window.getComputedStyle(element);
    const matrix = new DOMMatrixReadOnly(style.transform);
    return {
      x: matrix.m41,
      y: matrix.m42,
    };
  };

  // Apply boundary correction after dragging
  const applyBoundaryCorrection = () => {
    if (containerRef.current && imgRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const imgRect = imgRef.current.getBoundingClientRect();

      let correctedX = translation.x;
      let correctedY = translation.y;

      let dx = 0;
      let dy = 0;

      if (imgRect.width > containerRect.width) {
        if (imgRect.left > containerRect.left) {
          dx = -(imgRect.left - containerRect.left) / scale;
        } else if (imgRect.right < containerRect.right) {
          dx = (containerRect.right - imgRect.right) / scale;
        }
        correctedX += dx;
      } else {
        correctedX = 0;
        dx = -translation.x;
      }

      if (imgRect.height > containerRect.height) {
        if (imgRect.top > containerRect.top) {
          dy = -(imgRect.top - containerRect.top) / scale;
        } else if (imgRect.bottom < containerRect.bottom) {
          dy = (containerRect.bottom - imgRect.bottom) / scale;
        }
        correctedY += dy;
      } else {
        correctedY = 0;
      }

      // console.log(dx);

      const threshold = 50;

      if(dx > threshold){
        setTranslation({ x: 0, y: 0 });
        setScale(1);

        // Next image.
        onNext();
      }
      else if(dx < -threshold){
        setTranslation({ x: 0, y: 0 });
        setScale(1);
        
        // Previous image.
        onPrev();
      }
      else{
        setTranslation({ x: correctedX, y: correctedY });
      }
    }
  };

  useEffect(() => {
    return () => {
      if (momentumCorrectionRef.current) {
        cancelAnimationFrame(momentumCorrectionRef.current);
      }
      // window.removeEventListener('mousemove', handleMouseMove);
      // window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  if (!render) return <div className="spacer"></div>;
  if (isImage) {
    return (
      <div
        className="spacer"
        ref={containerRef}
        onMouseDown={handleMouseDown}
      >
        <img
          ref={imgRef as React.RefObject<HTMLImageElement>}
          src={mediaUrl}
          loading="eager"
          alt="Full View"
          className="media-viewer-image"
          style={{ transform: `scale(${scale}) translate(${translation.x}px, ${translation.y}px)` }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onClick={(e) => e.stopPropagation()}
        />
      </div>
    );
  }

  if (isVideo) {
    return (
      <div
        className="spacer"
        ref={containerRef}
        onMouseDown={handleMouseDown}
      >
        <video
          ref={imgRef as React.RefObject<HTMLVideoElement>}
          controls
          className="media-viewer-video"
          style={{ transform: `scale(${scale}) translate(${translation.x}px, ${translation.y}px)` }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onClick={(e) => e.stopPropagation()}
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
