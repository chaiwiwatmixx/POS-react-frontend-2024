import React, { useState } from "react";

const InputSelect = ({selectedOption, setSelectedOption}) => {
  // const [selectedOption, setSelectedOption] = useState("");

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
    console.log(selectedOption)
  };

  return (
    <div>
      <label htmlFor="select">Choose an option:</label>
      <select id="select" value={selectedOption} onChange={handleChange}>
        <option value="">--Please choose an option--</option>
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
      </select>
      <p>Selected option: {selectedOption}</p>
    </div>
  );
};

export default InputSelect;
