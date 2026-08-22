import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { KeranjangProvider } from './context/KeranjangContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <KeranjangProvider>
      <App />
    </KeranjangProvider>
  </StrictMode>,
);