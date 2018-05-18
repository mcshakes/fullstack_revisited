import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    response: ''
  };

  componentDidMount() {
    this.callApi()
      .then(
        // console.log(res)
        )
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('http://localhost:8080/books');
    debugger
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
  };

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
