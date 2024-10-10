import { useEffect } from "react";
import MediaRenderer from "./media-renderer/MediaRenderer";
import PhotoInfo from "./photo-info/PhotoInfo";
import TouchHandler from "./touch-handler/TouchHandler";
import { imageFileTypes } from "../../scripts/constants";
import './MediaViewer.css';

interface MediaViewerProps {
  isOpen: boolean;
  mediaUrl: string;
  photographerName?: string;
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
  hdPhotoUrl,
  nextMediaUrl,
  onClose,
  onSwipeLeft,
  onSwipeRight,
}) => {
  useEffect(() => {
    if (nextMediaUrl && imageFileTypes.some((ext) => nextMediaUrl.endsWith(ext))) {
      const img = new Image();
      img.src = nextMediaUrl;
    }
  }, [nextMediaUrl]);

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
    <div className="media-viewer-overlay" onClick={onClose}>
      <TouchHandler onSwipeLeft={onSwipeLeft} onSwipeRight={onSwipeRight}>
        <div className="media-viewer-content">
          <button className="close-btn" onClick={onClose}>&times;</button>
          <MediaRenderer mediaUrl={mediaUrl} />
          {(mediaUrl && (hdPhotoUrl || photographerName)) && (
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