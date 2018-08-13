import React, { Component } from 'react';
import './App.css';
import Codemailer from "./codemailer/components/codemailer";

class App extends Component {
  render() {
    return (
      <div className="App">       
        <Codemailer />
      </div>
    );
  }
}

export default App;
