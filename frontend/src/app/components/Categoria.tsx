import React, { useState } from 'react';

function CadastrarCategoria() {
  const [nome, setNome] = useState('');

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:4000/api/categoria/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nome }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Categoria criada:', data);
        // Limpar o campo após o envio bem-sucedido
        setNome('');
      } else {
        console.error('Erro ao criar categoria:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao criar categoria:', error);
    }
  };

  return (
    <div className="CadastrarCategoria">
      <h1>Cadastrar Categoria</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Nome da Categoria"
          required
        />
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}

export default CadastrarCategoria;