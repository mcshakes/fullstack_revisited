import React, { Component } from 'react';
import BackEndAPI from "../helpers/BackEndAPI";
import { BrowserRouter, Link } from "react-router-dom"

class AddBookForm extends Component {
  constructor(props) {
    super(props);
    this.state = {value: ""};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    console.log(`A Book, ${this.state.value} was added to your future list.`)
    event.preventDefault();
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
      <form onSubmit={this.handleSubmit}>
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
