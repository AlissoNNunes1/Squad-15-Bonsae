import styles from "./DataTable.module.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import searchIcon from "./search.png";
import { debounce } from "lodash";
import Dropdown from "../dropdown/Dropdown";


function DataTable({ columns, headers, csvData ,tableBackground,
  textColor,
  fontSize, }) {
  const [tableData, setTableData] = useState([]);
  const [order, setOrder] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [arrayData, setArrayData] = useState([]);
  const [selectedOption, setSelectedOption] = useState("")

  const convertCSVToArray = (csvData) => {
    const lines = csvData.split("\n");
    const data = [];

    for (let i = 1; i < lines.length; i++) {
      const row = lines[i].split(",");
      const obj = {};

      for (let j = 0; j < headers.length; j++) {
        obj[headers[j]] = row[j];
      }

      data.push(obj);
    }

    return data;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(csvData);
        const csvString = response.data;
        const arrayDataFromCSV = convertCSVToArray(csvString);
        setArrayData(arrayDataFromCSV);
      } catch (error) {
        console.error('Error fetching CSV data:', error);
      }
    };

    if (csvData && csvData.length > 0) {
      fetchData();
    }
  }, [csvData]);

  

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
    if (currentPage < Math.ceil(arrayData.length / rowsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };
 
 
  

  const filterData = (searchTerm, selectedOption, currentData) => {
    if ((!searchTerm || searchTerm.trim() === "") && !selectedOption) {
      return currentData; // Retorna os dados iniciais se nenhum termo de pesquisa ou opção for selecionada
    }
  
    if (!Array.isArray(currentData) || currentData.length === 0) {
      return []; // Retorna um array vazio se os dados não estiverem definidos ou forem um array vazio
    }
  
    // Filtragem por termo de pesquisa
    let filteredData = currentData.filter((row) => {
      const values = Object.values(row);
      const searchTermFound =
        searchTerm &&
        searchTerm.trim() !== "" &&
        values.some((value) =>
          value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
        );
      return searchTermFound || !searchTerm;
    });
  
    // Ordenação com base na coluna selecionada
    if (selectedOption) {
      filteredData.sort((a, b) => {
        if (a[selectedOption] < b[selectedOption]) return -1;
        if (a[selectedOption] > b[selectedOption]) return 1;
        return 0;
      });
    }
  
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
  const filteredData = filterData(searchTerm, selectedOption, arrayData);
  const orderedFilteredData = orderedData(filteredData);
  setTableData(orderedFilteredData);
}, [searchTerm,selectedOption, order, arrayData]);

const handleToggleOrder = (column) => {
  const newOrder = { ...order };
  newOrder[column] = order[column] === "asc" ? "desc" : "asc";
  setOrder(newOrder);
};

const debouncedSearch = debounce((value) => {
  setSearchTerm(value);
}, 50);

// Adicione um estado para armazenar as células selecionadas
const [selectedCells, setSelectedCells] = useState([]);

// Função para lidar com o clique na célula
const handleCellClick = (rowData, column) => {
  // Verifica se a célula já está selecionada
  const cellIsSelected = selectedCells.some(
    (cell) => cell.rowData === rowData && cell.column === column
  );

  let updatedSelectedCells;

  // Se a célula já estiver selecionada, remove da lista de selecionadas
  if (cellIsSelected) {
    updatedSelectedCells = selectedCells.filter(
      (cell) => !(cell.rowData === rowData && cell.column === column)
    );
  } else {
    // Se a célula não estiver selecionada, adiciona à lista de selecionadas
    updatedSelectedCells = [
      ...selectedCells,
      { rowData, column }
    ];
  }

  // Atualiza o estado com as células selecionadas
  setSelectedCells(updatedSelectedCells);

  // Você pode realizar outras ações com base na célula clicada, se necessário
};


 return (
 
  // ... (código anterior)

<div className={styles.background} style={{ backgroundColor: tableBackground }}>
  <header>
    <div className={styles.btnsearch}>
      <div>
        {/* Adicionando rótulo ao campo de pesquisa */}
        <label htmlFor="searchInput" className={styles.label}>
          Pesquisar por:
        </label>
        <input
          type="text"
          id="searchInput"
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
      {/* Adicionando rótulo ao Dropdown */}
      <Dropdown
        options={['Nome', 'Situação', 'Tipo', 'Data', 'Informação']}
        onSelect={(option) => setSelectedOption(option)}
        ariaLabel="Selecione uma opção"
      />
    </div>

    <ul className={styles.list}>
      {columns.map((column, index) => (
        <li className={styles.item} key={index} onClick={() => handleToggleOrder(column)}>
          {/* Adicionando rótulos aos cabeçalhos da tabela */}
          <span
            className={`${styles.arrow} ${
              order[column] === 'asc' ? styles.arrowUp : styles.arrowDown
            }`}
            onClick={() => handleToggleOrder(column)}
            aria-label={`Ordenar por ${headers[index]}`}
          ></span>
          {headers[index]}
        </li>
      ))}
    </ul>
  </header>
  <table className={`${styles.table} ${styles.customTable}`} style={{ fontSize: fontSize }}>
    <tbody>
      {tableData
        .slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage)
        .map((rowData, rowIndex) => (
          <tr key={rowIndex}>
            {columns.map((column, colIndex) => (
              <td
                key={colIndex}
                className={`${styles[column]} ${styles.customCell}`}
                onClick={() => handleCellClick(rowData, column)}
                style={{ color: textColor }}
              >
                {rowData[column]}
              </td>
            ))}
          </tr>
        ))}
    </tbody>
  </table>
  <div className={styles.pagination}>
    {/* Adicionando rótulos aos botões de navegação */}
    <button className={styles.btn} type="button" onClick={handlePreviousPage} aria-label="Página anterior">
      Previous
    </button>
    <span>
      Page <strong>{currentPage}</strong> of{" "}
      <strong>{Math.ceil(arrayData.length / rowsPerPage)}</strong>
    </span>
    <button className={styles.btn} type="button" onClick={handleNextPage} aria-label="Próxima página">
      Next
    </button>
  </div>
</div>

 );
}
DataTable.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.string).isRequired,
  headers: PropTypes.arrayOf(PropTypes.string).isRequired,
  csvData: PropTypes.string.isRequired,
};

export default DataTable;