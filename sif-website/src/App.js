import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Flight from './components/flight.js';
import Navbar from './components/navbar.js';

function App() {
  const [image, setImage] = useState(null);
  const [route, setRoute] = useState(window.location.pathname);
  
  useEffect(() => {
    async function fetchImage(route1) {
      const response = await fetch(route1);
      const blob = await response.blob();
      setImage(URL.createObjectURL(blob));
    }
    
    if (route === '/flight') {
      fetchImage('/flight');
    }
    else if (route ==="/currency") {
      fetchImage("/currency")
    }
  }, [route]);
  
  window.addEventListener('popstate', () => {
    setRoute(window.location.pathname);
  });

  return (
    <div>
      {image && <img src={image} alt="Random Plot" />}
    </div>
  );
}

export default App;