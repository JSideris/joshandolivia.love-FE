import React, { ReactNode } from 'react';
import './PageSection.css';

interface PageSectionProps {
  children: ReactNode; // The "slot" (content) passed to the section
}

const PageSection: React.FC<PageSectionProps> = ({ children }) => {
  return (
    <div className="page-section">
      {children}
    </div>
  );
};

export default PageSection;
