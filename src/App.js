import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './Pages/Home.js';
import Reports from './Pages/Reports.js';
import Inventory from './Pages/Inventory.js';
import Team from './Pages/CRUD.js'
import Login from "./Pages/Login.js";
import "./App.css"


function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path='/' component={Login} />
          <Route path="/sign-in" component={Login} />
          <Route path='/home' component={Home} />
          <Route path='/reports' component={Reports} />
          <Route path='/Inventory' component={Inventory} />
          <Route path='/team' component={Team} />
        </Switch>

      </Router>
    </>
  );
}
export default App;
