import styles from "./Dropdown.module.css";
import { useState, useEffect, useRef } from 'react';

function Dropdown(props) {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isOptionSelected, setIsOptionSelected] = useState(false);

  // Array de opções
  const options = ['Nome', 'Situação', 'Data', ];

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

  function selecionarOpcao(opcao) {
    setSelectedOption(opcao);
    setIsOptionSelected(true);
    setMenuIsOpen(false); // Feche o menu após a seleção
  }

  return (
    <div className={styles.dropdownContainer} ref={dropdownRef}>
      <button onClick={exibirOpcoes} className={styles.dropdownButton}>
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
                <button
                  onClick={() => selecionarOpcao(option)}
                  className={option === selectedOption ? styles.selectedOption : ''}
                >
                  {option}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Dropdown;
