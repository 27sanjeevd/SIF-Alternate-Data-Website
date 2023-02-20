import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

const options1 = [];

const TextBox = () => {
  const [inputValue, setInputValue] = useState("");
  const [words, setWords] = useState(["apple", "banana", "cherry", "date"]);
  const [filteredWords, setFilteredWords] = useState([]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    setFilteredWords(
      words.filter((word) => word.startsWith(event.target.value))
    );
  };

  const [inputs, setInputs] = useState([]);
  
  const handleKeyUp = (event) => {
    if (event.keyCode === 13 && event.target.value.length > 0) {
      const foundWord = words.find((word) => word.startsWith(event.target.value));
      
      if (foundWord !== undefined) {
        setInputs(inputs => [...inputs, foundWord]);
        options1.push(foundWord);
      }
      event.target.value = "";
      setInputValue(event.target.value);
    };
  };
  
  
  const handleCloseClick = (index) => {
    options1.splice(index, 1);
    console.log(options1);
    setInputs(inputs.filter((input, i) => i !== index));
  }

  return (
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
  );
};

export default TextBox;
