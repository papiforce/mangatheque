import React, { Component, Fragment } from 'react';
import { Link, Redirect } from "react-router-dom";
import Pagination from "react-js-pagination";
import Navbar from './Navbar.js';
import './css/list.css';
import axios from 'axios';

export class List extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: false,
      data: []
    }
  }

  componentDidMount() {
    document.title = "Mangathèque | Liste";
    var user = JSON.parse(localStorage.getItem('user'));

    if(!localStorage.getItem("user")) {
      this.setState({ redirect: true });
    }

    axios({
      method: 'GET',
      url: `http://localhost:4000/mangas/`,
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
  }

  render() {
    if(this.state.redirect) {
      return <Redirect to="/connexion"/>
    }

    var displayList = [].concat(this.state.data).sort((a, b) => a.name > b.name ? 1 : -1).map((item, i) => {
      return(
        <Fragment key={i}>
          <div className="list-element">
            <img src={item.image} alt={item.name}/>
            <div className="element-infos">
              <p><Link to={`/liste/${item.id}`}><b>{item.name}</b></Link></p>
              <p>{item.status}</p>
            </div>
          </div>
        </Fragment>
      )
    })

    return(
      <Fragment>
        <Navbar/>
        <div className="list-container">
          <center><h2>Mangas / Manwhas</h2></center>
          {displayList}
        </div>
      </Fragment>
    )
  }
}

export default List;
