import { useEffect, useRef } from "react";
import MediaRenderer from "./media-renderer/MediaRenderer";
import PhotoInfo from "./photo-info/PhotoInfo";
import TouchHandler from "./touch-handler/TouchHandler";
import { CLOUDFRONT_URL, imageFileTypes } from "../../scripts/constants";
import './MediaViewer.css';
import { IFileMetadata } from "../../scripts/filesystem/i-filesystem";

interface MediaViewerProps {
  isOpen: boolean;
  mediaData: IFileMetadata[];
  mediaIndex: number;
  photographerName?: string;
  hdPhotoUrl?: string;
  onClose: () => void;
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
}

const MediaViewer: React.FC<MediaViewerProps> = ({
  isOpen,
  mediaData: mediaUrls,
  mediaIndex,
  photographerName,
  hdPhotoUrl,
  onClose,
  onSwipeLeft,
  onSwipeRight,
}) => {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(-${mediaIndex * 100}%)`;
      trackRef.current.style.transition = 'transform 100ms ease-in-out';
    }
  }, [mediaIndex, isOpen]);

  const handleDownload = async () => {
    try {
      const response = await fetch(hdPhotoUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', hdPhotoUrl.split("/").pop());
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
    <div className={`media-viewer-overlay${isOpen && " visible" || ""}`} onClick={onClose}>
      <TouchHandler onSwipeLeft={onSwipeLeft} onSwipeRight={onSwipeRight}>
        <div className="media-viewer-content">
          <button className="close-btn" onClick={onClose}>&times;</button>
          <div className="track-container">
            <div className="track" ref={trackRef}>
              {mediaUrls.map((m, i) => (
                (m?.compressedPath || m?.path) && (
                  <MediaRenderer key={i} mediaUrl={`${CLOUDFRONT_URL}/uploads${m.compressedPath || m.path}`} render={Math.abs(mediaIndex - i) <= 1} />
                ) || <div key={i}>NO PREVIEW AVAILABLE</div>
              ))}
            </div>
          </div>
          {(hdPhotoUrl || photographerName) && (
            <PhotoInfo
              photographerName={photographerName}
              hdPhotoUrl={hdPhotoUrl}
              onDownload={handleDownload}
            />
          )}
        </div>
      </TouchHandler>
    </div>
  );
};

export default MediaViewer;
