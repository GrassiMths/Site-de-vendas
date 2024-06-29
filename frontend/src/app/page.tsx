'use client'
import React from 'react';
import CadastrarCategoria from './components/Categoria';
import Produto from './components/Produto';

function App() {
  return (
    <div className='Fundo'>
    <div className="App">
      <CadastrarCategoria />
      <Produto></Produto>
    </div>
    </div>

  );
}

export default App;