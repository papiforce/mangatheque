import React, { Component, Fragment } from 'react';
import { Link, Redirect } from "react-router-dom";
import './css/auth.css';
import axios from 'axios';

export class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      username: '',
      password: '',
      redirect: false,
      redirect2: false
    }

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  componentDidMount() {
    document.title = "Mangathèque | Inscription";
    if(localStorage.getItem("user")) {
      this.setState({ redirect: true });
    }
  }

  handleEmailChange(e) {
    this.setState({ email: e.target.value });
  }

  handleUsernameChange(e) {
    this.setState({ username: e.target.value });
  }

  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();

    axios({
      method: 'POST',
      url: 'http://localhost:4000/users/register',
      data: {
        email: this.state.email,
        username: this.state.username,
        password: this.state.password
      }
    })
    .then(response => {
      this.setState({ redirect2: true });
    })
    .catch(function(err) {
      console.log(err);
    })
  }

  render() {
    if(this.state.redirect) {
      return <Redirect to="/"/>
    }

    if(this.state.redirect2) {
      return <Redirect to="/connexion"/>
    }

    return(
      <Fragment>
        <center><h1>Mangathèque</h1></center>
        <div className="register-block">
          <img width="20%" src="https://cdn.shopify.com/s/files/1/0295/6089/7671/files/Itachi_assis_posey_large.png?v=1584723548" alt="itachi"/>
          <form>
            <center><h2>Inscription</h2></center>
            <input type="email" id="email" name="email" placeholder="Email" value={this.state.email} onChange={this.handleEmailChange} required />
            <input type="text" id="pseudo" name="pseudo" placeholder="Pseudo" value={this.state.username} onChange={this.handleUsernameChange} required />
            <input type="password" id="password" name="password" placeholder="Mot de passe" value={this.state.password} onChange={this.handlePasswordChange} required />
            <center><Link to="/connexion">Déjà inscrit? Connectes-toi!</Link></center>
            <button type="submit" onClick={e => this.handleSubmit(e)}>S'inscrire</button>
          </form>
        </div>
      </Fragment>
    )
  }
}

export default Register;
