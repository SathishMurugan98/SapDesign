import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
  render() {
    return (
      <div id="content" className='header container'>
        <div className="d-flex justify-content-between align-items-center">
          <div style={{ marginLeft: "225px" }}>
            <h2>{this.props.data.header}</h2>
          </div>
          <div className="d-flex justify-content-evenly">
            <input type="text" placeholder="Search.."
              style={{ marginRight: "15px" }}
              id="search" />
            <Link to="/messages">
              <div className="header-icon" style={{ marginRight: "15px" }}>
                <i className="fa-solid fa-bell"></i>
              </div>
            </Link>
            <div id="header_avatar">
              <img alt="" className="avatar" src="./images/profile_user.jpg" />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Header