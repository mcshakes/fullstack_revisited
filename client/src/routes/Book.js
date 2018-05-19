import React, { Component } from 'react';
import BackEndAPI from "../helpers/BackEndAPI";
import { BrowserRouter, Link } from "react-router-dom"

class Book extends Component {
  constructor(props) {
    super(props);
    this.state = {
      book: []
    }
  }

  getBookDetails() {
    BackEndAPI.getBookDetails()
      .then(data => {
        console.log(data)
        // this.setState({
        //   book: data.books
        // })
      })
      .catch(error => {
        console.log(error);
        this.setState({
          book: []
        })
      })
  }

  componentDidMount() {
    this.getBookDetails();
  }

  render() {

    return (
      <div className="book">
      </div>
    );
  }
}

export default Book;
