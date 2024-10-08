import React, { useEffect, useState } from 'react';
import './App.css';
import Home from './pages/home/Home';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Upload from './pages/upload/Upload';

const App: React.FC = () => {
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= 768);

  // This will handle resizing dynamically (optional)
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  function getQueryParam(name) {
    const params = new URLSearchParams(window.location.search);
    return params.get(name);
  }

  useEffect(() => {
    // Get the `route` query param
    const route = getQueryParam('route');

    if (route) {
      // If a route query parameter is present, redirect to the hash route
      window.location.href = `#${route}`;
    }
  }, []);

  return (
    <>

      <div className={isMobile ? 'mobile-content' : 'desktop-content'}>
        <div className="blur"></div>
        <div className="contents">
          <HashRouter>
            <Routes>
              {/* Define routes */}
              <Route path="/" element={
                <Home />
              } />
              <Route path="/upload/:guestId" element={
                <Upload />
              } />
            </Routes>
          </HashRouter>
        </div>
      </div>
    </>
  );
};

export default App;
