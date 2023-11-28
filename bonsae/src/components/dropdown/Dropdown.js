import React, { useState, useEffect, useRef } from 'react';
import styles from './Dropdown.module.css';
import PropTypes from 'prop-types';

const Dropdown = ({
 backgroundColor,
 textColor,
 highlightColor,
 fontFamily,
 fontSize,
 border,
 borderRadius,
 boxShadow,
 options,
 onSelect,
 label,
}) => {
 const [menuIsOpen, setMenuIsOpen] = useState(false);
 const [selectedOption, setSelectedOption] = useState('');
 const dropdownRef = useRef(null);

 const toggleMenu = () => {
    setMenuIsOpen(!menuIsOpen);
 };

 const handleOutsideClick = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setMenuIsOpen(false);
    }
 };

 useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
 }, [menuIsOpen]);

 const handleOptionClick = (option) => {
    setSelectedOption(option);
    onSelect && onSelect(option);
    setMenuIsOpen(false);
 };

 const dropdownStyles = {
    backgroundColor,
    color: textColor,
    highlightColor,
    fontFamily,
    fontSize,
    border,
    borderRadius,
    boxShadow,
 };

 return (
    <div className={styles.dropdownContainer} ref={dropdownRef}>
      <button
        aria-haspopup="true"
        aria-expanded={menuIsOpen}
        type="button"
        onClick={toggleMenu}
        className={styles.dropdownButton}
        style={dropdownStyles}
        aria-label={label || 'Dropdown'}
      >
        {selectedOption || 'Filtrar por'}
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
          <ul className={styles.dropdownMenu} style={{ backgroundColor }}>
            {options.map((option, index) => (
              <li key={index}>
                <a
                 href="#"
                 onClick={() => handleOptionClick(option)}
                 className={option === selectedOption ? styles.selectedOption : ''}
                 style={{ color: textColor }}
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
};

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