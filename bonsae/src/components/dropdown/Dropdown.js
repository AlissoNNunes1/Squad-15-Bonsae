import styles from "./Dropdown.module.css";
import {useState} from 'react'


function Dropdown(props) {
    const [menuIsOpen, setMenuIsOpen] = useState(false);
    function exibirOpcoes() {
        setMenuIsOpen(true);
      }
    
    
  

  return (
    <div className={styles.dropdownContainer}>
      <button onClick={exibirOpcoes} className={styles.dropdownButton}>
        Filtrar por
      </button>
      <div className={styles.dropdownImage}>
        <svg
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
        </svg>
        </div>
        {menuIsOpen && (
        <div className={styles.dropdownMenuContainer}>
        <ul className={styles.dropdownMenu}>
                <li>
            <a>Opção 1</a>
          </li>
          <div className={styles.dropdownSeparator} />
          <li>
            <a>Opção 2</a>
          </li>
          <div className={styles.dropdownSeparator} />
          <li>
            <a>Opção 3</a>
          </li>
        </ul>
        </div>
      )}
        
      </div>
      
    
  )
}

export default Dropdown;
