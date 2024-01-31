import React, { Component } from 'react';
import {Link} from 'react-router-dom';
export default class Navbar extends Component {
  render() {
    return (
      <div style={{display:'flex',padding:'0.5'}}>
        <Link to="/Cine_Verse/" style={{textDecoration:'none'}}><h1 style={{marginTop:'1rem',marginLeft:'1rem'}}>Cine Verse</h1></Link>
        <Link to="/Cine_Verse/favorites" style={{textDecoration:'none'}}><h2 style={{marginLeft:'2rem',marginTop:'1.5rem'}}>Favorites</h2></Link>
      </div>
    )
  }
}