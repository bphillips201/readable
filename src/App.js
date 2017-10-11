import './App.css';
import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import * as ReadableAPI from './utils/ReadableAPI';
import PostList from './posts/PostList';
import CategoryList from './categories/CategoryList';
import AddPost from './posts/addPost';
import { addPost, getPosts } from './posts/actions';
import { connect } from 'react-redux';

class App extends Component {
  state = {}

  componentDidMount() {
    ReadableAPI.getAllPosts().then((posts) => {
      this.props.getAllPosts({ posts })
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
            <AddPost
            />
          )}/>
          <Route exact path="/" render={() => (
            <div className="content">
              <aside className="categories">
                <CategoryList/>
              </aside>
              
              <div className="posts">
                <PostList
                  posts={this.props.posts}
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

function mapStateToProps ({ posts }) {
  return {
    posts
  }
}

function mapDispatchToProps (dispatch) {
  return {
    getAllPosts: (data) => dispatch(getPosts(data)),
    submitPost: (data) => dispatch(addPost(data))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
