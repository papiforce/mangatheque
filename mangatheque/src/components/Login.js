import React, { Component, Fragment } from 'react';
import { Link, Redirect } from "react-router-dom";
import './css/auth.css';
import axios from 'axios';

export class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      redirect: false
    }

    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  componentDidMount() {
    document.title = "Mangathèque | Connexion";
    if(localStorage.getItem("user")) {
      this.setState({ redirect: true });
    }
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
      url: 'http://localhost:4000/users/authenticate',
      data: {
        username: this.state.username,
        password: this.state.password
      }
    })
    .then(response => {
      var user = response.data;
      localStorage.setItem('user', JSON.stringify(user));
      this.setState({ redirect: true });
    })
    .catch(function(err) {
      console.log(err);
    })
  }

  render() {
    if(this.state.redirect) {
      return <Redirect to="/"/>
    }

    return(
      <Fragment>
        <center><h1>Mangathèque</h1></center>
        <div className="login-block">
          <img width="20%" src="https://cdn.shopify.com/s/files/1/0295/6089/7671/files/Itachi_assis_posey_large.png?v=1584723548" alt="itachi"/>
          <form>
            <center><h2>Connexion</h2></center>
            <input type="text" id="pseudo" name="pseudo" placeholder="Pseudo" value={this.state.username} onChange={this.handleUsernameChange} required />
            <input type="password" id="password" name="password" placeholder="Mot de passe" value={this.state.password} onChange={this.handlePasswordChange} required />
            <Link to="/inscription">Pas encore de compte? Inscris-toi!</Link>
            <button type="submit" onClick={e => this.handleSubmit(e)}>Se connecter</button>
          </form>
        </div>
      </Fragment>
    )
  }
}

export default Login;
