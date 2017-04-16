import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Ajax from './ajax';

class App extends Component {
  onChange() {
    Ajax.post('/api/v1/rabbits')
      .then(resp => {
        console.log(resp);
      })
      .catch(err => {
        console.log('err', err);
      });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <input type="text" onChange={this.onChange} />
      </div>
    );
  }
}

export default App;
