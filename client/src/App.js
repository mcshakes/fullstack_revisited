import React, { Component } from 'react';
import './App.css';
import { BrowserRouter } from "react-router-dom"
import Books from "./routes/Books"
import Book from "./routes/Book"

class App extends Component {

  render() {

    return (
      <div >
        <Books />
        <Book />
      </div>
    );
  }
}

export default App;
