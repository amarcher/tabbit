import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Ajax from './ajax';


class App extends Component {

  state = {
    id: '',
    password: ''
  };


  onIdChange = (event) => {
    this.setState({id: event.target.value});
  };

  onPasswordChange = (event) => {
    this.setState({password: event.target.value});
  };

  onClick = () => {
    Ajax.post('/api/v1/login', this.state)
      .then(resp => console.log(resp))
      .catch(resp => console.log(resp))
    console.log('Id: ' + this.state.id + ' Password: ' + this.state.password)
  };

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
        <input placeholder="User Id" type="text" value={this.state.value} onChange={this.onIdChange} />
        <input placeholder="Password" type="text" value={this.state.value} onChange={this.onPasswordChange} />
        <button onClick={this.onClick}> Login </button>
      </div>
    );
  }
}

export default App;
