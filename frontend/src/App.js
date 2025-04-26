import React from 'react';
import './App.css';
import Navbar from './Navbar';
import Home from './Home';
import Add from './Add';
import Edit from './Edit';
import EditStudent from './EditStudent';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";


function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Redirect to="/Home" />
          </Route>
          <Route path="/Add">
            <Add />
          </Route>
          <Route path="/Home">
            <Home />
          </Route>
          <Route exact path="/Edit">
            <Edit />
          </Route>
          <Route path="/edit-student/:id">
            <EditStudent />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;