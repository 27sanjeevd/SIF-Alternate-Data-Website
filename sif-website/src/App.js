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
      setOptions([...options, " " + name]);
    }
    else {
      setOptions(options.filter((option) => option !== " " + name));
    }
  }

  const handleSubmit = () => {
    console.log(options);
  }

  return (
    <div>
      {image && <img src={image} alt="Random Plot" />}
      <p>{options}</p>
      <form>
        <label>
          <input type="checkbox" name="Option1" onChange={handleChange} />
          Option 1
        </label>
      <br />
        <label>
          <input type="checkbox" name="Option2" onChange={handleChange} />
          Option 2
        </label>
      <br />
        <label>
          <input type="checkbox" name="Option3" onChange={handleChange} />
          Option 3
        </label>
      <br />
      <button type="button" onClick={handleSubmit}>Submit</button>
    </form>
    </div>
  );
}

export default App;