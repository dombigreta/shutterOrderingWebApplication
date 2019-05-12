import React from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap'

import MainContainerComponent from './components/MainContainerComponent';
import HeaderComponent from './components/HeaderComponent';

function App() {
  return (
    <React.Fragment>
      <HeaderComponent/>
      <MainContainerComponent/>
      </React.Fragment>
  );
}

export default App;
