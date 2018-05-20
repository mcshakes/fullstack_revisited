import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import Books from "./routes/Books"
import Book from "./routes/Book"
import AddBookForm from "./routes/AddBookForm"

class App extends Component {

  render() {

    return (
      <div >
        <Books />
        <Book />

        <Link to={"/books/create"}>Add a New Book</Link>

        <Switch>
          <Route path="/books/create" component={AddBookForm} />
          <Route path="/books/:id" component={Book} />
        </Switch>
      </div>
    );
  }
}

export default App;
