import styles from "./Dropdown.module.css";
import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

function Dropdown({
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
 }) {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isOptionSelected, setIsOptionSelected] = useState(false);

  // Array de opções
  

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

  function exibirOpcoes() {
    setMenuIsOpen(!menuIsOpen);
  }

  function selecionarOpcao(opcao,index) {
    setSelectedOption(opcao);
    setIsOptionSelected(true);
    setMenuIsOpen(false); // Feche o menu após a seleção
    onSelect(opcao)
    
  }
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
      <button aria-haspopup="true" aria-expanded="false" type='button'  data-toggle="dropdown" onClick={exibirOpcoes} className={styles.dropdownButton}>
        {selectedOption ? selectedOption : 'Filtrar por'} {/* Exibe a opção selecionada ou 'Filtrar por' */}
      </button>
      <div className={styles.dropdownImage}>
        { <svg
          xmlns="http://www.w3.org/2000/svg"
          width="23"
          height="23"
          viewBox="0 0 23 23"
          fill="none"
        >
          <path
            d="M13.4435 16.5826H9.80041L9.80041 14.7611H13.4435V16.5826ZM19.819 5.65327V7.47483L3.42496 7.47483V5.65327L19.819 5.65327ZM17.0866 12.0287L6.15729 12.0287V10.2072L17.0866 10.2072V12.0287Z"
            fill="#1161D8"
          />
        </svg>}
      </div>
      {menuIsOpen && (
        <div className={styles.dropdownMenuContainer}>
          <ul className={styles.dropdownMenu}>
            {options.map((option, index) => (
              <li key={index}>
                <a
                  
                  target="_blank"
                  onClick={() => selecionarOpcao(option, index)}
                  className={option === selectedOption ? styles.selectedOption : ''}
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
  href: PropTypes.string,
  optionUrls: PropTypes.arrayOf(PropTypes.string), // array de URLs correspondentes às opções
};


export default Dropdown;
