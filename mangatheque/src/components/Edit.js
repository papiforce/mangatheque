import React, { Component, Fragment } from 'react';
import { Link, Redirect } from "react-router-dom";
import Navbar from './Navbar.js';
import './css/dashboard.css';
import axios from 'axios';

export class Edit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: false,
      edit_manga: [],
      edit_user: [],
      success: null
    }

    this.avatar = React.createRef();
    this.email = React.createRef();
    this.username = React.createRef();
    this.role = React.createRef();
    this.image = React.createRef();
    this.name = React.createRef();
    this.author = React.createRef();
    this.category = React.createRef();
    this.description = React.createRef();
    this.year = React.createRef();
    this.scan = React.createRef();
    this.status = React.createRef();
    this.link = React.createRef();
  }

  componentDidMount() {
    document.title = "Mangathèque | Dashboard";
    var user = JSON.parse(localStorage.getItem('user'));

    if(user.role === "user") {
      this.setState({ redirect: true });
    }

    this.manga();
    this.user();
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
      this.setState({ edit_manga: response.data });
    })
    .catch(function(err) {
      console.log(err);
    })
  }

  user() {
    var user = JSON.parse(localStorage.getItem('user'));
    var id = window.location.href.split('/').pop();

    axios({
      method: 'GET',
      url: `http://localhost:4000/users/${id}`,
      headers: {
        Authorization: `Bearer ${user.token}`
      }
    })
    .then(response => {
      this.setState({ edit_user: response.data });
    })
    .catch(function(err) {
      console.log(err);
    })
  }

  handleSubmit(e) {
    e.preventDefault();

    var user = JSON.parse(localStorage.getItem('user'));
    var id = window.location.href.split('/').pop();
    var avatar = this.avatar.current.value;
    var email = this.email.current.value;
    var username = this.username.current.value;
    var role = this.role.current.value;

    if(!(avatar)) {
      avatar = this.state.edit_user.avatar;
    }

    if(!(email)) {
      email = this.state.edit_user.email;
    }

    if(!(username)) {
      username = this.state.edit_user.username;
    }

    if(!(role) || user.role === "super-admin") {
      role = this.state.edit_user.role;
    }

    axios({
      method: 'PUT',
      url: `http://localhost:4000/users/${id}`,
      headers: {
        Authorization: `Bearer ${user.token}`
      },
      data: {
        avatar: avatar,
        email: email,
        username: username,
        role: role
      }
    })
    .then(response => {
      this.user();
      this.setState({ success: true});
    })
    .catch(function(err) {
      console.log(err);
    })
  }

  handleSubmit2(e) {
    e.preventDefault();

    var user = JSON.parse(localStorage.getItem('user'));
    var id = window.location.href.split('/').pop();
    var image = this.image.current.value;
    var name = this.name.current.value;
    var author = this.author.current.value;
    var category = this.category.current.value;
    var description = this.description.current.value;
    var year = this.year.current.value;
    var scan = this.scan.current.value;
    var status = this.status.current.value;
    var link = this.link.current.value;

    if(!(image)) {
      image = this.state.edit_manga.image;
    }

    if(!(name)) {
      name = this.state.edit_manga.name;
    }

    if(!(author)) {
      author = this.state.edit_manga.author;
    }

    if(!(category)) {
      category = this.state.edit_manga.category;
    }

    if(!(description)) {
      description = this.state.edit_manga.description;
    }

    if(!(year)) {
      year = this.state.edit_manga.year;
    }

    if(!(scan)) {
      scan = this.state.edit_manga.scan;
    }

    if(!(status)) {
      status = this.state.edit_manga.status;
    }

    if(!(link)) {
      link = this.state.edit_manga.link;
    }

    axios({
      method: 'PUT',
      url: `http://localhost:4000/mangas/${id}`,
      headers: {
        Authorization: `Bearer ${user.token}`
      },
      data: {
        image: image,
        name: name,
        author: author,
        category: category,
        description: description,
        year: year,
        scan: scan,
        status: status,
        link: link
      }
    })
    .then(response => {
      this.manga();
      this.setState({ success: true});
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
      return <Redirect to="/"/>
    }

    if(this.state.redirect2) {
      return <Redirect to="/dashboard"/>
    }

    var displayManga = null;
    var displayUser = null;

    var success = null;
    if(this.state.success) {
      success = (
        <p>Informations mises à jour! <i className="fas fa-times" onClick={e => this.close(e)}></i></p>
      )
    } else {
      success = null;
    }

    if(this.state.edit_manga.id) {
      displayManga = (
        <Fragment>
          <h2><Link to="/dashboard"><i className="fas fa-arrow-left"></i></Link>{this.state.edit_manga.name}</h2>
          {success}
          <form>
            <input type="url" ref={this.image} placeholder="Lien de l'image" defaultValue={this.state.edit_manga.image} />
            <input type="text" ref={this.name} placeholder="Nom du manga/manwha" defaultValue={this.state.edit_manga.name} />
            <input type="text" ref={this.author} placeholder="Nom de l'auteur" defaultValue={this.state.edit_manga.author} />
            <input type="text" ref={this.category} placeholder="Genre" defaultValue={this.state.edit_manga.category} />
            <textarea rows="7" ref={this.description} placeholder="Synopsis" defaultValue={this.state.edit_manga.description} />
            <input type="text" ref={this.year} placeholder="Année de sortie" defaultValue={this.state.edit_manga.year} />
            <input type="text" ref={this.scan} placeholder="Nombre de scans" defaultValue={this.state.edit_manga.scan} />
            <select ref={this.status} defaultValue={this.state.edit_manga.status}>
              <option value="En cours">En cours</option>
              <option value="Terminé">Terminé</option>
            </select>
            <input type="url" ref={this.link} placeholder="Lien de lecture" defaultValue={this.state.edit_manga.link} />
            <button type="submit" onClick={e => this.handleSubmit2(e)}>Modifier</button>
          </form>
        </Fragment>
      )
    } else {
      displayManga = null;
    }

    if(this.state.edit_user.id) {
      displayUser = (
        <Fragment>
          <h2><Link to="/dashboard"><i className="fas fa-arrow-left"></i></Link>{this.state.edit_user.username}</h2>
          {success}
          <form>
            <input type="url" ref={this.avatar} placeholder="Avatar" defaultValue={this.state.edit_user.avatar} />
            <input type="email" ref={this.email} placeholder="Email" defaultValue={this.state.edit_user.email} />
            <input type="text" ref={this.username} placeholder="Pseudo" defaultValue={this.state.edit_user.username} />
            <select ref={this.role} defaultValue={this.state.edit_user.role}>
              <option value="user">Membre</option>
              <option value="admin">Administrateur</option>
            </select>
            <button type="submit" onClick={e => this.handleSubmit(e)}>Modifier</button>
          </form>
        </Fragment>
      )
    }

    return(
      <Fragment>
        <Navbar/>
        <div className="edit-container">
          {displayManga}
          {displayUser}
        </div>
      </Fragment>
    )
  }
}

export default Edit;
