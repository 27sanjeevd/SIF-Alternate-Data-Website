import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Flight from './components/flight.js';
import Navbar from './components/navbar.js';


const options1 = [];

function App() {
  const [image, setImage] = useState(null);
  const [route, setRoute] = useState(window.location.pathname);
  const [words, setWords] = useState(["Australia", "Japan", "Taiwan", "Ethiopia", "Luxembourg", "Switzerland", "Mexico", "Turkey", "Canada", "Indonesia", "Portugal", "Chile", "Argentina", "China", "Hungary", "Bahrain", "Norway", "Brazil", "Malaysia", "Vanuatu", "Uzbekistan", "Thailand", "France", "Philippines", "India", "Sweden", "Ukraine", "Singapore", "Germany", "Rwanda", "Iceland", "Egypt", "Colombia", "Algeria", "Poland", "Qatar", "Spain", "Romania", "Bangladesh", "Slovakia", "Austria", "Israel", "Belgium", "Pakistan", "Malta", "Morocco", "Oman", "Slovenia", "Sudan", "Ireland", "Serbia", "Fiji", "Nepal", "Belarus", "Cambodia", "Kazakhstan", "Panama", "Tunisia", "Bulgaria", "Myanmar", "Kuwait", "Finland", "Jordan", "Azerbaijan", "Denmark", "Venezuela", "Bhutan", "Lebanon"]);
  
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

  const [inputValue, setInputValue] = useState("");
  const [filteredWords, setFilteredWords] = useState([]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    if (event.target.value.length > 0){
      setFilteredWords(
        words.filter((word) => word.toLowerCase().startsWith(event.target.value.toLowerCase()))
      );
    }
    else {
      setFilteredWords([]);
    };
  };

  const [inputs, setInputs] = useState([]);
  
  const handleKeyUp = async (event) => {
    if (event.keyCode === 13 && event.target.value.length > 0) {
      const foundWord = words.find((word) => word.toLowerCase().startsWith(event.target.value.toLowerCase()));
      
      if (foundWord !== undefined && !options1.includes(foundWord)) {
        setInputs(inputs => [...inputs, foundWord]);
        options1.push(foundWord);
      }
      event.target.value = "";
      setInputValue(event.target.value);


      const response = await fetch(`/flight?options=${options1.join(",")}`);
      const blob = await response.blob();
      setImage(URL.createObjectURL(blob));

    };
  };
  
  
  const handleCloseClick = async (index) => {
    options1.splice(index, 1);

    const response = await fetch(`/flight?options=${options1.join(",")}`);
    const blob = await response.blob();
    setImage(URL.createObjectURL(blob));
    setInputs(inputs.filter((input, i) => i !== index));
  }

  
  return (
    <div>
      {image && <img src={image} alt="Random Plot" />}
      <div className="textbox-container">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyUp={handleKeyUp} 
        />

        {options1.map((input, index) => (
          <div key={index} style={{width: "300px", height: "20px", border: "1px solid black", padding: "10px", fontSize: "20px", marginBottom: "10px", position: "relative"}}>
            {input}
            <span style={{position: "absolute", top: "1px", right: "5px", cursor: "pointer", fontSize: "20px"}} onClick={() => handleCloseClick(index)}>x</span>
          </div>
        ))}

        {filteredWords.length > 0 && (
          <ul className="filtered-words">
            {filteredWords.map((word) => (
              <p key={word}>{word}</p>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;
