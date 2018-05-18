import React, { Component } from 'react';
import './App.css';
import BackEndAPI from "./helpers/BackEndAPI";

class App extends Component {
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
    console.log(this)
    return (
      <div className="App">
        <p className="App-intro">{this.state.response}</p>
      </div>
    );
  }
}

export default App;
