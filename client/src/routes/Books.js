import React, { Component } from 'react';
import BackEndAPI from "../helpers/BackEndAPI";
import { BrowserRouter } from "react-router-dom"

class Books extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: []
    }
  }

  getBooks() {
    BackEndAPI.getBooks()
      .then(data => {
        this.setState({
          books: data.books
        })
      })
      .catch(error => {
        console.log(error);
        this.setState({
          books: []
        })
      })
  }

  componentDidMount() {
    this.getBooks();
  }

  render() {

    return (
      <div className="books-list">
        {this.state.books.map((book, idx) => {
          return (
            <li key={idx}>{book.title} : {book.author}</li>
          )
        })}
        <ul>

        </ul>
      </div>
    );
  }
}

export default Books;
