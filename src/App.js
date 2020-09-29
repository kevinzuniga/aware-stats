import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

function App() {

  const [articleId, setArticleId] = useState('');

    useEffect(() => {
      // POST request using axios inside useEffect React hook
      const article = {
        "date_init":"2020-09-21",
        "date_end":"2020-10-02"
        };
      axios.post('https://api-aware.herokuapp.com/v1/user/count/', article)
          .then(response => {
            console.log(response);
            return setArticleId(response.data.data);
          });
    
    // empty dependency array means this effect will only run once (like componentDidMount in classes)
    }, []);
    if (articleId=='') return (<div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            cargando...
          </p>
        </header>
      </div>)
    else 
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Usuarios creados: {String(articleId.total)}
        </p>
        <p>
          Usuarios premium: {String(articleId.premium)}
        </p>
      </header>
    </div>
  );
}

export default App;
