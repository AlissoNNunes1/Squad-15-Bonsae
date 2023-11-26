import Dropdown from "../dropdown/Dropdown";
import styles from "./DataTable.module.css";
import searchIcon from "./search.png"; // Importe o ícone de pesquisa
import Alert from "./alert";

function DataTable() {
  return (
    <div className={styles.background}>
      <header>
        <div className={styles.btnsearch}>
            <div>
          <input
            type="text"
            className={styles.pesquisa}
            placeholder="Pesquisar por"
            aria-label="Pesquisar por"
          />
          </div>
          <button type="submit" className={styles.searchButton} aria-label="Pesquisar">
            <img src={searchIcon} alt="Ícone de Pesquisa" />
          </button>
        </div>

        <ul className="list-unstyled">

          <li className={styles.item}><input className={styles.checkbox} type="checkbox" id="myCheck" onclick="myFunction()"/>Nome</li>
          <li>Informações</li>
          <li>Informações</li>
          <li>Informações</li>
          <li>Informações</li>
        </ul>
        <tbody>
            <tr>
              <td id="name">[Informação]</td>
              <td id="situation"></td>
              <td id='info'>Informação</td>
              <td id="date">31/12/2023</td>
              <td id="infor">Informação</td>
            </tr>
            
          </tbody>

    
      </header>
    </div>
  );
}

export default DataTable;
