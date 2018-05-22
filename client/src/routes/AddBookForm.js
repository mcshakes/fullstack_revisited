import React, { Component } from 'react';
import BackEndAPI from "../helpers/BackEndAPI";
import { BrowserRouter, Link } from "react-router-dom"

class AddBookForm extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     title: "",
  //     author: "",
  //     summary: ""
  //   };
  //
  //   // this.handleChange = this.handleChange.bind(this);
  //   this.handleSubmit = this.handleSubmit.bind(this);
  // }
  //
  // handleChange(event) {
  //   this.setState({ [event.target.name]: event.target.value });
  // }
  //
  // handleSubmit(event) {
  //   event.preventDefault();
  //
  //   const data = {
  //     author: this.state.author,
  //     title: this.state.title,
  //     summary: this.state.summary
  //   }
  //   console.log(data)
  //   BackEndAPI.createBookDetails(data)
  //     .then(data => {
  //       // console.log(data)
  //       this.setState({
  //         book: data
  //       })
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     })
  //
  // }

  createBook(event) {
    event.preventDefault()

    const book = {
      author: this.name.value,
      title: this.name.value,
      summary: this.desc.value
    }
    this.props.addBook(book)
    this.bookForm.reset()
  }

  render() {
    return (
      <form ref={(input) => this.bookForm = input} onSubmit={(e) => this.createBook(e)} className="add-book">
        <label>
          Author:
        </label>
        <input type="text" name="author" ref={(input) => this.name = input} />

        <label>
          Title:
        </label>
        <input type="text" name="title" ref={(input) => this.name = input} />

        <label>
          Summary:
        </label>
        <input type="text" name="summary" ref={(input) => this.desc = input} />

        <button type="submit"> + Add Book </button>
      </form>
    );
  }
}

export default AddBookForm;
