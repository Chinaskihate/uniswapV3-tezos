import React, { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';

interface DropdownMenuProps {
  onSelect: (option: string) => void;
}

const PeriodDropDown: React.FC<DropdownMenuProps> = ({ onSelect }) => {
  const [selectedOption, setSelectedOption] = useState<string>('All');

  const handleOptionClick = (option: string) => {
    console.log("Clicked: "+option)
    setSelectedOption(option);
    onSelect(option);
  };
  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        {selectedOption}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={() => handleOptionClick('all')}>All</Dropdown.Item>
        <Dropdown.Item onClick={() => handleOptionClick('year')}>Year</Dropdown.Item>
        <Dropdown.Item onClick={() => handleOptionClick('week')}>Week</Dropdown.Item>
        <Dropdown.Item onClick={() => handleOptionClick('day')}>Day</Dropdown.Item>
        <Dropdown.Item onClick={() => handleOptionClick('hour')}>Hour</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default PeriodDropDown;