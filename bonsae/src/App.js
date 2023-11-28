import React, { useState, useEffect } from 'react';
import DataTable from './components/datatable/DataTable';
import Dropdown from './components/dropdown/Dropdown';
import axios from 'axios';
import dados from './components/datatable/dados_aleatorios.csv'

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

 // Função para determinar a cor do alerta com base na situação
 const getAlertColor = (situacao) => {
    switch (situacao) {
      case 'Colisão':
        return 'danger';
      case 'Travado':
        return 'warning';
      case 'Normal':
        return 'success';
      default:
        return 'primary';
    }
 };

 return (
    <div className="App">
      <DataTable 
        columns={columns} 
        headers={headers} 
        initialData={csvData} 
        alertColor={(data) => getAlertColor(data.situacao)} 
      />
    </div>
 );
}

export default App;