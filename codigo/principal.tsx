import React from 'react';
import ReactDOM from 'react-dom/client';
import Aplicacion from './Aplicacion';
import './estilos/sistema.css';

const elementoRaiz = document.getElementById('raiz');

if (elementoRaiz) {
  ReactDOM.createRoot(elementoRaiz).render(
    <React.StrictMode>
      <Aplicacion />
    </React.StrictMode>
  );
}
