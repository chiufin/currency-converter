import React from 'react';
import CurrencyBox from './CurrencyBox';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1 className="App-logo">Currency Converter</h1>
      <CurrencyBox from='USD' to='EUR'/>
    </div>
  );
}

export default App;
