import React, { Component, Fragment } from 'react'
import { Link, Redirect } from "react-router-dom";

export class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: false
    }

    this.logout = this.logout.bind(this);
  }

  logout() {
    localStorage.removeItem('user');
    this.setState({ redirect: true });
  }

  render() {
    var user = JSON.parse(localStorage.getItem('user'));
    var dashboard = null;

    if(this.state.redirect) {
      return <Redirect to="/connexion"/>
    }

    if(user.role === "admin" || user.role === "super-admin") {
      dashboard = (
        <li><Link to="/dashboard"><i className="fas fa-tools"></i> Dashboard</Link></li>
      )
    }

    return(
      <Fragment>
      <header className="header">
        <Link to="/" className="logo">Mangathèque</Link>
        <input className="menu-btn" type="checkbox" id="menu-btn" />
        <label className="menu-icon" for="menu-btn"><span className="navicon"></span></label>
        <ul className="menu">
          <li><Link to="/liste"><i className="fas fa-bookmark"></i> Mangas / Manwhas</Link></li>
          <li><Link to="/profil"><i className="fas fa-user"></i> Compte</Link></li>
          {dashboard}
          <li><Link to="#" onClick={this.logout}><i className="fas fa-power-off"></i> Déconnexion</Link></li>
        </ul>
      </header>
      </Fragment>
    )
  }
}

export default Navbar;
