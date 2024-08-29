// components/Game.js
'use client';

import { useEffect, useState } from 'react';
import styles from './Game.module.css';

const Game = () => {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [guess, setGuess] = useState('');
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('https://countriesnow.space/api/v0.1/countries/flag/images');
        const data = await response.json();
        setCountries(data.data);
        selectRandomCountry(data.data);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };

    fetchCountries();
  }, []);

  const selectRandomCountry = (countries) => {
    const randomIndex = Math.floor(Math.random() * countries.length);
    setSelectedCountry(countries[randomIndex]);
  };

  const handleGuess = () => {
    if (guess.toLowerCase() === selectedCountry.name.toLowerCase()) {
      setScore(score + 10);
      setMessage(`Correcto! 10 puntos.`);
    } else {
      setScore(score - 1);
      setMessage(`Mal, la respuesta es ${selectedCountry.name}.`);
    }
    setTimeout(() => setMessage(''), 3000);
    selectRandomCountry(countries);
    setGuess('');
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Adivinar el pais</h1>
      {selectedCountry && (
        <div className={styles.flagContainer}>
          <img src={selectedCountry.flag} alt="Country Flag" className={styles.flag} />
          <div className={styles.inputContainer}>
            <input
              type="text"
              placeholder="Ingresa el nombre del pais"
              value={guess}
              onChange={(e) => setGuess(e.target.value)}
              className={styles.input}
            />
            <button onClick={handleGuess} className={styles.button}>Enviar</button>
          </div>
          {message && <p className={styles.message}>{message}</p>}
        </div>
      )}
      <h2 className={styles.score}>Puntosss: {score}</h2>
    </div>
  );
};

export default Game;
