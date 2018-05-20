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
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();

    const data = {
      author: this.state.author,
      title: this.state.title,
      summary: this.state.summary
    }
    console.log(`A Book, ${data} was added to your future list.`)



  }

  // NOTE : POST API below
  // getBookDetails() {
  //   BackEndAPI.getBookDetails()
  //     .then(data => {
  //       console.log(data)
  //       // this.setState({
  //       //   book: data.books
  //       // })
  //     })
  //     .catch(error => {
  //       console.log(error);
  //       this.setState({
  //         book: []
  //       })
  //     })
  // }


  render() {
    return (
      <form onSubmit={this.handleSubmit} className="add-book">
        <label>
          Author:
          <input type="text" value={this.state.author} onChange={this.handleChange} />
        </label>

        <label>
          Title:
          <input type="text" value={this.state.title} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default AddBookForm;
