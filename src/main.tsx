import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App.tsx';
import './index.css';
import { Artist } from './types/artists.ts';

const userTopArtists = createContext<Artist[] | undefined>(undefined);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)


