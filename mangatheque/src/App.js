import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './components/Home.js';
import Login from './components/Login.js';
import Register from './components/Register.js';
import Dashboard from './components/Dashboard.js';
import Edit from './components/Edit.js';
import Create from './components/Create.js';
import Profile from './components/Profile.js';
import Settings from './components/Settings.js';
import List from './components/List.js';
import Detail from './components/Detail.js';

function App() {
  return (
    <Router>
      <Route exact path="/" component={Home}/>
      <Route path="/connexion" component={Login}/>
      <Route path="/inscription" component={Register}/>
      <Route exact path="/dashboard" component={Dashboard}/>
      <Route exact path="/dashboard/edit/:id" component={Edit}/>
      <Route exact path="/dashboard/manga-manwha/add" component={Create}/>
      <Route exact path="/profil" component={Profile}/>
      <Route exact path="/profil/parametres" component={Settings}/>
      <Route exact path="/liste" component={List}/>
      <Route exact path="/liste/:id" component={Detail}/>
    </Router>
  );
}

export default App;
