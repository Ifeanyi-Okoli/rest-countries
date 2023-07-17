import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));  //the root element from the index.html file in the react public folder
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

