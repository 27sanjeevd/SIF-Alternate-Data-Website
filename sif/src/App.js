import React, { useState } from "react";
import "./components/TextBox.css";

const TextBox = () => {
  const [inputValue, setInputValue] = useState("");
  const [words, setWords] = useState(["apple", "banana", "cherry", "date"]);
  const [filteredWords, setFilteredWords] = useState([]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    setFilteredWords(
      words.filter((word) => word.startsWith(inputValue))
    );
  };

  const [inputs, setInputs] = useState([]);
  
  const handleKeyUp = (event) => {
    if (event.keyCode === 13) {
      const foundWord = words.find((word) => word.startsWith(event.target.value));
      if (words.includes(event.target.value)) {
        setInputs([...inputs, event.target.value]);
      } else if (foundWord) {
        setInputs([...inputs, foundWord]);
      }
      event.target.value = "";
    }
  };
  
  
  const handleCloseClick = (index) => {
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

      {inputs.map((input, index) => (
        <div key={index} style={{width: "300px", height: "50px", border: "1px solid black", padding: "10px", fontSize: "20px", marginBottom: "10px", position: "relative"}}>
          {input}
          <span style={{position: "absolute", top: "5px", right: "5px", cursor: "pointer", fontSize: "20px"}} onClick={() => handleCloseClick(index)}>x</span>
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
