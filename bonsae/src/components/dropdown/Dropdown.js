import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styles from "./Dropdown.module.css";

function Dropdown({
  backgroundColor,
  textColor,
  highlightColor,
  fontFamily,
  fontSize,
  border,
  borderRadius,
  boxShadow,
  onSelect,
  label,
}) {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isOptionSelected, setIsOptionSelected] = useState(false);

  const options = ['Nome', 'Situação', 'Data'];

  useEffect(() => {
    function handleOutsideClick(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setMenuIsOpen(false);
      }
    }

    if (menuIsOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    } else {
      document.removeEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [menuIsOpen]);

  function toggleMenu() {
    setMenuIsOpen(!menuIsOpen);
  }

  function selecionarOpcao(opcao) {
    setSelectedOption(opcao);
    setIsOptionSelected(true);
    setMenuIsOpen(false); // Feche o menu após a seleção
  }

  const dropdownStyles = {
    backgroundColor: backgroundColor,
    color: textColor,
    highlightColor: highlightColor,
    fontFamily: fontFamily,
    fontSize: fontSize,
    border: border,
    borderRadius: borderRadius,
    boxShadow: boxShadow,
  };

  return (
    <div className={styles.dropdownContainer} ref={dropdownRef}>
      <button
        aria-haspopup="true"
        aria-expanded={menuIsOpen}
        type="button"
        data-toggle="dropdown"
        onClick={toggleMenu}
        className={styles.dropdownButton}
        style={dropdownStyles}
        aria-label={label || 'Dropdown'}
      >
        {selectedOption ? selectedOption : 'Filtrar por'}
      </button>
      <div className={styles.dropdownImage}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <g clip-path="url(#clip0_8_6498)">
            <path d="M14 18L10 18L10 16L14 16V18ZM21 6V8L3 8V6L21 6ZM18 13L6 13V11L18 11V13Z" fill="#1161D8" />
          </g>
          <defs>
            <clipPath id="clip0_8_6498">
              <rect width="24" height="24" fill="white" transform="matrix(-1 0 0 1 24 0)" />
            </clipPath>
          </defs>
        </svg>
      </div>
      {menuIsOpen && (
        <div className={styles.dropdownMenuContainer}>
          <ul className={styles.dropdownMenu} style={{ backgroundColor: dropdownStyles.backgroundColor }}>
            {options.map((option, index) => (
              <li key={index}>
              <a
                href="#"
                onClick={() => selecionarOpcao(option)}
                className={option === selectedOption ? styles.selectedOption : ''}
                style={{ color: dropdownStyles.color }}
              >
                {option}
              </a>
            </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

Dropdown.propTypes = {
  backgroundColor: PropTypes.string,
  textColor: PropTypes.string,
  highlightColor: PropTypes.string,
  fontFamily: PropTypes.string,
  fontSize: PropTypes.string,
  border: PropTypes.string,
  borderRadius: PropTypes.string,
  boxShadow: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSelect: PropTypes.func,
  label: PropTypes.string,
};

export default Dropdown;
