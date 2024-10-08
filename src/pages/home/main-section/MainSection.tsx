import React, { useEffect, useRef } from 'react';
import './MainSection.css';
import PageSection from '../../../components/page-section/PageSection';
import DateWidget from '../../../components/date-widget/DateWidget';

const MainSection: React.FC = () => {
  const namesRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    // Opacity transition after 1 second
    const overlayElement = document.querySelector('.overlay-ms');
    if (overlayElement) {
      setTimeout(() => {
        overlayElement.setAttribute('style', 'opacity: 1');
      }, 1000);
    }
  }, []);

  return (
    <PageSection>
      <div className="section-container-ms">
        <div className="wedding-bg"></div>
        <div className="overlay-ms">
          <h1 className="msh1" ref={namesRef}>Josh and Olivia</h1>
          <p className="subheading">Thank you for joining us!</p>
          <br />
          <br />
          <br />
          <br />
          <div>
            <DateWidget />
          </div>
        </div>
      </div>
    </PageSection>
  );
};

export default MainSection;
