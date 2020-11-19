import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

function App() {

  const [articleId, setArticleId] = useState('');
  const [article, setArticle] = useState({});

    useEffect(() => {
      // POST request using axios inside useEffect React hook
      var dateEnd = new Date();
      dateEnd = dateEnd.toISOString().split('T')[0];
      console.log("dateEnd",dateEnd);
      const article = {
        "date_init":"2020-09-01",
        "date_end":dateEnd
        };
      setArticle(article);
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
          Desde <strong>{String(article.date_init)}</strong> hasta <strong>{String(article.date_end)}</strong> tenemos lo siguiente:
        </p>
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
