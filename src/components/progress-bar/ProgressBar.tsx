import React, { useState, useEffect } from "react";
import "./ProgressBar.css"; // Move your styles to a separate CSS file

interface ProgressBarProps {
  totalFiles: number;
  completedThumbnails: number;
  completedUploads: number;
  show: boolean;
  avgT: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  totalFiles = 100,
  completedThumbnails = 0,
  completedUploads = 0,
  show = true,
  avgT = 0,
}) => {
  // Calculate progress percentages
  const thumbnailProgress = totalFiles > 0 ? (completedThumbnails / totalFiles) * 100 : 0;
  const uploadProgress = totalFiles > 0 ? (completedUploads / totalFiles) * 100 : 0;

  // Function to format time
  const formatTime = (seconds: number): string => {
    if (seconds < 60) {
      return "< 1 minute";
    } else if (seconds < 3600) {
      const minutes = Math.round(seconds / 60);
      return `${minutes} minute${minutes > 1 ? "s" : ""}`;
    } else {
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.round((seconds % 3600) / 60);
      return `${hours} hour${hours > 1 ? "s" : ""}, ${minutes} minute${minutes > 1 ? "s" : ""}`;
    }
  };

  // Calculate the remaining time based on average time per file
  const formattedTime = formatTime(avgT * (totalFiles - completedUploads));

  return (
    <div className={`progress-container ${show ? "" : "hide"}`}>
      <div className="progress-text">
        <span>Uploading files. Do not navigate away. </span>
        {show && (
          <span>
            {Math.round((100 * completedUploads) / totalFiles)}% - ETA: {formattedTime}.
          </span>
        )}
      </div>
      <div className="progress-bar">
        <div className="progress-bar-inner" style={{ width: `${thumbnailProgress}%` }}></div>
        <div className="upload-progress-bar-inner" style={{ width: `${uploadProgress}%` }}></div>
      </div>
    </div>
  );
};

export default ProgressBar;
