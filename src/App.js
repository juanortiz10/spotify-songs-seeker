import React, { Component } from 'react';
import { Router } from 'react-router'
import { Route } from 'react-router'
import PropTypes from 'prop-types'


import Index from './views/index'
import Player from './views/player'

class App extends Component {
  render() {
    return (
      <Router history={ this.props.history }>
        <div>
          <Route exact path="/" component={ Index }/>
          <Route path="/player/:songId" component={ Player }/>
        </div>
      </Router>
    );
  }
}

App.propTypes = {
  history: PropTypes.any
};

export default App;
