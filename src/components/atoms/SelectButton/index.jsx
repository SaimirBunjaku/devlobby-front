import React from 'react';
import './SelectButton.scss';

function SelectButton({ onClick, selected }) {
  return (
    <button className={`select-button ${selected ? 'selected' : ''}`} onClick={onClick}>
      Select
    </button>
  );
}

export default SelectButton;
