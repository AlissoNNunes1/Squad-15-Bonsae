import React, { useState, useEffect } from 'react';
import DataTable from './components/datatable/DataTable';
import Dropdown from './components/dropdown/Dropdown';
import axios from 'axios';
import dados from './components/datatable/dados_aleatorios.csv'
import Titulo from './components/titulo/Titulo'

function App() {
 const [csvData, setCsvData] = useState([]);

 useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get([dados]); // Substitua pelo caminho correto do seu arquivo CSV
        setCsvData(response.data);
      } catch (error) {
        console.error('Erro ao carregar dados do arquivo:', error);
      }
    };

    fetchData();
 }, []);

 const columns = ['Column1', 'Column2', 'Column3', 'Column4', 'Column5']; // Defina suas colunas aqui
 const headers = ['Nome', 'Situação', 'Tipo', 'Data', 'Informação']; // Defina os cabeçalhos aqui

 

 return (
    <div className="App">
      <Titulo content='Titulo'></Titulo>
      <Dropdown options={['Option 1', 'Option 2', 'Option 3']} />
      <DataTable 
        columns={columns} 
        headers={headers} 
        initialData={csvData} 
        
      />
    </div>
 );
}

export default App;