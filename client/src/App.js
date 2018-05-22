import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import Books from "./routes/Books"
import Book from "./routes/Book"

class App extends Component {

  render() {
    return (
      <div >
        <Books />
        <Book />


        <Switch>
          <Route path="/books/:id" component={Book} />
        </Switch>
      </div>
    );
  }
}

export default App;
