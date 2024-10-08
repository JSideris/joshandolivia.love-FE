import React, { useState, useEffect, useRef } from 'react';
import './FileIcon.css';

interface FileIconProps {
  iconUrl: string;        // URL of the icon
  label: string;          // Label for the file (file name)
  size?: number;          // Size of the icon (default 100px)
  onSelect?: (label: string) => void;   // Event handler for when the icon is selected
  onKeyPress?: (e: KeyboardEvent) => void;  // Key press handler for parent component
  onDoubleClick?: () => void;  // Double click handler for parent component
}

const FileIcon: React.FC<FileIconProps> = ({ iconUrl, label, size = 100, onSelect, onKeyPress, onDoubleClick }) => {
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const iconRef = useRef<HTMLDivElement | null>(null);  // Use ref to track the current component

  const handleIconDoubleClick = () => {
    // Raise event.
    if (onDoubleClick) {
      onDoubleClick();
    }
  };

  const handleIconClick = () => {
    setIsSelected(true);
    if (onSelect) {
      onSelect(label);
    }
  };

  const handleClickOutside = (e: MouseEvent) => {
    // Check if the click is outside of the current file icon
    if (iconRef.current && !iconRef.current.contains(e.target as Node)) {
      setIsSelected(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (isSelected && onKeyPress) {
      const handleKeyDown = (e: KeyboardEvent) => {
        onKeyPress(e);
      };

      document.addEventListener('keydown', handleKeyDown);
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isSelected, onKeyPress]);

  return (
    <div 
      ref={iconRef} 
      className={`file-icon ${isSelected ? 'selected' : ''}`} 
      style={{ width: size, height: size + 40 }} // Additional height for the label
      onClick={handleIconClick}
      onDoubleClick={handleIconDoubleClick}
    >
      <img src={iconUrl} style={{ width: size, height: size }} />
      <div className="file-label">
        {isSelected ? label : label.length > 10 ? `${label.slice(0, 10)}...` : label}
      </div>
    </div>
  );
};

export default FileIcon;
