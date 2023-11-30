import React, { useState, useEffect } from 'react';
import DataTable from './components/datatable/DataTable';
import Dropdown from './components/dropdown/Dropdown';
import axios from 'axios';
import dados from './components/datatable/dados_aleatorios.csv';
import Titulo from './components/titulo/Titulo';
import handleToggleOrder from './components/datatable/DataTable';

const App = () => {
  
  const columns = ['Nome', 'Situação', 'Tipo', 'Data', 'Informação'];
  const headers = ['Nome', 'Situação', 'Tipo', 'Data', 'Informação'];

  return (
    <div className="App">
      <Titulo content='Titulo' textColor='#111'  fontSize='21px' fontFamily='Nunito, sans-serif'/>
      <DataTable columns={columns} headers={headers} csvData={dados}> </DataTable>
      
    </div>
  );
};

export default App;
