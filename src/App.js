import React from 'react';
import Route from 'react-router-dom/Route';
import Switch from 'react-router-dom/Switch';
import PullRequests from './PullRequests';
import './App.css';

const App = () => (
  <Switch>
    <Route exact path="/" component={PullRequests} />
  </Switch>
);

export default App;
