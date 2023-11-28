import styles from "./DataTable.module.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

import searchIcon from "./search.png";
import { debounce } from "lodash";
import dados from "./dados_aleatorios.csv";

function DataTable({ columns, headers }) {
  const [data, setData] = useState([]);
  const [rawData, setRawData] = useState([]);
  const [order, setOrder] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(1);
   };

   const handlePreviousPage = () => {
    if (currentPage > 1) {
       setCurrentPage(currentPage - 1);
    }
   };

   const handleNextPage = () => {
    if (currentPage < Math.ceil(data.length / rowsPerPage)) {
       setCurrentPage(currentPage + 1);
    }
   };
 
 
  useEffect(() => {
     // Carregar os dados iniciais ao montar o componente
     fetchInitialData();
     const initialOrder = {};
     columns.forEach((column) => {
       initialOrder[column] = "asc";
     });
     setOrder(initialOrder);
  }, [columns]);
 
  const fetchInitialData = async () => {
     try {
       // Exemplo de requisição para um arquivo CSV utilizando axios
       const response = await axios.get([dados]); // Substitua pelo caminho correto do seu arquivo CSV
       const parsedData = parseCSV(response.data);
       setRawData(parsedData);
     } catch (error) {
       console.error("Erro ao carregar dados do arquivo:", error);
     }
  };
 
  const parseCSV = (csvString) => {
     // Implementação básica para parsing de CSV
     const lines = csvString.split("\n");
     const parsedData = lines.map((line) => line.split(",")); // Dividindo por vírgula, isso pode variar dependendo do formato do seu CSV
     return parsedData;
  };
 

 const filterData = (searchTerm, currentData) => {
    if (!searchTerm || searchTerm.trim() === "") {
      return currentData; // Retorna os dados iniciais se o termo de pesquisa for vazio ou não definido
    }

    if (!Array.isArray(currentData) || currentData.length === 0) {
      return []; // Retorna um array vazio se os dados não estiverem definidos ou forem um array vazio
    }

    // Filtragem básica por termo de pesquisa
    const filteredData = currentData.filter((row) => {
      const values = Object.values(row); // Obter os valores do objeto

      for (let i = 0; i < values.length; i++) {
        if (values[i]?.toString().toLowerCase().includes(searchTerm.toLowerCase())) {
          return true;
        }
      }
      return false;
    });

    return filteredData;
 };

 const orderedData = (dataToOrder) => {
    let ordered = [...dataToOrder];

    for (let column in order) {
      if (order[column] === "asc") {
        ordered = ordered.sort((a, b) => {
          if (a[column] < b[column]) return -1;
          if (a[column] > b[column]) return 1;
          return 0;
        });
      } else {
        ordered = ordered.sort((a, b) => {
          if (a[column] > b[column]) return -1;
          if (a[column] < b[column]) return 1;
          return 0;
        });
      }
    }

    return ordered;
 };

 useEffect(() => {
  const filteredData = filterData(searchTerm, rawData);
  const orderedFilteredData = orderedData(filteredData);
  setData(orderedFilteredData);
}, [searchTerm, rawData, order]);


 const handleToggleOrder = (column) => {
    const newOrder = { ...order };
    newOrder[column] = order[column] === "asc" ? "desc" : "asc";
    setOrder(newOrder);
 };

 const debouncedSearch = debounce((value) => {
    setSearchTerm(value);
 }, 50);

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
              value={searchTerm}
              onChange={(e) => debouncedSearch(e.target.value)}
            />
          </div>
          <button type="submit" className={styles.searchButton} aria-label="Pesquisar">
            <img src={searchIcon} alt="Ícone de Pesquisa" onClick={() => setSearchTerm('')} />
          </button>
        </div>

        <ul className={styles.list}>
          {columns.map((column, index) => (
            <li className={styles.item} key={index} onClick={() => handleToggleOrder(column)}>
              {headers[index]}
              <span
  className={`${styles.arrow} ${
    order[column] === 'asc' ? styles.arrowUp : styles.arrowDown
  }`}
  onClick={() => handleToggleOrder(column)}
></span>
            </li>
          ))}
        </ul>
      </header>
      <table className={styles.table}>
      <tbody>
        {data
          .slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage)
          .map((rowData, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((column, colIndex) => (
                <td key={colIndex} className={styles[column]}>
                  {rowData[colIndex]}
                </td>
              ))}
            </tr>
          ))}
      </tbody>
    </table>
    <div className={styles.pagination}>
 <button className={styles.btn} type="button" onClick={handlePreviousPage}>
    Previous
 </button>
 <span>
    Page <strong>{currentPage}</strong> of{" "}
    <strong>{Math.ceil(data.length / rowsPerPage)}</strong>
 </span>
 <button className={styles.btn} type="button" onClick={handleNextPage}>
    Next
 </button>
</div>
    </div>
 );
}

export default DataTable;