import React from 'react';
import {HashRouter, Route} from 'react-router-dom';
import Home from "./routes/Home";
import MainHome from "./routes/MainHome";
import './App.css';

function App() {
  return (
    <HashRouter>
      <Route path="/" exact={true} component={MainHome}></Route>
      <Route path="/weather/:id" component={Home}></Route>
    </HashRouter>
  );
}

export default App;
