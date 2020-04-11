import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import backgroundImage from './assets/background.jpg';
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
      console.log(response);
    })
  }, []);
  
  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `Novo Repositório ${Date.now()}`,
      url: "https://github.com/pedrotaem/Desafio_1-_Conceitos_do_NodeJS",
      techs: [ "Javascript"]	
    })
    const repository = response.data;

    setRepositories([...repositories, repository]);
    console.log(repositories);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`)
    const repositoryIndex = [...repositories].findIndex((repository) => repository.id === id);
    const repositories_total = [...repositories];
    repositories_total.splice(repositoryIndex,1);
    setRepositories(repositories_total);
  }

  return (
    <div>
      <Header title="Projetos - Repos"/>
      <img width={500} src={backgroundImage} />
      <ul data-testid="repository-list">
        {repositories.map(repository => <li key ={repository.id}>{repository.title}
            <button type="button" onClick={() => handleRemoveRepository(repository.id)}>
            Remover
            </button></li>)}
      </ul>
      <button type="button" onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
