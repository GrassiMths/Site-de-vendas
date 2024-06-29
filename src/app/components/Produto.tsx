

import React, { useState } from 'react';

function CadastrarProduto() {
  const [nome, setNome] = useState('');
  const [valor, setValor] = useState('');
  const [descricao, setDescricao] = useState('');
  const [categoriaId, setCategoriaId] = useState('');

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:4000/api/produto/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nome, valor: parseFloat(valor), descricao, categoriaId }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Produto criado:', data);
        // Limpar os campos após o envio bem-sucedido
        setNome('');
        setValor('');
        setDescricao('');
        setCategoriaId('');
      } else {
        console.error('Erro ao criar produto:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao criar produto:', error);
    }
  };

  return (
    <div className="CadastrarProduto">
      <h1>Cadastrar Produto</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Nome do Produto"
          required
        />
        <input
          type="text"
          value={valor}
          onChange={(e) => setValor(e.target.value)}
          placeholder="Valor do Produto"
          required
        />
        <input
          type="text"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          placeholder="Descrição do Produto"
          required
        />
        <input
          type="text"
          value={categoriaId}
          onChange={(e) => setCategoriaId(e.target.value)}
          placeholder="ID da Categoria"
          required
        />
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}

export default CadastrarProduto;