import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles/base.css';
import './styles/shell.css';
import './styles/hero.css';
import './styles/work.css';
import './styles/lab.css';
import './styles/sections.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
