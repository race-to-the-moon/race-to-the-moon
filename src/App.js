import React, { Component } from 'react';
import './App.css';
import './reset.css'
import routes from './routes'
import {HashRouter} from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <HashRouter>
        <div className="App">
          {routes}
        </div>
      </HashRouter>
    );
  }
}

export default App;
