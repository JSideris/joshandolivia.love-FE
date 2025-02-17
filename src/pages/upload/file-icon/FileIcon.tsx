import React, { useState, useEffect, useRef } from 'react';
import './FileIcon.css';

interface FileIconProps {
  iconUrl: string;        // URL of the icon
  label: string;          // Label for the file (file name)
  size?: number;          // Size of the icon (default 100px)
  onSelect?: (label: string) => void;   // Event handler for when the icon is selected
  onKeyPress?: (e: KeyboardEvent) => void;  // Key press handler for parent component
  onDoubleClick?: () => void;  // Double click handler for parent component
  selected?: boolean;     // Prop for controlling if the icon is selected from parent
}

const FileIcon: React.FC<FileIconProps> = ({
  iconUrl, label, size = 100, onSelect, onKeyPress, onDoubleClick, selected = false
}) => {
  const [isSelected, setIsSelected] = useState<boolean>(selected);
  const [lastTap, setLastTap] = useState<number>(0);
  const iconRef = useRef<HTMLDivElement | null>(null);  // Use ref to track the current component

  const handleIconDoubleClick = () => {
    if (onDoubleClick) {
      onDoubleClick();
    }
  };

  const handleIconClick = () => {
    
    const currentTime = new Date().getTime();
    const tapLength = currentTime - lastTap;
    if (tapLength < 300 && tapLength > 0) {
      handleIconDoubleClick();
    }
    else{
    
      setIsSelected(true);
      if (onSelect) {
        onSelect(label);
      }
    }
    setLastTap(currentTime);
  };

  const handleClickOutside = (e: MouseEvent) => {
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
    setIsSelected(selected);  // Sync internal state with the selected prop
  }, [selected]);

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
      style={{ width: size, height: size + 40 }} 
      onClick={handleIconClick}
    >
      <img src={iconUrl} style={{ width: size, height: size }} />
      <div className="file-label">
        {isSelected ? label : label.length > 10 ? `${label.slice(0, 10)}...` : label}
      </div>
    </div>
  );
};

export default FileIcon;
