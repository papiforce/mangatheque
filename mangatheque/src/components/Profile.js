import React, { Component, Fragment } from 'react';
import { Link, Redirect } from "react-router-dom";
import Navbar from './Navbar.js';
import Moment from 'react-moment';
import './css/profile.css';
import axios from 'axios';

export class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: false,
      user: '',
      data: [],
      data1: [],
      data2: []
    }

    this.name = React.createRef();
    this.status = React.createRef();
    this.scan = React.createRef();
    this.delete = this.delete.bind(this);
  }

  componentDidMount() {
    document.title = "Mangathèque | Profil";
    var user = JSON.parse(localStorage.getItem('user'));

    if(!localStorage.getItem("user")) {
      this.setState({ redirect: true });
    }

    axios({
      method: 'GET',
      url: `http://localhost:4000/users/current`,
      headers: {
        Authorization: `Bearer ${user.token}`
      }
    })
    .then(response => {
      this.setState({ user: response.data });
    })
    .catch(function(err) {
      console.log(err);
    })

    axios({
      method: 'GET',
      url: `http://localhost:4000/mangas`,
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

    this.feed();
  }

  feed() {
    var user = JSON.parse(localStorage.getItem('user'));

    axios({
      method: 'GET',
      url: `http://localhost:4000/theques/`,
      headers: {
        Authorization: `Bearer ${user.token}`
      },
      data: {
        user: user.id
      }
    })
    .then(response => {
      var array = [];
      var array2 = [];
      response.data.map(e => {
        if(e.user === user.id && e.status === "Terminé") {
          array.push(e);
        } else {
          array2.push(e);
        }
      })
      this.setState({ data1: array, data2: array2 });
    })
    .catch(function(err) {
      console.log(err);
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    var user = JSON.parse(localStorage.getItem('user'));

    axios({
      method: 'POST',
      url: `http://localhost:4000/theques/add`,
      headers: {
        Authorization: `Bearer ${user.token}`
      },
      data: {
        user: user.id,
        manga: this.name.current.value,
        status: this.status.current.value,
        scan: this.scan.current.value
      }
    })
    .then(response => {
      this.feed();
    })
    .catch(function(err) {
      console.log(err);
    })
  }

  delete(e) {
    var user = JSON.parse(localStorage.getItem('user'));

    axios({
      method: 'DELETE',
      url: `http://localhost:4000/theques/${e.target.id}`,
      headers: {
        Authorization: `Bearer ${user.token}`
      }
    })
    .then(response => {
      this.feed();
    })
    .catch(function(err) {
      console.log(err);
    })
  }

  render() {
    if(this.state.redirect) {
      return <Redirect to="/connexion"/>
    }

    var role = null;
    if(this.state.user.role === "user") {
      role = "Membre";
    } else if(this.state.user.role === "admin") {
      role = "Administrateur";
    } else {
      role = "Fondateur";
    }

    var datalist = [].concat(this.state.data).sort((a, b) => a.name > b.name ? 1 : -1).map((item, i) => {
      return(
        <Fragment key={i}>
          <option value={item.name} alt={item.id}/>
        </Fragment>
      )
    })

    var data = this.state.data1.map(e => {
      return(
        <Fragment key={e.id}>
          <p><b>{e.manga}</b> - {e.status} <i className="fas fa-trash" id={e.id} onClick={this.delete}></i></p>
        </Fragment>
      )
    })

    var data2 = this.state.data2.map(e => {
      return(
        <Fragment key={e.id}>
          <p><b>{e.manga}</b> - Chapitre {e.scan} <i className="fas fa-trash" id={e.id} onClick={this.delete}></i></p>
        </Fragment>
      )
    })

    return(
      <Fragment>
        <Navbar/>
        <div className="profile-container">
          <center><h2>- Profil -</h2></center>
          <div className="user-block">
            <img src={this.state.user.avatar} alt="avatar"/>
            <div className="user-infos">
              <p><b>Pseudo :</b> {this.state.user.username} <Link to="/profil/parametres"><i className="fas fa-user-cog"></i></Link></p>
              <p><b>Email :</b> {this.state.user.email}</p>
              <p><b>Status :</b> {role}</p>
              <p><b>Créé le :</b> <Moment format="DD/MM/YYYY à HH:mm">{this.state.user.createdDate}</Moment></p>
            </div>
          </div>
          <center><h2>- Votre Thèque -</h2></center>
          <div className="searchbar">
            <form>
              <input type="text" ref={this.name} name="manga" list="mangas" placeholder="Nom du manga/manwha"/>
              <datalist id="mangas">
                {datalist}
              </datalist>
              <select ref={this.status}>
                <option value="En cours">En cours</option>
                <option value="Terminé">Terminé</option>
              </select>
              <input type="text" ref={this.scan} placeholder="Dernier scan lu"/>
              <button type="submit" onClick={e => this.handleSubmit(e)}>Ajouter</button>
            </form>
          </div>
          <center><h3>En cours</h3></center>
          <div className="data-block">
            {data2}
          </div>
          <center><h3>Terminés ({this.state.data.length})</h3></center>
          <div className="data-block">
            {data}
          </div>
        </div>
      </Fragment>
    )
  }
}

export default Profile;
