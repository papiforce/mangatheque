import React, { Component, Fragment } from 'react';
import { Link, Redirect } from "react-router-dom";
import Navbar from './Navbar.js';
import './css/profile.css';
import axios from 'axios';

export class Settings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: false,
      user: '',
      success: false
    }

    this.avatar = React.createRef();
    this.email = React.createRef();
    this.username = React.createRef();
  }

  componentDidMount() {
    if(!localStorage.getItem("user")) {
      this.setState({ redirect: true });
    }

    this.user();
  }

  user() {
    var user = JSON.parse(localStorage.getItem('user'));
    
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
  }

  handleSubmit(e) {
    e.preventDefault();

    var user = JSON.parse(localStorage.getItem('user'));
    var avatar = this.avatar.current.value;
    var email = this.email.current.value;
    var username = this.username.current.value;

    if(!(avatar)) {
      avatar = this.state.user.avatar;
    }

    if(!(email)) {
      email = this.state.user.email;
    }

    if(!(username)) {
      username = this.state.user.username;
    }

    axios({
      method: 'PUT',
      url: `http://localhost:4000/users/${user.id}`,
      headers: {
        Authorization: `Bearer ${user.token}`
      },
      data: {
        avatar: avatar,
        email: email,
        username: username
      }
    })
    .then(response => {
      this.user();
      this.setState({ success: true });
    })
    .catch(function(err) {
      console.log(err);
    })
  }

  close(e) {
    this.setState({ success: false });
  }

  render() {
    if(this.state.redirect) {
      return <Redirect to="/connexion"/>
    }

    var success = null;
    if(this.state.success) {
      success = (
        <p>Informations mises à jour! <i className="fas fa-times" onClick={e => this.close(e)}></i></p>
      )
    } else {
      success = null;
    }

    return(
      <Fragment>
        <Navbar/>
        <div className="settings-container">
          <center><h2><Link to="/profil"><i className="fas fa-arrow-left"></i></Link>- Paramètres -</h2></center>
          <div className="settings-block">
            {success}
            <img src={this.state.user.avatar} alt={this.state.user.username}/>
            <form>
              <input type="url" ref={this.avatar} placeholder="Lien de l'avatar" defaultValue={this.state.user.avatar}/>
              <input type="text" ref={this.username} placeholder="Pseudo" defaultValue={this.state.user.username}/>
              <input type="email" ref={this.email} placeholder="Email" defaultValue={this.state.user.email}/>
              <button type="submit" onClick={e => this.handleSubmit(e)}>Modifier</button>
            </form>
          </div>
        </div>
      </Fragment>
    )
  }
}

export default Settings;
