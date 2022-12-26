import React, { useEffect, useState } from 'react';

function App() {
  const [image, setImage] = useState(null);
  const [route, setRoute] = useState(window.location.pathname);
  
  useEffect(() => {
    async function fetchImage() {
      const response = await fetch('http://localhost:3000/plot');
      const blob = await response.blob();
      setImage(URL.createObjectURL(blob));
    }
    
    if (route === '/plot') {
      fetchImage();
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