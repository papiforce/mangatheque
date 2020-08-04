import React, { Component, Fragment } from 'react';
import { Link } from "react-router-dom";
import Navbar from './Navbar.js';
import './css/dashboard.css';
import axios from 'axios';

export class Create extends Component {
  constructor(props) {
    super(props);

    this.state = {
      success: null
    }

    this.type = React.createRef();
    this.image = React.createRef();
    this.name = React.createRef();
    this.author = React.createRef();
    this.category = React.createRef();
    this.description = React.createRef();
    this.scan = React.createRef();
    this.year = React.createRef();
    this.status = React.createRef();
    this.link = React.createRef();
  }

  componentDidMount() {
    document.title = "Mangathèque | Dashboard";
    var user = JSON.parse(localStorage.getItem('user'));

    if(user.role === "user") {
      this.setState({ redirect: true });
    }
  }

  handleSubmit(e) {
    e.preventDefault();

    var user = JSON.parse(localStorage.getItem('user'));
    var type = this.type.current.value;
    var image = this.image.current.value;
    var name = this.name.current.value;
    var author = this.author.current.value;
    var category = this.category.current.value;
    var description = this.description.current.value;
    var year = this.year.current.value;
    var scan = this.scan.current.value;
    var status = this.status.current.value;
    var link = this.link.current.value;

    axios({
      method: 'POST',
      url: `http://localhost:4000/mangas/add`,
      headers: {
        Authorization: `Bearer ${user.token}`
      },
      data: {
        type: type,
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
    var success = null;
    if(this.state.success) {
      success = (
        <p>Manga/Manwha correctement ajouté! <i className="fas fa-times" onClick={e => this.close(e)}></i></p>
      )
    } else {
      success = null;
    }

    return(
      <Fragment>
        <Navbar/>
        <div className="create-container">
          <h2><Link to="/dashboard"><i className="fas fa-arrow-left"></i></Link>Ajout</h2>
          {success}
          <form>
            <select ref={this.type}>
              <option value="Manga">Manga</option>
              <option value="Manwha">Manwha</option>
            </select>
            <input type="url" ref={this.image} placeholder="Lien de l'image (*)"/>
            <input type="text" ref={this.name} placeholder="Nom du manga/manwha (*)"/>
            <input type="text" ref={this.author} placeholder="Nom de l'auteur (*)"/>
            <input type="text" ref={this.category} placeholder="Genre du manga/manwha (*)"/>
            <textarea rows="7" ref={this.description} placeholder="Synopsis (*)"/>
            <input type="text" ref={this.year} placeholder="Année de sortie (*)"/>
            <input type="text" ref={this.scan} placeholder="Nombre de scans"/>
            <select ref={this.status}>
              <option value="En cours">En cours</option>
              <option value="Terminé">Terminé</option>
            </select>
            <input type="url" ref={this.link} placeholder="Lien de lecture"/>
            <button type="submit" onClick={e => this.handleSubmit(e)}>Ajouter</button>
          </form>
        </div>
      </Fragment>
    )
  }
}

export default Create;
