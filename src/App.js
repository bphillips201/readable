import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      backend: 'backend-data'
    }
  }

  componentDidMount() {
    const url = `${process.env.REACT_APP_BACKEND}/categories`;
    console.log('fetching from url', url);
    fetch(url, { headers: { 'Authorization': 'whatever-you-want' } } )
      .then( (res) => { return(res.text()) })
      .then((data) => {
        this.setState({backend:data});
      });
  }

  render() {
    return (
      <div className="App">
        <header>
          <h1>Readable</h1>
        </header>

        <aside className="categories">
          <ul>
            <li><a href="#">React</a></li>
            <li><a href="#">Redux</a></li>
            <li><a href="#">Udacity</a></li>
          </ul>
        </aside>
        
        <section className="posts">
          <ul className="post-list">
            <li className="post">
              <span className="post-score">5</span>
              <h4><a href="#">React</a></h4>
              <h3><a href="#">5 Reasons Why React is the Best JS Framework</a></h3>
              <div className="post-meta">
                <span className="post-author">Brian Phillips</span> · <span className="post-comment-count">5 Comments</span>
              </div>
            </li>
          </ul>
        </section>

        <p>
          Categories: <br/>
          {this.state.backend}
        </p>
      </div>
    );
  }
}

export default App;
