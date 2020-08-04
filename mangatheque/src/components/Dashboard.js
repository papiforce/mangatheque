import React, { Component, Fragment } from 'react';
import { Link, Redirect } from "react-router-dom";
import Navbar from './Navbar.js';
import './css/dashboard.css';
import axios from 'axios';

export class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: false,
      mangas_data: [],
      users_data: []
    }

    this.delete = this.delete.bind(this);
    this.delete2 = this.delete2.bind(this);
  }

  componentDidMount() {
    document.title = "Mangathèque | Dashboard";
    var user = JSON.parse(localStorage.getItem('user'));

    if(user.role === "user") {
      this.setState({ redirect: true });
    }

    this.mangas();
    this.users();
  }

  mangas() {
    var user = JSON.parse(localStorage.getItem('user'));

    axios({
      method: 'GET',
      url: 'http://localhost:4000/mangas',
      headers: {
        Authorization: `Bearer ${user.token}`
      }
    })
    .then(response => {
      this.setState({ mangas_data: response.data });
    })
    .catch(function(err) {
      console.log(err);
    })
  }

  users() {
    var user = JSON.parse(localStorage.getItem('user'));

    axios({
      method: 'GET',
      url: 'http://localhost:4000/users',
      headers: {
        Authorization: `Bearer ${user.token}`
      }
    })
    .then(response => {
      this.setState({ users_data: response.data });
    })
    .catch(function(err) {
      console.log(err);
    })
  }

  delete(e) {
    var user = JSON.parse(localStorage.getItem('user'));

    axios({
      method: 'DELETE',
      url: `http://localhost:4000/users/${e.target.id}`,
      headers: {
        Authorization: `Bearer ${user.token}`
      }
    })
    .then(response => {
      this.users();
    })
    .catch(function(err) {
      console.log(err);
    })
  }

  delete2(e) {
    var user = JSON.parse(localStorage.getItem('user'));

    axios({
      method: 'DELETE',
      url: `http://localhost:4000/mangas/${e.target.id}`,
      headers: {
        Authorization: `Bearer ${user.token}`
      }
    })
    .then(response => {
      this.users();
    })
    .catch(function(err) {
      console.log(err);
    })
  }

  render() {
    if(this.state.redirect) {
      return <Redirect to="/"/>
    }

    var displayMangas = [].concat(this.state.mangas_data).sort((a, b) => a.name > b.name ? 1 : -1).map((item, i) => {
      return(
        <Fragment key={i}>
          <p>{item.name} <span><Link to={"/dashboard/edit/" + item.id}><i className="fas fa-edit"></i></Link> <i className="fas fa-trash" id={item.id} onClick={this.delete2}></i></span></p>
        </Fragment>
      )
    })

    var displayUsers = [].concat(this.state.users_data).sort((a, b) => a.username > b.username ? 1 : -1).map((item, i) => {
      var suppr = null;
      var edit = null;

      if(item.role === "user") {
        suppr = (
            <i className="fas fa-trash" id={item.id} onClick={this.delete}></i>
        )

        edit = (
          <Fragment>
            <Link to={"/dashboard/edit/" + item.id}><i className="fas fa-edit"></i></Link>
          </Fragment>
        )
      } else {
        suppr = null;
        edit = null;
      }

      return(
        <Fragment key={i}>
          <p>{item.username} <span>{edit} {suppr}</span></p>
        </Fragment>
      )
    })

    return(
      <Fragment>
        <Navbar/>
        <div className="dashboard-container">
          <div className="mangas-list">
            <h3>Liste des mangas/manwhas <Link to="/dashboard/manga-manwha/add"><i className="fas fa-plus"></i></Link></h3>
            <div className="list-element">
              {displayMangas}
            </div>
          </div>
          <div className="users-list">
            <h3>Liste des membres</h3>
            <div className="list-element">
              {displayUsers}
            </div>
          </div>
        </div>
      </Fragment>
    )
  }
}

export default Dashboard;
