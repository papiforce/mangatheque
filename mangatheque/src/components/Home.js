import React, { Component, Fragment } from 'react';
import { Link, Redirect } from "react-router-dom";
import Navbar from './Navbar.js';
import './css/home.css';
import axios from 'axios';

export class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: false,
      data: [],
      data2: [],
      id_redirect: false,
      last: []
    }

    this.username = React.createRef();
    this.name = React.createRef();
  }

  componentDidMount() {
    document.title = "Mangathèque | Accueil";
    var user = JSON.parse(localStorage.getItem('user'));

    if(!localStorage.getItem("user")) {
      this.setState({ redirect: true });
    }

    axios({
      method: 'GET',
      url: 'http://localhost:4000/users',
      headers: {
        Authorization: `Bearer ${user.token}`
      }
    })
    .then(response => {
      this.setState({ data: response.data });
    })
    .catch(function(err) {
      console.log(err);
    })

    axios({
      method: 'GET',
      url: 'http://localhost:4000/mangas',
      headers: {
        Authorization: `Bearer ${user.token}`
      }
    })
    .then(response => {
      this.setState({ last: response.data.concat().reverse().slice(0, 6) });
    })
    .catch(function(err) {
      console.log(err);
    })
  }

  handleSubmit(e) {
    e.preventDefault();

    var user = JSON.parse(localStorage.getItem('user'));

    axios({
      method: 'GET',
      url: `http://localhost:4000/users/search/${this.username.current.value}`,
      headers: {
        Authorization: `Bearer ${user.token}`
      }
    })
    .then(response => {
      this.setState({ id_redirect: response.data.id });
    })
    .catch(function(err) {
      console.log(err);
    })
  }

  render() {
    if(this.state.redirect) {
      return <Redirect to="/connexion"/>
    }

    if(this.state.id_redirect) {
      return <Redirect to={`/search/${this.state.id_redirect}`}/>
    }

    var datalist = [].concat(this.state.data).sort((a, b) => a.username > b.username ? 1 : -1).map((item, i) => {
      return(
        <Fragment key={i}>
          <option value={item.username} alt={item.id}/>
        </Fragment>
      )
    })

    var datalist2 = [].concat(this.state.data2).sort((a, b) => a.name > b.name ? 1 : -1).map((item, i) => {
      return(
        <Fragment key={i}>
          <option value={item.name} alt={item.id}/>
        </Fragment>
      )
    })

    var last = this.state.last.map(e => {
      console.log(e)
      return(
        <Fragment key={e.id}>
          <p><b>{e.name}</b> - {e.status} <Link to={`/liste/${e.id}`}>En savoir +</Link></p>
        </Fragment>
      )
    })

    return(
      <Fragment>
        <Navbar/>
        <div className="home-container">
          <div className="search-block">
            <h3>- Recherche -</h3>
            <form>
              <input type="text" ref={this.username} placeholder="Rechercher un membre" name="member" list="members"/>
              <datalist id="members">
                {datalist}
              </datalist>
              <button type="submit" onClick={e => this.handleSubmit(e)}>Chercher</button>
            </form>
            <form>
              <input type="text" ref={this.name} placeholder="Rechercher un manga" name="manga" list="mangas"/>
              <datalist id="mangas">
                {datalist2}
              </datalist>
              <button type="submit" onClick={e => this.handleSubmit2(e)}>Chercher</button>
            </form>
          </div>
          <div className="last-block">
            <h3>- Derniers ajouts -</h3>
            {last}
          </div>
        </div>
      </Fragment>
    )
  }
}

export default Home;
