import React from 'react';
import './App.css';
import Playlist from './Playlist';
import { AppProvider } from './AppContext';  

function App() {
 
  return (
    <AppProvider>
        <div>
          <h1>Video Player App</h1>
          <h3>Add your playlist below</h3>
          <Playlist />
        </div>
    </AppProvider>
  );
}

export default App;
