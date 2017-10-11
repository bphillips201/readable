import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import * as ReadableAPI from './utils/ReadableAPI';
import PostList from './posts/PostList';
import CategoryList from './categories/CategoryList';
import AddPost from './posts/addPost';
import './App.css';

class App extends Component {
  state = {
    posts: []
  }

  componentDidMount() {
    ReadableAPI.getAllPosts().then((posts) => {
      this.setState({ posts });
      console.log(this.state.posts);
    });
  }

  render() {
    return (
      <div className="app">
        <header>
          <h1><Link to="/">Readable</Link></h1>
        </header>

        <main className="container">
          <Route path="/add-post" render={() => (
            <AddPost/>
          )}/>
          <Route exact path="/" render={() => (
            <div className="content">
              <aside className="categories">
                <CategoryList/>
              </aside>
              
              <div className="posts">
                <PostList
                  posts={this.state.posts}
                />
              </div>

              <div className="open-search">
                <Link to="/add-post">Add a book</Link>
              </div>
            </div>
          )}/>
        </main>
      </div>
    );
  }
}

export default App;
