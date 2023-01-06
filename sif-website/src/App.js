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



  const [options, setOptions] = React.useState([]);

  const handleChange = (event) => {
    const {name, checked} = event.target;
    if (checked){
      setOptions([...options, name]);
    }
    else {
      setOptions(options.filter((option) => option !== name));
    }
  }

  const handleSubmit = async () => {
    const response = await fetch(`/flight1?options=${options.join(",")}`);
    const blob = await response.blob();
    setImage(URL.createObjectURL(blob));
  }

  return (
    <div>
      {image && <img src={image} alt="Random Plot" />}
      <form>
        <label>
          <input type="checkbox" name="Australia" onChange={handleChange} />
          Australia
        </label>
      <br />
        <label>
          <input type="checkbox" name="Thailand" onChange={handleChange} />
          Thailand
        </label>
      <br />
        <label>
          <input type="checkbox" name="Brazil" onChange={handleChange} />
          Brazil
        </label>
      <br />
      <button type="button" onClick={handleSubmit}>Submit</button>
    </form>
    </div>
  );
}

export default App;