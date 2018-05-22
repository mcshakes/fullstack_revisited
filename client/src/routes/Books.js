import React, { Component } from 'react';
import BackEndAPI from "../helpers/BackEndAPI";
import { BrowserRouter, Link } from "react-router-dom"
import Book from "./Book"
import AddBookForm from "./AddBookForm"


class Books extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: []
    }

    this.addBook = this.addBook.bind(this);
  }

  addBook(book) {
    const books = {...this.state.books};
    console.log("BEFORE",book) // comes in as ID only
    BackEndAPI.createBookDetails({
      author: book.author,
      title: book.title,
      summary: book.summary
    })
     .then(data => {
       this.setState({
         data: book
       })
       console.log("AFTER", book)
     })
     .catch(error => {
       console.log(error);
     })

    this.setState({ books: books })
  }

  getBooks() {
    BackEndAPI.getBooks()
      .then(data => {
        // console.log(data)
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
            <div key={idx}>
              <Link
                to={`books/${book.id}`}
                component={Book}>
                {book.title} : {book.author}
              </Link>
            </div>
          )
        })}
        <AddBookForm addBook={this.addBook}/>
      </div>
    );
  }
}

export default Books;
