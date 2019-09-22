import React from 'react';
import Header from './Header';
import EditarGenero from './EditarGenero';
import NovoGenero from './NovoGenero';
import Generos from './Generos';
import {BrowserRouter as Router, Route} from 'react-router-dom';

const Home = () => {
  return(
    <h1>Home</h1>
  );
}

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Route path="/" exact component={Home}/>
        <Route path="/generos/:id" exact component={EditarGenero}/>
        <Route path="/generos/novo" exact component={NovoGenero}/>
        <Route path="/generos" exact component={Generos}/>
      </div>
    </Router>
  );
}

export default App;
