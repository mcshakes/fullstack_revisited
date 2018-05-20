import React, { Component } from 'react';
import BackEndAPI from "../helpers/BackEndAPI";
import { BrowserRouter, Link } from "react-router-dom"

class AddBookForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      author: "",
      summary: ""
    };

    // this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();

    const data = {
      author: this.state.author,
      title: this.state.title,
      summary: this.state.summary
    }
    console.log(data)

    BackEndAPI.createBookDetails(data)
      .then(data => {
        // console.log(data)
        this.setState({
          book: data
        })
      })
      .catch(error => {
        console.log(error);
      })

  }

  _handleAddBook = () => {

  }


  render() {
    return (
      <form onSubmit={this.handleSubmit} className="add-book-form">
        <label>
          Author:
        </label>
        <input type="text" name="author" value={this.state.author} onChange={this.handleChange.bind(this)} />

        <label>
          Title:
        </label>
        <input type="text" name="title" value={this.state.title} onChange={this.handleChange.bind(this)} />

        <label>
          Summary:
        </label>
        <input type="text" name="summary" value={this.state.summary} onChange={this.handleChange.bind(this)} />

        <input type="submit" value="Submit" onSubmit={this.handleSubmit} />
      </form>
    );
  }
}

export default AddBookForm;
