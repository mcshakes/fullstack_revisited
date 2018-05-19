import React, { Component } from 'react';
import './App.css';
import { BrowserRouter } from "react-router-dom"
import Books from "./routes/Books"

class App extends Component {

  render() {

    return (
      <div >
        <Books />
      </div>
    );
  }
}

export default App;
