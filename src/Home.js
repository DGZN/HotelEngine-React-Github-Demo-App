import React from 'react';
import logo from './react.svg';
import './Home.css';
// import './semantic.min.css';
// import './semantic.min.js'

class Home extends React.Component {
  render() {
    return (
      <div className="Home">
        <div className="Home-header">
          <img src={logo} className="Home-logo" alt="logo" />
          <h2>Welcome to Razzle</h2>
        </div>
        <p className="Home-intro">
          
        </p>
        <ul className="Home-resources">
          <li>
            <a href="/prs">Pull Requests</a>
          </li>
        </ul>
      </div>
    );
  }
}

export default Home;
