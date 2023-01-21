import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Flight from './components/flight.js';
import Navbar from './components/navbar.js';


const options1 = [];

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


  const handleChange = async (event) => {
    const {name, checked} = event.target;
    if (checked){
      options1.push(name)
    }
    else {
      let index = options1.indexOf(name);
      if (index > -1) {
        options1.splice(index, 1);
      }
    }
    const response = await fetch(`/flight?options=${options1.join(",")}`);
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
        <label>
          <input type="checkbox" name="Japan" onChange={handleChange} />
          Japan
        </label>
      <br />
        <label>
          <input type="checkbox" name="" onChange={handleChange} />
          Taiwan
        </label>
      <br />
        <label>
          <input type="checkbox" name="Ethiopia" onChange={handleChange} />
          Ethiopia
        </label>
      <br />
        <label>
          <input type="checkbox" name="Switzerland" onChange={handleChange} />
          Switzerland
        </label>
      <br />
        <label>
          <input type="checkbox" name="Mexico" onChange={handleChange} />
          Mexico
        </label>
      <br />
        <label>
          <input type="checkbox" name="Turkey" onChange={handleChange} />
          Turkey
        </label>
      <br />
        <label>
          <input type="checkbox" name="Canada" onChange={handleChange} />
          Canada
        </label>
      <br />
        <label>
          <input type="checkbox" name="Indonesia" onChange={handleChange} />
          Indonesia
        </label>
      <br />
        <label>
          <input type="checkbox" name="China" onChange={handleChange} />
          China
        </label>
      <br />
    </form>
    </div>
  );
}

export default App;
