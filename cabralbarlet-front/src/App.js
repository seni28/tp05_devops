import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFilms = async () => {
      try {
        // Make sure the URL is correct
        const response = await axios.get('http://backend.localhost/films');
        setFilms(response.data);
      } catch (err) {
        setError('Failed to load films');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFilms();
  }, []);

  if (loading) return <p className="loading">Loading...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
      <div className="App">
        <h1 className="title">Star Wars Films</h1>
        <ul className="film-list">
          {films.map(film => (
              <li key={film.title} className="film-item">
                <div className="film-header">
                  <h2 className="film-title">{film.title}</h2>
                  <p className="film-release">Released on: {new Date(film.releaseDate).toLocaleDateString()}</p>
                </div>
                <p className="film-director">Directed by: {film.director}</p>
                <p className="film-crawl">{film.openingCrawl}</p>
              </li>
          ))}
        </ul>
      </div>
  );
};

export default App;
