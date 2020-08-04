import React, { Component, Fragment } from 'react';
import { Link, Redirect } from "react-router-dom";
import Navbar from './Navbar.js';
import './css/list.css';
import axios from 'axios';

export class Detail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: false,
      data: [],
      follow: false
    }

    this.follow = this.follow.bind(this);
    this.unfollow = this.unfollow.bind(this);
  }

  componentDidMount() {
    if(!localStorage.getItem("user")) {
      this.setState({ redirect: true });
    }

    this.isFollowing();
    this.manga();
  }

  isFollowing() {
    var user = JSON.parse(localStorage.getItem('user'));
    var id = window.location.href.split('/').pop();

    axios({
      method: 'GET',
      url: `http://localhost:4000/follows/follow`,
      headers: {
        Authorization: `Bearer ${user.token}`
      },
      data: {
        user: user.id,
        manga: id
      }
    })
    .then(response => {
      this.setState({ follow: response.data });
    })
    .catch(function(err) {
      console.log(err);
    })
  }

  manga() {
    var user = JSON.parse(localStorage.getItem('user'));
    var id = window.location.href.split('/').pop();

    axios({
      method: 'GET',
      url: `http://localhost:4000/mangas/${id}`,
      headers: {
        Authorization: `Bearer ${user.token}`
      }
    })
    .then(response => {
      this.setState({ data: response.data });
      document.title = `Mangathèque | ${this.state.data.name}`;
    })
    .catch(function(err) {
      console.log(err);
    })
  }

  follow() {
    var user = JSON.parse(localStorage.getItem('user'));
    var id = window.location.href.split('/').pop();

    axios({
      method: 'POST',
      url: `http://localhost:4000/follows/`,
      headers: {
        Authorization: `Bearer ${user.token}`
      },
      data: {
        user: user.id,
        manga: id
      }
    })
    .then(response => {
    })
    .catch(function(err) {
      console.log(err);
    })

    axios({
      method: 'PUT',
      url: `http://localhost:4000/mangas/${id}`,
      headers: {
        Authorization: `Bearer ${user.token}`
      },
      data: {
        follow: Number(this.state.data.follow) + 1
      }
    })
    .then(response => {
      this.setState({ follow: response.data });
      this.manga();
    })
    .catch(function(err) {
      console.log(err);
    })
  }

  unfollow() {
    var user = JSON.parse(localStorage.getItem('user'));
    var id = window.location.href.split('/').pop();

    axios({
      method: 'PUT',
      url: `http://localhost:4000/mangas/${id}`,
      headers: {
        Authorization: `Bearer ${user.token}`
      },
      data: {
        follow: Number(this.state.data.follow) - 1
      }
    })
    .then(response => {
      this.setState({ follow: null });
      this.manga();
    })
    .catch(function(err) {
      console.log(err);
    })
  }

  render() {
    if(this.state.redirect) {
      return <Redirect to="/connexion"/>
    }

    var scan = null;
    if(this.state.data.status === "Terminé") {
      scan = (
        <Fragment>
          <p><b>Nombre de scans</b> {this.state.data.scan}</p>
        </Fragment>
      )
    }

    var follow;
    if(this.state.follow === null) {
      follow = (
        <Fragment>
          <button onClick={this.follow}>S'abonner</button>
        </Fragment>
      )
    } else {
      follow = (
        <Fragment>
          <button onClick={e => this.unfollow(e)}>Se désabonner</button>
        </Fragment>
      )
    }

    console.log(this.state.follow);

    return(
      <Fragment>
        <Navbar/>
        <div className="detail-container">
          <center><h2><Link to="/liste"><i className="fas fa-arrow-left"></i></Link>- {this.state.data.name} -</h2></center>
          <div className="detail-block">
            <img src={this.state.data.image} alt={this.state.data.name}/>
            <div className="detail-infos">
              <p><b>Type</b> {this.state.data.type}</p>
              <p><b>Auteur</b> {this.state.data.author}</p>
              <p><b>Catégorie</b> {this.state.data.category}</p>
              <p><b>Année de sortie</b> {this.state.data.year}</p>
              <p><b>Status</b> {this.state.data.status}</p>
              {scan}
              <p><b>Lien de lecture</b> {this.state.data.link}</p>
              <p><b>Abonnés</b> {this.state.data.follow}</p>
              {follow}
            </div>
          </div>
          <div className="detail-synopsis">
            <h3>Synopsis</h3> <p>{this.state.data.description}</p>
          </div>
        </div>
      </Fragment>
    )
  }
}

export default Detail;
